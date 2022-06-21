import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useEffect, useState} from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import {createBooks, getAuthors, getBooks, getCategories, getPublishers, getSuppliers} from "../../api/Api";
import {MenuItem, Select} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
const New = ({ inputs, title }) => {
    const [frontImage, setFrontImage] = useState("");
    const [backImage, setBackImage] = useState("");
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [quantity,setQuantity] = useState("");
    const [numberPage,setNumberPage] = useState("");
    const [publicYear,setPublicYear] = useState("");
    const [language,setLanguage] = useState("");
    const [authorId,setAuthorId] = useState(0);
    const [categoryId,setCategoryId] = useState(0);
    const [supplierId,setSupplierId] = useState(0);
    const [publisherId,setPublisherId] = useState(0);

    const [author, setAuthor] = useState([]);
    const [category, setCategory] = useState([]);
    const [publisher, setPublisher] = useState([]);
    const [supplier, setSupplier] = useState([]);

    const [isLoading, setIsLoading] = useState(null);

    useEffect(() =>{
        getAuthors().then((a) =>{
            setAuthor(a.data.reverse())
        })
        getCategories().then((c) =>{
            setCategory(c.data.reverse())
        })
        getPublishers().then((p) =>{
            setPublisher(p.data.reverse())
        })
        getSuppliers().then((s) =>{
            setSupplier(s.data.reverse())
        })
    },[])

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formDataFront = new FormData()
        formDataFront.append("file",frontImage)
        formDataFront.append("upload_preset","pdit1pdw")

        const formDataBack = new FormData()
        formDataBack.append("file",backImage)
        formDataBack.append("upload_preset","pdit1pdw")

        const book = {
            "name": name,
            "numberPage": numberPage,
            "price": price,
            "publicYear": publicYear,
            "quantity": quantity,
            "status": true,
            "language": language,
            "categoryId": categoryId === 0 ? null : categoryId,
            "authorId": authorId === 0 ? null : authorId,
            "supplierId": supplierId === 0 ? null : supplierId,
            "publisherId": publisherId === 0 ? null : publisherId,
            "description": description,
        }

        await axios.post("https://api.cloudinary.com/v1_1/dn3or1mnp/image/upload", formDataBack).then((res)=>{
            book.backCoverImage = res.data.secure_url
        })
        await axios.post("https://api.cloudinary.com/v1_1/dn3or1mnp/image/upload", formDataFront).then((res)=>{
            book.frontCoverImage = res.data.secure_url
        })


        await createBooks(book).then(() => {

            setIsLoading(false)
            Swal.fire(
                'Thành công',
                'Thêm mới thành công!',
                'success'
            ).then(() =>{
                navigate("/admin/books/")
            })

        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <div className="new">
            <SideBar />
            <div className="newContainer">
                <NavBar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <label>Front Image</label><br/>
                        <img
                            src={
                                frontImage
                                    ? URL.createObjectURL(frontImage)
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                            }
                            alt=""
                        /><br/>
                        <label>Back Image</label><br/>
                        <img
                            src={
                                backImage
                                    ? URL.createObjectURL(backImage)
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Book Name</label>
                                <input type="text" placeholder="book name"
                                       onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Price</label>
                                <input type="number" placeholder="price"
                                       onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Description</label>
                                <input type="text" placeholder="description"
                                       onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Quantity</label>
                                <input type="number" placeholder="quantity"
                                       onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Number Page</label>
                                <input type="number" placeholder="number page"
                                       onChange={(e) => setNumberPage(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Public Year</label>
                                <input type="text" placeholder="public year"
                                       onChange={(e) => setPublicYear(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Language</label>
                                <input type="text" placeholder="language"
                                       onChange={(e) => setLanguage(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Chose a category</label>
                                <Select style={{width: '100%',height:'43%',marginLeft:'3px',marginTop:'4px'}}
                                        value={categoryId} onChange={(e) => setCategoryId(e.target.value)} displayEmpty>
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        category.map((p, index) => (
                                            <MenuItem value={p.id} key={index}>{p.name}</MenuItem>)
                                        )}
                                </Select>
                            </div>
                            <div className="formInput">
                                <label>Chose a author</label>
                                <Select style={{width: '100%',height:'43%',marginLeft:'3px',marginTop:'4px'}}
                                        value={authorId} onChange={(e) => setAuthorId(e.target.value)} displayEmpty>
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        author.map((p, index) => (
                                            <MenuItem value={p.id} key={index}>{p.name}</MenuItem>)
                                        )}
                                </Select>
                            </div>
                            <div className="formInput">
                                <label>Chose a supplier</label>
                                <Select style={{width: '100%',height:'43%',marginLeft:'3px',marginTop:'4px'}}
                                        value={supplierId} onChange={(e) => setSupplierId(e.target.value)} displayEmpty>
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        supplier.map((p, index) => (
                                            <MenuItem value={p.id} key={index}>{p.name}</MenuItem>)
                                        )}
                                </Select>
                            </div>
                            <div className="formInput">
                                <label>Chose a publisher</label>
                                <Select style={{width: '100%',height:'43%',marginLeft:'3px',marginTop:'4px'}}
                                        value={publisherId} onChange={(e) => setPublisherId(e.target.value)} displayEmpty>
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        publisher.map((p, index) => (
                                            <MenuItem value={p.id} key={index}>{p.name}</MenuItem>)
                                        )}
                                </Select>
                            </div>
                            <div className="formInput" >
                                <label htmlFor="file1" style={{marginTop:"10px"}}>
                                   Front Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file1"
                                    onChange={(e) => setFrontImage(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="file2" style={{marginTop:"10px"}}>
                                    Back Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file2"
                                    onChange={(e) => setBackImage(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className="formInput">
                                <button onClick={handleSubmit} className="btn-submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default New
