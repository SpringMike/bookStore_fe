import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {createCategory, findByIdBook, findByIdCate, updateCategory} from "../../api/Api";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";

const UpdateCategory = () => {
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

    const [name, setName] = useState("")
    const [note, setNote] = useState("");

    const {cateId} = useParams();

    const getCate = async () => await findByIdCate(parseInt(cateId)).then(b => {
        setName(b.data.name)
        setNote(b.data.note)
    })

    useEffect(() => {
        getCate().then(r => {
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const cate = {
            id: parseInt(cateId),
            name: name,
            note: note,
        }
        updateCategory(cate).then(() => {
            navigate("/admin/categories")
            Toast.fire({
                icon: 'success',
                title: 'Update successfully'
            }).then(r => {
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
                        <h1>Update category</h1>
                    </div>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}
                         style={{padding: '20px', margin: 'auto', width: '50%'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    value={name}
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Category Name"
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    value={note}
                                    name="note"
                                    fullWidth
                                    id="note"
                                    label="Category Note"
                                    multiline
                                    rows={4}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}} style={{width: '30%'}}
                        >
                            Update
                        </Button>

                    </Box>

                </div>
            </div>
        </div>
    )
}
export default UpdateCategory
