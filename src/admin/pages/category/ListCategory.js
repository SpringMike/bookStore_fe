import {useEffect, useState} from "react";
import {getBooks, getCategories, updateCategoryStatus, updateStatusProduct} from "../../api/Api";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {Box, CircularProgress, Switch, TextField} from "@mui/material";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {DataGrid} from "@mui/x-data-grid";
import {bookColumns, cateColumns} from "../../Datatablesource";

const ListCategory = () =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [seachItem,setSearchItem] = useState("")

    const loadCate = async () => await getCategories().then(p => {
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
            loadCate().then(r => setIsLoading(true))
        },1000)
    }, [])


    const handleChange = (id) =>{
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
                const id2 = parseInt(id)
                updateCategoryStatus(id2 ).then(() =>{
                    loadCate().then(r => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated successfully'
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
                        <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Edit</div>
                        </Link>
                    </div>
                );
            },
        },
    ];

    const statusColumn = [
        {
            field: "status",
            headerName: "Status",
            width: 170,
            renderCell: (params) => {
                return (
                    <Switch
                        checked={params.row.status}
                        onClick={() => handleChange(params.row.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                );
            },
        }
    ];

    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="datatableTitle">
                        <Link to="/admin/categories/new" className="link">
                            Add New
                        </Link>
                        <div>
                            <TextField id="outlined-basic" label="Find by name" variant="outlined"
                                       onChange={(e) => setSearchItem(e.target.value)}/>
                        </div>
                    </div>

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
                                columns={cateColumns.concat(statusColumn).concat(actionColumn)}
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
            </div>
        </div>
    )
}
export default ListCategory
