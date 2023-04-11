import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'


// representara cualquier lista de usuarios que se le proporcione que podamos usar en el suministro de publicaciones como en el perfil
// iterara a traves de la lista de public q se pasa como props desde Newsfeed o Profile,pasara los datos de c/publicacion a un componente que mostrara los detalles
export default function PostList (props) {
    return (
        <div style={{marginTop: '24px'}}>
            {props.posts.map((item, i) => {
                return <Post post={item} key={i} onRemove={props.removeUpdate}/>
            })
            }
        </div>
    )
};
PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    removeUpdate: PropTypes.func.isRequired
};