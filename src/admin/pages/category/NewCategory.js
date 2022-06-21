import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {createAccount, createCategory} from "../../api/Api";
import Toast from "sweetalert2";
import Swal from "sweetalert2";


const NewCategory = ({title}) => {
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
        const cate = {
            name: data.get('name'),
            note: data.get('note'),
            status: true
        }
        createCategory(cate).then(() => {
            Toast.fire({
                icon: 'success',
                title: 'Create successfully'
            }).then(r => {
                navigate("/admin/categories")
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
                        <h1>{title}</h1>
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
                                    label="Category Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="note"
                                    fullWidth
                                    id="note"
                                    label="Category Note"
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
export default NewCategory
