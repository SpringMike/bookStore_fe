import {useEffect, useState} from "react";
import {loadOrderOnConfirm, updateStatusOrder} from "../../api/Api";
import Swal from "sweetalert2";
import PopupExample from "../../../components/PopupExample";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {Link} from "react-router-dom";
import {Box, CircularProgress, MenuItem, Select, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {orderWaitingColumns} from "../../Datatablesource";

const ListOrder = (props) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [seachItem, setSearchItem] = useState("")
    const [isShow, setIsShow] = useState(false)
    const {id} = props
    const {nextIdOrder} = props
    const {title} =props
    const loadOrder = async () => await loadOrderOnConfirm(id).then(p => {
        setData(p.data.reverse())
    })

    const [orderHistoryId, setOrderHistoryId] = useState(2);
    const historyStatus = [
        {
            id: 2,
            type:"ON_CONFIRM"
        },
        {
            id: 3,
            type:"ON_THE_WAY"
        },
        {
            id: 4,
            type:"HAS_ARRIVED"
        },
        {
            id:5,
            type:'CANCELED'
        }
    ]

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
            loadOrder().then(r => setIsLoading(true))
        }, 1000)
    }, [])



    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }

    const handleChangeStatus = (orderStatusHistoryId,orderId) => {
        const now = new Date();
        const strDateTime = [[AddZero(now.getDate()),
            AddZero(now.getMonth() + 1),
            now.getFullYear()].join("/"),
            [AddZero(now.getHours()),
                AddZero(now.getMinutes())].join(":"),
            now.getHours() >= 12 ? "PM" : "AM"].join(" ");
        const order = {
            id: orderId,
            orderStatusHistories: [
                {
                    orderId: orderId,
                    statusOrderId: nextIdOrder,
                    done: true,
                    create_date: strDateTime,
                }
            ],
            isFinished: nextIdOrder === 4 ? false : null
        }
        console.log(order)
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
                const id2 = parseInt(orderStatusHistoryId)
                updateStatusOrder(id2, order).then(() => {
                    loadOrder().then(r => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated successfully'
                        }).then(r => {
                        })
                    })
                })

            }
        })
    }


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 170,
            renderCell: (params) => {
                return (
                    <div style={{display: 'flex'}}>
                        <div className="cellAction">
                            {
                                isShow ? (
                                    <PopupExample  totalPrice={params.row.total}  idOrder={params.row.orderId}/>
                                ) : (
                                    <IconButton aria-label="delete" color="primary" onClick={() => setIsShow(o => !o)}>
                                        <RemoveRedEyeOutlinedIcon/>
                                    </IconButton>
                                )
                            }
                        </div>
                        <div className="cellAction" style={{marginRight: '5px'}}>
                            <IconButton color="primary" onClick={() => handleChangeStatus(params.row.id,params.row.orderId)}>
                                <CheckOutlinedIcon/>
                            </IconButton>
                        </div>
                        <div className="cellAction">
                            <IconButton aria-label="delete" style={{color: 'red'}}>
                                <CancelOutlinedIcon/>
                            </IconButton>
                        </div>

                    </div>
                );
            },
        }
    ];
    const statusColumn = [
        {
            field: "finished",
            headerName: "Status",
            width: 170,
            renderCell: (params) => {
                return (
                 <div><p>{params.row.finished ? "Customer has received" : "Customer hasn't received"}</p></div>
                );
            },
        }
    ]
    // const statusColumn = [
    //     {
    //         field: "Status",
    //         headerName: "Status",
    //         width: 200,
    //         renderCell: (params) => {
    //             return (
    //                 <div>
    //                     <Select style={{width: '100%', height: '43%', marginLeft: '3px', marginTop: '4px'}}
    //                             value={orderHistoryId === null ? 0 : orderHistoryId}
    //                             onChange={(e) => setOrderHistoryId(e.target.value)} displayEmpty>
    //                         {
    //                             historyStatus.map((p, index) => (
    //                                 <MenuItem value={p.id} key={index}>{p.type}</MenuItem>
    //                             ))
    //                         }
    //                     </Select>
    //                 </div>
    //             );
    //         },
    //     }
    // ];

    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="datatableTitle">
                            List order {title}
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
                                columns={nextIdOrder === 0 ? orderWaitingColumns.concat(statusColumn) :orderWaitingColumns.concat(actionColumn)}
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
export default ListOrder
