import Popup from "reactjs-popup";
import {useEffect, useState} from "react";
import 'reactjs-popup/dist/index.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from "@mui/material/IconButton";
import {getOrderDetailById} from "../admin/api/Api";
import {Link} from "react-router-dom";
import {Box, CircularProgress, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {orderDetailsColumn, orderOnConfirmColumns} from "../admin/Datatablesource";
import TooltipExample from "./TooltipExample";
import CurrencyFormat from 'react-currency-format'

const PopupExample = ({idOrder,totalPrice}) => {
    const orderId = {idOrder}

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const closeModal = () => setOpen(false);
    const [orderDetails,setOrderDetails] = useState([])
    const loadOrderDetails = async () => await getOrderDetailById(parseInt(orderId.idOrder)).then((od) =>{
        setOrderDetails(od.data.orderDetails)
    })
    const [pageSize, setPageSize] = useState(5);
    const [shipCost, setShipCost] = useState(5);
    const [seachItem, setSearchItem] = useState("")

    let totalPriceCat = {totalPrice}


    useEffect(()=>{
        loadOrderDetails().then(r => {
            setIsLoading(true)
        })

    },[])
    useEffect(() =>{
        let total =0;
        for (let i=0;i<orderDetails.length;i++){
            const sum = orderDetails[i].price*orderDetails[i].quantity
            total+=sum
        }
        setShipCost(parseFloat(totalPriceCat.totalPrice) - total)
    },[orderDetails])



    return (
        <div>
            <div className="cellAction">
                <IconButton aria-label="delete" color="primary" onClick={() => setOpen(o => !o)}>
                    <RemoveRedEyeOutlinedIcon />
                </IconButton>
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
                                <TooltipExample orderId={orderId.idOrder}/>

                                <div>
                                    <CurrencyFormat value={shipCost} displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={"shipping cost: "}
                                                    suffix={' đ'}/>
                                </div>
                            </div>

                            {
                                isLoading ? (
                                       <DataGrid
                                           className="datagrid"
                                           rows={orderDetails.filter((acc) => {
                                               if (seachItem === "") {
                                                   return acc
                                               } else if (acc.name.toLowerCase().includes(seachItem.toLowerCase())) {
                                                   return acc
                                               }
                                           })}
                                           columns={orderDetailsColumn}
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
};
export default PopupExample
