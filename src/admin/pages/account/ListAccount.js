import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {accountColumn, bookColumns} from "../../Datatablesource";
import {Box, CircularProgress, FormControlLabel, FormGroup, Modal, Switch, TextField} from "@mui/material";
import Swal from "sweetalert2";
import {getAccounts, getBooks, updateAccountStatus, updateRole, updateStatus, updateStatusProduct} from "../../api/Api";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ListAccount = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(5);


    const [seachItem,setSearchItem] = useState("")


    const loadAccount = async () => await getAccounts().then(p => {
        setData(p.data.reverse())
    })

    useEffect(() =>{
        loadAccount().then(() =>{
            setIsLoading(true)
        })
    },[])

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
                    updateAccountStatus(id2 ).then(() =>{
                        loadAccount().then(() =>{})
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


    return(
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="datatableTitle">
                        Account Manage
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
                                    }else if(acc.fullName.toLowerCase().includes(seachItem.toLowerCase())){
                                        return acc
                                    }
                                })}
                                columns={accountColumn.concat(statusColumn)}
                                rowHeight={100}
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20]}
                                pagination

                             autoHeight/>
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
export default ListAccount
