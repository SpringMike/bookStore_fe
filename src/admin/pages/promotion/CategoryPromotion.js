import {useEffect, useState} from "react";
import {deleteCategoryFromPromotion, getPromotionIncludeCate, updateCategoryStatus} from "../../api/Api";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {Box, CircularProgress, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {cateColumns} from "../../Datatablesource";
import CategoryPopUp from "./CategoryPopUp";
import Button from "@mui/material/Button";
import AddTaskIcon from '@mui/icons-material/AddTask';

const CategoryPromotion = (props) =>{
    const {promotionId} = props

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [seachItem,setSearchItem] = useState("")
    const [isShow, setIsShow] = useState(false)

    const loadCategoryPromotion = async () => await getPromotionIncludeCate(promotionId).then(p => {
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
            loadCategoryPromotion().then(r => setIsLoading(true))
        },1000)
    }, [isShow])


    const handleClick = (id) =>{
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
                deleteCategoryFromPromotion(promotionId,id ).then(() =>{
                    loadCategoryPromotion().then(r => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Delete successfully'
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
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="#" style={{ textDecoration: "none" }}>
                            <div className="viewButton" onClick={() => handleClick(params.row.id)}>Delete</div>
                        </Link>
                    </div>
                );
            },
        },
    ];



    return (

                <div className="datatable">
                    <div className="datatableTitle">
                        {
                            isShow ? (
                                <CategoryPopUp passChildData={setIsShow} promotionId={promotionId}/>
                            ) : (
                            <Button variant="outlined" startIcon={<AddTaskIcon />}  onClick={() => {
                                setIsShow(o => !o)
                            }}>
                            Add category
                            </Button>
                            )
                        }
                        <div>
                            <TextField id="outlined-basic" label="Find by name" variant="outlined"
                                       onChange={(e) => setSearchItem(e.target.value)}/>
                        </div>
                    </div>
                    <p>List of category promotion</p>

                    {
                        isLoading ? (
                            <DataGrid
                                className="datagrid"
                                rows={data.filter((acc) =>{
                                    if (seachItem === ""){
                                        return acc
                                    }else if(acc.name.toLowerCase().includes(seachItem.toLowerCase())){
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
    )
}
export default CategoryPromotion
