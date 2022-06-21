import {useParams} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {ThemeProvider} from "@emotion/react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {Breadcrumbs, createTheme, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {useEffect, useState} from "react";
import {
    addToCart,
    findCart,
    findFavoriteByAccountAndBook,
    getDetailBook,
    saveFavorite,
    updateFavorite
} from "../admin/api/Api";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import CurrencyFormat from 'react-currency-format'
import IconButton from '@mui/material/IconButton';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Button from "@mui/material/Button";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableCell from "@mui/material/TableCell";
import Swal from "sweetalert2";
import Auth from "../security/Auth";
import CommentSection from "./CommentSection";


const Details = () => {
    const {bookId} = useParams();
    const [isFavorite,setIsFavorite] = useState(false)
    const [favorite,setFavorite] = useState({})
    const handleClickBreadCrumb = () => {

    }

    const findFav = async () => findFavoriteByAccountAndBook(Auth.getCurrentUser().id,bookId).then(r =>{
        if (r.data !== ""){
            setIsFavorite(true)
            setFavorite(r.data)
        }
    })

    const [book, setBook] = useState({});
    useEffect(() => {
        getDetailBook(bookId).then((b) => {
            setBook(b.data)
        })
        findFav().then(r =>{})
    }, [])

    const addFavorite = () =>{
        const favorite = {
            accountId: Auth.getCurrentUser().id,
            bookId: bookId,
            status: true
        }
        saveFavorite(favorite).then(() =>{
            findFav()
            Toast.fire({
                icon: 'success',
                title: 'Add to favorite successfully'
            }).then(r => {

            })
        })
    }
    const updateStatusFavorite = () =>{
        const favorite1 = {
            accountId: Auth.getCurrentUser().id,
            bookId: bookId,
            status: !favorite.status
        }
        updateFavorite(favorite1).then(() =>{
            findFav()
            Toast.fire({
                icon: 'success',
                title: 'Update favorite successfully'
            }).then(r => {

            })
        })
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,

    };
    const [quantityValue, setQuantityValue] = useState(0);

    const [valueTab, setValueTab] = useState('1');





    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
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
    const theme = createTheme({
        typography: {
            txtPrice: {
                color: 'red',
                fontWeight: 'bold',
                fontSize: '20px',
                marginBottom: '15px',
                marginRight: '15px'
            },
            txtTitle: {
                textTransform: 'capitalize',
                display: 'block',
                marginBottom: '8px',
                fontSize: '25px',
                fontWeight: 'bold',
                color: 'black',
                borderBottom: '1px solid #f99',
                margin: '0 0 10px 0',
                padding: '9px 0 10px 0',
            },
            txtDiscount: {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                right: 'auto',
                display: 'block',
                width: '60px',
                padding: '9px 5px',
            },
            txtOldPrice: {
                textDecoration: 'line-through',
                color: "gray"
            }
        }
    })

    const handleAddToCart = () => {
        findCart(Auth.getCurrentUser().id).then((r) => {
            const book = {
                quantity: quantityValue,
                bookId: bookId,
                cartId: r.data
            }
            addToCart(book).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Add to your cart successfully'
                }).then(r => {
                })
            })
        })

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar/>
                <main>
                    <div role="presentation" onClick={handleClickBreadCrumb}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                MUI
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/material-ui/getting-started/installation/"
                            >
                                Core
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href="/material-ui/react-breadcrumbs/"
                                aria-current="page"
                            >
                                Breadcrumbs
                            </Link>
                        </Breadcrumbs>
                    </div>

                    <Grid container spacing={4} style={{marginTop: "10px"}}>
                        <Grid item xs={4}>
                            <CardContent sx={{flex: 1}} style={{position: 'relative'}}>
                                <Slider {...settings}>
                                    <div>
                                        <CardMedia className="imageSwiper"
                                                   component="img"
                                                   sx={{
                                                       width: "100%",
                                                       display: {xs: 'none', sm: 'block', margin: "auto"}
                                                   }}
                                                   image={book.front_cover_image}

                                        />
                                    </div>
                                    <div>
                                        <CardMedia
                                            component="img"
                                            sx={{width: "100%", display: {xs: 'none', sm: 'block', margin: "auto"}}}
                                            image={book.back_cover_image}

                                        />
                                    </div>
                                </Slider>
                                {
                                    book.sale !== null ? (
                                        <div className="thumbDiscountLabel">
                                            <Typography variant="txtDiscount">
                                                {book.sale}%
                                            </Typography>
                                        </div>
                                    ) : <></>
                                }
                            </CardContent>
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent sx={{flex: 1}}>
                                {
                                    book.newPrice === null || book.blackListPromotionId !== null ?
                                        (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Typography variant="txtPrice">
                                                    <CurrencyFormat value={book.price} displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={' đ'}/>
                                                </Typography>
                                            </div>
                                        ) : (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            }}>
                                                <Typography variant="txtPrice">
                                                    <CurrencyFormat value={book.newPrice} displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={' đ'}/>
                                                </Typography>
                                                <Typography variant="txtOldPrice">
                                                    <CurrencyFormat value={book.price} displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={' đ'}/>
                                                </Typography>
                                            </div>
                                        )
                                }

                                <Typography variant="subtitle1" paragraph>
                                    <b>Mô tả ngắn:</b><br/>
                                    {book.description}
                                </Typography>
                                <div style={{display: "flex", justifyContent: "space-between", width: '30%'}}>
                                    <p>Còn hàng: </p>
                                    <p style={{color: '#15c'}}>
                                        {book.quantity} sản phẩm
                                    </p>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between", width: '40%'}}>
                                    <p>Số lượng: </p>
                                    <div style={{width: '57%', display: 'flex'}}>
                                        <TextField
                                            id="outlined-number"
                                            label="Number"
                                            type="number"
                                            value={quantityValue}
                                            onChange={(e) => setQuantityValue(e.target.value)}
                                        />
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <IconButton onClick={(e) => setQuantityValue(parseInt(quantityValue) + 1)}
                                                        aria-label="plus" size="small">
                                                <AddRoundedIcon/>
                                            </IconButton>
                                            <IconButton onClick={(e) => setQuantityValue(parseInt(quantityValue) - 1)}
                                                        aria-label="minus" size="small">
                                                <RemoveOutlinedIcon/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    background: "#f3f3f3",
                                    padding: "10px"
                                }}>
                                    {
                                        isFavorite ? (
                                            <div>
                                                {
                                                    favorite.status ? (
                                                        <IconButton onClick={updateStatusFavorite} className="heartIcon2" aria-label="minus" size="small">
                                                            <FavoriteOutlinedIcon/>
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton onClick={updateStatusFavorite} className="heartIcon" aria-label="minus" size="small">
                                                            <FavoriteOutlinedIcon/>
                                                        </IconButton>
                                                    )
                                                }
                                            </div>
                                        ) : (
                                            <IconButton onClick={addFavorite} className="heartIcon" aria-label="minus" size="small">
                                                <FavoriteOutlinedIcon/>
                                            </IconButton>
                                        )
                                    }
                                    <Button variant="contained" color="error" onClick={handleAddToCart}
                                            startIcon={<AddShoppingCartOutlinedIcon/>}>
                                        Chọn mua
                                    </Button>
                                </div>

                            </CardContent>
                        </Grid>
                    </Grid>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={valueTab} style={{justifyContent: 'left!important'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Mô tả sản phẩm" value="1"/>
                                    <Tab label="Thông tin chi tiết" value="2"/>
                                    <Tab label="Đánh giá khách hàng" value="3"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {book.description}
                            </TabPanel>
                            <TabPanel value="2" style={{fontSize: '14px'}}>
                                <div style={{padding: "10px"}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Tên sản phẩm: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.name}
                                    </div>
                                </div>
                                <div style={{padding: "10px", backgroundColor: '#fff0f0'}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Danh mục: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.categoryName}
                                    </div>
                                </div>
                                <div style={{padding: "10px"}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Ngôn ngữ: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.language}
                                    </div>
                                </div>
                                <div style={{padding: "10px", backgroundColor: '#fff0f0'}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Số trang: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.number_page}
                                    </div>
                                </div>
                                <div style={{padding: "10px"}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Năm xuất bản: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.public_year}
                                    </div>
                                </div>
                                <div style={{padding: "10px", backgroundColor: '#fff0f0'}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Tên tác giả: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.authorName}
                                    </div>
                                </div>
                                <div style={{padding: "10px"}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Nhà cung cấp:  </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.supplierName}
                                    </div>
                                </div>
                                <div style={{padding: "10px", backgroundColor: '#fff0f0'}}>
                                    <span style={{textTransform: "uppercase", width: "280px", display: "inline-block"}}>Nhà xuất bản:  </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {book.publisherName}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value="3">
                                <CommentSection bookId={bookId}/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    )
}
export default Details
