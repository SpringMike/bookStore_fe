import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import PopupExample from "../components/PopupExample";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SideBar from "../admin/components/SideBar";
import NavBar from "../admin/components/NavBar";
import {Link} from "react-router-dom";
import {CircularProgress, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {orderAccountColumn, orderWaitingColumns} from "../admin/Datatablesource";
import {findOrderByAccountId, loadOrderOnConfirm, updateFinished} from "../admin/api/Api";
import Auth from "../security/Auth";
import Button from "@mui/material/Button";
import Toast from "sweetalert2";
import Swal from "sweetalert2";

const OrderHistory = (props) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [seachItem, setSearchItem] = useState("")
    const [isShow, setIsShow] = useState(false)
    const {value} = props

    const loadOrderByAccountId = async () => await findOrderByAccountId(parseInt(Auth.getCurrentUser().id)).then(p => {
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
        setTimeout(() => {
            loadOrderByAccountId().then(r => setIsLoading(true))
        }, 1000)
    }, [])

    const hasReceivedAction = (id) =>{
        const order = {
            id:id,
            isFinished: true
        }
        updateFinished(order).then(() =>{
            loadOrderByAccountId().then(r => {})
            Toast.fire({
                icon: 'success',
                title: 'Updated successfully'
            }).then(r => {
            })
        })
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 170,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div style={{display: 'flex'}}>
                        <div className="cellAction">
                            {
                                isShow ? (
                                    <PopupExample totalPrice={params.row.total}  idOrder={params.row.id}/>
                                ) : (
                                    <IconButton aria-label="delete" color="primary" onClick={() => setIsShow(o => !o)}>
                                        <RemoveRedEyeOutlinedIcon/>
                                    </IconButton>
                                )
                            }
                        </div>
                    </div>
                );
            },
        }
    ];
    const buttonSubmit = [
        {
            field: "isFinished",
            headerName: "Submit",
            width: 170,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div>
                    {
                         params.row.isFinished !== null ? (
                             <>
                                 {
                                    params.row.isFinished === false ? (
                                        <div style={{display: 'flex'}}>
                                            <div className="cellAction">
                                                <Button onClick={() => hasReceivedAction(params.row.id)} variant="outlined">Has received</Button>
                                            </div>
                                        </div>
                                    ) :(
                                        <div style={{display: 'flex'}}>
                                            <div className="cellAction">
                                                <Button variant="outlined">Done</Button>
                                            </div>
                                        </div>
                                    )
                                 }
                             </>
                        ) : <></>
                    }
                    </div>
                );
            },
        }
    ]

    return (
        <div
            role="tabpanel"
            hidden={value !== 0}
            id={`vertical-tabpanel-0`}
            aria-labelledby={`vertical-tab-0`}
            style={{width:'100%'}}
        >
                        <div className="datatable">
                            {/*<div className="datatableTitle">*/}
                            {/*    <Link to="/admin/categories/new" className="link">*/}
                            {/*        Add New*/}
                            {/*    </Link>*/}
                            {/*    <div>*/}
                            {/*        <TextField id="outlined-basic" label="Find by name" variant="outlined"*/}
                            {/*                   onChange={(e) => setSearchItem(e.target.value)}/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

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
                                        columns={orderAccountColumn.concat(actionColumn).concat(buttonSubmit)}
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
    )
}
export default OrderHistory
