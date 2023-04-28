import Course from '../models/course.model'
import extend from 'lodash/extend'
import fs from 'fs'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import defaultImage from './../../client/assets/images/default.png'

// analiza solicitudes que pueden contener un archivo de imagen que pueden ser cargado x el usuario, si existe lo almacena temporalmente lo lee usuando fs y luego se almacena e el campo de imagen del doc del curso
const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let course = new Course(fields)
        course.instructor= req.profile
        if (files.image) {
            course.image.data = fs.readFileSync(files.image.path)
            course.image.contentType = files.image.type
        }
        try {
            let result = await course.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
};

// get p/consultar los cursos con una identificacion El parámetro :courseId en la URL de la ruta llamará al método del controlador CourseByID, que es similar a el método del controlador userByID. Recupera el curso de la base de datos, y
//lo adjunta al objeto de solicitud
const courseByID = async (req, res, next, id) => {
    try {
        let course = await Course.findById(id).populate('instructor', '_id name')
        if (!course)
            return res.status(400).json({
                error: "Course not found"
            })
            req.course = course
            next()
    } catch(err) {
    return res.status(400).json({
        error: "Could not retrieve course"
    })
    }
};

// el obejeto del curso devuelve el curso y el instructor,next invoca la lectura a este metodo controlador 
const read = (req, res) => {
    req.course.image = undefined
    return res.json(req.course)
};

const list = async (req, res) => {
    try {
        let courses = await Course.find().select('name email updated created')
        res.json(courses)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const update = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be upload'
            })
        }
        let course = req.course
        course = extend(course, fields)
        if(fields.lessons) {
            course.lessons = JSON.parse(fields.lessons)
        }
        course.update = Date.now()
        if(files.image) {
            course.image.data = fs.readFileSync(files.image.path)
            course.image.contentType = files.image.type
        }
        try {
            await course.save()
            res.json(course)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
                })
        }
    })
}

const newLesson = async (req, res) => {
    try {
        let lesson = req.body.lesson
        let result = await Course.findByIdAndUpdate(req.course._id, {$push: {lessons: lesson}, updated: Date.now()}, {new: true})
                            .populate('instructor', '_id name')
                            .exec()
        res.json(result)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

// una vez q/ se envia el ID del curso como parametro de la URL, verifica si el usuario ha inciado sesion y esta autorizado, ejecuta el siguiente metodo
const remove = async (req, res) => {
    try {
        let course = req.course
        let deleteCourse = await course.remove()
        res.json(deleteCourse)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// cdo recibe un asolciitu put con e ID del usuario del curso en la URL, primero isInst verifica si es el instructor, luego se guarda la leccion en la base de datos con newLesson
const isInstructor = (req, res, next) => {
    const isInstructor = req.course && req.auth && req.course.instructor._id == req.auth._id
    if(!isInstructor) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next() //indica que se ejecute newLwsson en caso de que el usuario q inicio sesion tenga el mismo id que el del curso
};

// consultara si existe el curso en la bd y devolera las coincidencias, el campo de instructor del usuario debe coincidir con el parametro de ID especificado
const listByInstructor = (req, res) => {
    Course.find({instructor: req.profile._id}, (err, courses) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(courses)
    }).populate('instructor', '_id name')
};

// una solicitud get invocara el esta metodo que incia una consulta a la coleccion de cursos p/ los cursos q tienen la publicacion valor del atributo en true
const listPublished= (req, res) => {
    Course.find({published: true}, (err, courses) => {
        if (err) {
            return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(courses)
        }).populate('instructor', '_id name')
};

const photo = (req, res, next) => {
    if(req.course.image.data){
        res.set("Content-Type", req.course.image.contentType)
            return res.send(req.course.image.data)
    }
    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd()+defaultImage)
}


export default {create,
                courseByID,
                read,
                list,
                update,
                newLesson,
                isInstructor,
                listByInstructor,
                remove,
                listPublished,
                photo,
                defaultPhoto}