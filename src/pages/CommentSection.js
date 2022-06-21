import {useEffect, useState} from "react";
import {createPayment, findAllCommentByBook, submitComment} from "../admin/api/Api";
import Auth from "../security/Auth";
import Swal from "sweetalert2";
import ReplyIcon from '@mui/icons-material/Reply';
import IconButton from "@mui/material/IconButton";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Comment from "./Comment";
const CommentSection = (props) =>{

    const [comments,setComments] = useState([])
    const [isLoad,setIsLoad] = useState(false);
    const {bookId} = props
    const [comment,setComment] = useState("")


    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const addComment = () =>{
            const comment1 = {
                "accountName": Auth.getCurrentUser().username,
                "bookId": bookId,
                "comment": comment,
                "parent": true
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, do it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    submitComment(comment1).then((p) =>{
                        setIsLoad(true)
                        Toast.fire({
                            icon: 'success',
                            title: 'Add comment successfully'
                        }).then(r => {})
                    })
                }
            })
    }

    const loadAllComment = async () => findAllCommentByBook(parseInt(bookId)).then(c =>{
        setComments(c.data)
    })

    useEffect(() =>{
        loadAllComment().then(r =>{})
    },[isLoad])


    return(
        <div>
            <div className="comments-container">
                <div>
                    <input type="text" placeholder="type here" onChange={(e) =>setComment(e.target.value)}/>
                    <button onClick={() => addComment()}>Submit</button>
                </div>
                <ul id="comments-list" className="comments-list">
                    {
                        comments.map((comment,key) =>(
                            <Comment  key={key} comment={comment}/>
                        ))
                    }

                </ul>
            </div>
        </div>
    )
}
export default CommentSection
