import React from 'react'
import Avatar from '@material-ui/core/Avatar';

const Post = (props) => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar alt="Leo_Melo" src="/static/images/avatar/1.jpg" />
                <h3>
                    {props.userName}
                </h3>
            </div>    
            <img className="post__img" alt={props.alt} src={props.image} />
            <h4 className="post__caption"><span className="post--caption--name">{props.userName} </span>{props.caption}</h4>
        </div>
    )
}

export default Post;