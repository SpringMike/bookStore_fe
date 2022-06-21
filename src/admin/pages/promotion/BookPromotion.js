import {useEffect, useState} from "react";
import {addBookToBlackList, findByPromotion} from "../../api/Api";
import Swal from "sweetalert2";
import {Box, CircularProgress} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {bookColumns2} from "../../Datatablesource";
import CategoryPopUp from "./CategoryPopUp";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookPopUp from "./BookPopUp";

const BookPromotion =(props) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    const {promotionId} =props
    const [isShow, setIsShow] = useState(false)
    const loadBooks = async () => await findByPromotion(promotionId).then(p => {
        setData(p.data.reverse())
    })
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


    useEffect(() => {
        setTimeout(( ) =>{
            loadBooks().then(r => setIsLoading(true))
        },1000)
    }, [isShow])



    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                addBookToBlackList(promotionId,id ).then(() =>{
                    setData(data.filter((item) => item.id !== id));
                        Toast.fire({
                            icon: 'success',
                            title: 'Delete successfully'
                        }).then(r => {})
                })

            }
        })
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];


    return (

                <div className="datatable">
                    <div className="datatableTitle">
                        Product in promotion
                        {
                            isShow ? (
                                <BookPopUp  passChildData2={setIsShow} promotionId={promotionId}/>
                            ) : (
                                <Button variant="outlined" startIcon={<DeleteForeverIcon />}  onClick={() => {
                                    setIsShow(o => !o)
                                }}>
                                    Black list
                                </Button>
                            )
                        }
                    </div>
                    {
                        isLoading ? (
                            <DataGrid
                                className="datagrid"
                                rows={data}
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

    )
}
export default BookPromotion
