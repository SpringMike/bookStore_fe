import {useEffect, useState} from "react";
import {
    addCategoryToPromotion,
    deleteBookFromBlackList,
    findByBlackList,
    getAllPromotionIncludeCate
} from "../../api/Api";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Popup from "reactjs-popup";
import {DataGrid} from "@mui/x-data-grid";
import {bookColumns2, cateColumns} from "../../Datatablesource";
import {Box, CircularProgress} from "@mui/material";

const BookPopUp =(props)=>{
    const {promotionId} = props

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setOpen(false)
        props.passChildData2(false)
    };



    const [data,setData] = useState([])
    const loadBooks = async () => await findByBlackList(promotionId).then((od) =>{
        setData(od.data)
    })
    const [pageSize, setPageSize] = useState(5);
    const [seachItem, setSearchItem] = useState("")

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
    useEffect(()=>{
        loadBooks().then(r => {
            setIsLoading(true)
        })
    },[])
    const handleRevert =(bookId)=>{
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
                deleteBookFromBlackList(promotionId,bookId ).then(() =>{
                    loadBooks().then(r => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Revert book successfully'
                        }).then(r => {})
                    })
                })
            }
        })
    }
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="#" style={{ textDecoration: "none" }}>
                            <div className="viewButton" onClick={() => handleRevert(params.row.id)}>Revert</div>
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <div className="cellAction">
                <Button variant="outlined" startIcon={<DeleteForeverIcon />}  onClick={() => setOpen(o => !o)}>
                    Black list
                </Button>
            </div>
            <Popup className="dcmm" open={open} closeOnDocumentClick onClose={closeModal}  modal
                   nested>
                <div className="modal">
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                    {
                        <div className="datatable">
                            <div className="datatableTitle">
                                Add category to promotion event
                            </div>

                            {
                                isLoading ? (
                                    <DataGrid
                                        className="datagrid"
                                        rows={data.filter((acc) => {
                                            if (seachItem === "") {
                                                return acc
                                            } else if (acc.name.toLowerCase().includes(seachItem.toLowerCase())) {
                                                return acc
                                            }
                                        })}
                                        columns={bookColumns2.concat(actionColumn)}
                                        rowHeight={100}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        pagination

                                    />

                                ) : (
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        justifyContent: 'center',
                                        height: '100%'
                                    }}>
                                        <CircularProgress/>
                                    </Box>
                                )
                            }
                        </div>
                    }
                </div>
            </Popup>
        </div>
    );
}
export default BookPopUp
