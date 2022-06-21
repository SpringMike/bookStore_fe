import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {Link} from "react-router-dom";
import {Box, CircularProgress, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {cateColumns, promotionCollum} from "../../Datatablesource";
import {useEffect, useState} from "react";
import {getCategories, getPromotions} from "../../api/Api";
import Swal from "sweetalert2";

const ListPromotion = () =>{

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [seachItem,setSearchItem] = useState("")

    const loadPromotions = async () => await getPromotions().then(p => {
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
            loadPromotions().then(r => setIsLoading(true))
        },1000)
    }, [])

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
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="datatableTitle">
                        <Link to="/admin/promotions/new" className="link">
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
                                columns={promotionCollum.concat(actionColumn)}
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
export default ListPromotion
