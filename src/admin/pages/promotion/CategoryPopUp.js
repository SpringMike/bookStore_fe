import {useEffect, useState} from "react";
import {
    addCategoryToPromotion,
    getAllPromotionIncludeCate,
    getOrderDetailById,
    updateCategoryStatus
} from "../../api/Api";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Popup from "reactjs-popup";
import TooltipExample from "../../../components/TooltipExample";
import {DataGrid} from "@mui/x-data-grid";
import {cateColumns, orderDetailsColumn} from "../../Datatablesource";
import {Box, CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const CategoryPopUp =(props)=>{
    const {promotionId} = props


    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const closeModal = () => {
        setOpen(false)
        props.passChildData(false)
    };

    const [data,setData] = useState([])
    const loadCategories = async () => await getAllPromotionIncludeCate(promotionId).then((od) =>{
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
        loadCategories().then(r => {
            setIsLoading(true)
        })

    },[])
    const handleAdd =(categoryId)=>{
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
                addCategoryToPromotion(promotionId,categoryId ).then(() =>{
                    loadCategories().then(r => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Add category successfully'
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
                            <div className="viewButton" onClick={() => handleAdd(params.row.id)}>Add</div>
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <div className="cellAction">
                <Button variant="outlined" startIcon={<AddTaskIcon />}  onClick={() => setOpen(o => !o)}>
                    Add category
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
                                        columns={cateColumns.concat(actionColumn)}
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
export default CategoryPopUp
