import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {bookColumns, userColumns, userRows} from "../../Datatablesource";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {getBooks, updateStatusProduct} from "../../api/Api";
import {Box, CircularProgress, Switch} from "@mui/material";
import Swal from "sweetalert2";


const List = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    const loadBooks = async () => await getBooks().then(p => {
        setData(p.data.reverse())
    })



    useEffect(() => {
        setTimeout(( ) =>{
            loadBooks().then(r => setIsLoading(true))
        },1000)
    }, [])

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
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
                Swal.fire(
                    'Changed!',
                    'Your book has been changed.',
                    'success'
                ).then(r => {
                    const id2 = parseInt(id)
                    updateStatusProduct(id2 ).then(() =>{
                        loadBooks().then(r => {})
                    })
                })
            }
        })
    }

    const statusColumn = [
        {
            field: "status",
            headerName: "Status",
            width: 100,
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
                        Add New User
                        <Link to="/admin/books/new" className="link">
                            Add New
                        </Link>
                    </div>
                    {
                        isLoading ? (
                            <DataGrid
                                className="datagrid"
                                rows={data}
                                columns={bookColumns.concat(statusColumn).concat(actionColumn)}
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

export default List
