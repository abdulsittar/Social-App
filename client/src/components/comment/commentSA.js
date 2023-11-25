import {useContext, useEffect, useRef } from "react";
import React, {useState} from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import {styles} from './commentStyle'


function CommentSA ({post, classes}) {
  const desc = useRef();
  const { user: currentUser } = useContext(AuthContext);
    const commentBody = item => {
      return (
        <p className={classes.commentText}>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
          {item.text}
          <span className={classes.commentDate}>
            {(new Date(item.created)).toDateString()} |
            {currentUser._id === item.postedBy._id &&
              <Icon className={classes.commentDelete}>delete</Icon> }
          </span>
        </p>
      )
    }

    return (<div>
        { post.comments.map((item, i) => {
            return <CardHeader
                      avatar={
                      <Avatar className={classes.smallAvatar} src={'/api/users/photo/'+item.postedBy._id}/>}
                      title={commentBody(item)}
                      className={classes.cardHeader}
                      key={i}/>
              })
        }
    </div>)
}

CommentSA.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired
}

export default withStyles(styles)(CommentSA);