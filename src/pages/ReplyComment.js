import {DataGrid} from "@mui/x-data-grid";
import {bookColumns2} from "../admin/Datatablesource";
import {Box, CircularProgress} from "@mui/material";
import Popup from "reactjs-popup";
import {useState} from "react";
import Auth from "../security/Auth";
import Swal from "sweetalert2";
import {submitComment} from "../admin/api/Api";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton from "@mui/material/IconButton";

const ReplyComment =(props) =>{
    const [open, setOpen] = useState(false);
    const [comment,setComment] = useState("")

    const closeModal = () => {
        setOpen(false)
        props.passchilddata2(false)
    };
    const {bookId} = props
    const {parentId} =props

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
            "parent": false,
            "parentId":parentId
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
                    setTimeout(() =>{
                        window.location.reload()
                    },1000)
                    Toast.fire({
                        icon: 'success',
                        title: 'Add comment successfully'
                    }).then(r => {})
                })
            }
        })
    }
    return(
        <div>
            <IconButton onClick={() => {setOpen(o => !o)}} className="heartIcon" aria-label="minus" size="small">
                <ReplyIcon/>
            </IconButton>
            <Popup className="dcmm" open={open} closeOnDocumentClick onClose={closeModal}  modal
                   nested>
                <div className="modal" style={{padding:'30px'}}>
                    <h3>Reply comment</h3>
                    <input type="text" placeholder="type here" onChange={(e) => setComment(e.target.value)}/>
                    <button onClick={() => addComment()}>Submit</button>
                </div>
            </Popup>
        </div>
    )
}
export default ReplyComment
