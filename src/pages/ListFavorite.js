import {useEffect, useState} from "react";
import {findFavoriteByAccount} from "../admin/api/Api";
import {Box, CircularProgress} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {favColumns} from "../admin/Datatablesource";
import Auth from "../security/Auth";

const ListFavorite = (props) =>{

    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const {value} = props


    const [book,setBook] = useState(0)

    const loadAllFavByAccount = async () => findFavoriteByAccount(Auth.getCurrentUser().id).then(r =>{
        setBook(r.data)
    })


    useEffect(() => {
        setTimeout(( ) =>{
            loadAllFavByAccount().then(r => setIsLoading(true))
        },1000)
    }, [])




    return (
        <div
            role="tabpanel"
            hidden={value !== 1}
            id={`vertical-tabpanel-1`}
            aria-labelledby={`vertical-tab-1`}
            style={{width:'100%'}}
        >
            {
                value === 1 && (
                    <div className='datatable'>
                        {
                            isLoading ? (
                                <DataGrid
                                    className="datagrid sadas"
                                    rows={book}
                                    columns={favColumns}
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
        </div>
    )
}
export default ListFavorite
