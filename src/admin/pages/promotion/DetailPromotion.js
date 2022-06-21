import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Component, useEffect, useState} from "react";
import {getPromotionById} from "../../api/Api";
import {useParams} from "react-router-dom";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CategoryPromotion from "./CategoryPromotion";
import * as PropTypes from "prop-types";
import BookPromotion from "./BookPromotion";

const DetailPromotion = () => {

    const [createDate, setCreateDate] = useState("")
    const [endDate,setEndDate] = useState(Date)
    const [data, setData] = useState({})
    const [loading,setLoading] = useState(false)
    const {promotionId} = useParams();


    const getPromotion = async () => await getPromotionById(parseInt(promotionId)).then(p => {
        setData(p.data)
        setEndDate(p.data.endDate)
        setCreateDate(p.data.createDate)
    })


    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getPromotion().then(r => {
            setLoading(true)
        })

    }, [])


    return (
        <div>
            {
                loading ? (
                    <div className="new">
                        <SideBar/>
                        <div className="newContainer">
                            <NavBar/>
                            <div className="top">
                                <h1>Dmm</h1>
                            </div>
                            <Box component="form" noValidate  sx={{mt: 3}}
                                 style={{padding: '20px', margin: 'auto', width: '50%'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Promotion Name"
                                            value={data.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="sale"
                                            required
                                            fullWidth
                                            id="sale"
                                            type="number"
                                            value={data.sale}
                                            label="Sale (%)"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Create date"
                                                value={createDate}
                                                disabled
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(newValue) => {
                                                    setCreateDate(newValue.toISOString().slice(0, 10));
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="End date"
                                                value={endDate}
                                                disabled
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(newValue) => {
                                                    setEndDate(newValue.toISOString().slice(0, 10));
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="description"
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            multiline
                                            value={data.description}
                                            rows={4}
                                        />
                                    </Grid>

                                </Grid>
                            </Box>
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="DANH MỤC" value="1" />
                                            <Tab label="SẢN PHẨM" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <CategoryPromotion promotionId ={data.id}/>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <BookPromotion promotionId={data.id}/>
                                    </TabPanel>

                                </TabContext>
                            </Box>
                        </div>
                    </div>
                ) : <></>
            }
        </div>
    )
}
export default DetailPromotion
