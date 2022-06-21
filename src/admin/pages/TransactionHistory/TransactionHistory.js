import {useEffect, useState} from "react";
import {getAllTransaction} from "../../api/Api";
import PopupExample from "../../../components/PopupExample";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {DataGrid} from "@mui/x-data-grid";
import {transactionCollum} from "../../Datatablesource";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import XLSX from 'xlsx/dist/xlsx.core.min'

const TransactionHistory = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [seachItem, setSearchItem] = useState("")
    const [isShow, setIsShow] = useState(false)


    const loadTransaction = async () => await getAllTransaction().then(p => {
        setData(p.data.reverse())

    })
    useEffect(() => {
        setTimeout(() => {
            loadTransaction().then(r => setIsLoading(true))
        }, 1000)
    }, [])


    const downloadExcel=()=>{
        // const newData=studentData.map(row=>{
        //     delete row.tableData
        //     return row
        // })
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook,workSheet,"transactions")
        //Buffer
        let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
        //Binary string
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        //Download
        XLSX.writeFile(workBook,"TransactionsData.xlsx")


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
                                    <PopupExample totalPrice={params.row.amount} idOrder={params.row.orderId}/>
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

    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>

                <div className="datatable">
                    <div className="datatableTitle">
                        List of transaction
                        <button onClick={downloadExcel} className="link">
                            Xuat excel
                        </button>
                    </div>
                    <div
                        role="tabpanel"
                        id={`vertical-tabpanel-0`}
                        aria-labelledby={`vertical-tab-0`}
                        style={{width: '100%'}}
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
                                        rows={data}
                                        columns={transactionCollum.concat(actionColumn)}
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

            </div>
        </div>
    )
}
export default TransactionHistory
