import IconButton from "@mui/material/IconButton";
import {useEffect, useState} from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyComment from "./ReplyComment";

const Comment = (props) => {

    const {comment} = props
    const [isShow, setIsShow] = useState(false)



    return (
        <li>
            <div className="comment-main-level">

                <div className="comment-avatar"><img style={{width:'80px'}}
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=""/></div>

                <div className="comment-box">
                    <div className="comment-head">
                        <h6 className="comment-name by-author"><a
                            href="#">{comment.accountName}</a></h6>
                        {
                            isShow ? (
                                <ReplyComment passchilddata2={setIsShow} bookId={comment.bookId} parentId={comment.id}/>
                            ) : (
                                <IconButton onClick={() => {setIsShow(o => !o)}} className="heartIcon" aria-label="minus" size="small">
                                    <ReplyIcon/>
                                </IconButton>

                            )
                        }
                    </div>
                    <div className="comment-content">
                        {comment.comment}
                    </div>
                </div>
            </div>
            {
                comment.subComments.length > 0 ? (
                    comment.subComments.map((subComment, key) => (
                        <ul className="comments-list reply-list" key={key}>
                            <Comment key={key} comment={subComment}/>
                        </ul>
                    ))
                ) : <></>
            }
        </li>
    )
}
export default Comment
