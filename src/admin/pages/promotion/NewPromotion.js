import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {createCategory, createPromotion} from "../../api/Api";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useState} from "react";

const NewPromotion = () => {

    const [createDate, setCreateDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const promotion = {
            name: data.get('name'),
            sale: data.get('sale'),
            activated: true,
            createDate: createDate,
            endDate: endDate,
            description:data.get('description')
        }
        createPromotion(promotion).then(() => {
            Toast.fire({
                icon: 'success',
                title: 'Create successfully'
            }).then(r => {
                navigate("/admin/promotions")
            })
        })
    }

    return (
        <div>
            <div className="new">
                <SideBar/>
                <div className="newContainer">
                    <NavBar/>
                    <div className="top">
                        <h1>Add new promotion</h1>
                    </div>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}
                         style={{padding: '20px', margin: 'auto', width: '50%'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Promotion Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="sale"
                                    required
                                    fullWidth
                                    id="sale"
                                    type="number"
                                    label="Sale (%)"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Create date"
                                        value={createDate}
                                        onChange={(newValue) => {
                                            setCreateDate(newValue.toISOString().slice(0, 10));
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="End date"
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue.toISOString().slice(0, 10));
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
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
                                    rows={4}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}} style={{width: '30%'}}
                        >
                            Create
                        </Button>

                    </Box>

                </div>
            </div>
        </div>
    )
}
export default NewPromotion
