import express from 'express'
import enrollmentCtrl from '../controllers/enrollment.controller'
import courseCtrl from '../controllers/course.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

//consultara las inscripciones para encontrar matriculas q/tengan referencia de estudiante q coincida c/el usuario q esta conectado
router.route('/api/enrollment/enrolled')
    .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

router.route('/api/enrollment/new/:courseId')
    .post(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create) 

// consultara la coleccion de incripciones en en la bd p/calcular estadisticas de un curso especifico
router.route('/api/enrollment/stats/:courseId')
    .get(enrollmentCtrl.enrollmentStats)

// lecciones completas y cursos terminados
router.route('/api/enrollment/complete/:enrollmentId')
    .put(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete) 

router.route('/api/enrollment/:enrollmentId')
    .get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
    .delete(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.remove)


router.param('courseId', courseCtrl.courseByID)
router.param('enrollmentId', enrollmentCtrl.enrollmentByID)


export default router
