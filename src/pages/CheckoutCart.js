import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {Backdrop, Breadcrumbs, CircularProgress, createTheme, TextField} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import CurrencyFormat from 'react-currency-format'
import Button from "@mui/material/Button";
import {
    createPayment,
    deleteCartDetail,
    findCart,
    getCart, getProvince,
    saveOrder,
    updateQuantityCardDetail
} from "../admin/api/Api";
import CardMedia from "@mui/material/CardMedia";
import Slider from "react-slick";
import {AllCheckerCheckbox, Checkbox, CheckboxGroup} from "@createnl/grouped-checkboxes";
import Swal from "sweetalert2";
import Auth from "../security/Auth";
import {useNavigate} from "react-router-dom";
import BookPopUp from "../admin/pages/promotion/BookPopUp";
import HomeIcon from '@mui/icons-material/Home';

import AddressPopUp from "./AddressPopUp";

const CheckoutCart = () => {
    const theme = createTheme({})


    const handleClickBreadCrumb = () => {

    }

    const [totalPriceCart, setTotalPriceCart] = useState(0)

    const [isShow, setIsShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [checkboxListCart, setCheckBoxListCart] = useState()
    let navigate = useNavigate();
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,

    };
    const [address,setAddress] = useState("")
    const [shippingCost,setShippingCost] = useState(0)
    const [isCheckBox,setIsCheckBox] = useState(false);
    const [totalPriceAfterShippingCost,setTotalPriceAfterShippingCost] = useState(0)

    useEffect(() => {
        findCart(Auth.getCurrentUser().id).then((r) =>{
            getCart(r.data).then((c) => {
                setCart(c.data)
            })
        })

    }, [isLoading])





    useEffect(() =>{
        setTotalPriceAfterShippingCost(totalPriceCart + shippingCost)
    },[shippingCost])

    const onCheckboxChange = (checkboxes) => {
        let newArr = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                newArr.push(checkboxes[i].value)
            }
        }
        if (newArr.length > 0) {
            setCheckBoxListCart(newArr)
            let total = 0
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].newPrice === null || newArr[i].promotionBlackListId !== null){
                    total = total + newArr[i].total
                }else {
                    total = total + newArr[i].newTotal
                }
            }
            setTotalPriceCart(total)
            if (shippingCost !== 0 ){
                setTotalPriceAfterShippingCost(total + shippingCost)
            }
        }else {
            setTotalPriceCart(0)
            setTotalPriceAfterShippingCost(0)
        }
    }

    // useEffect(() => {
    //     let total = 0
    //     for (let i = 0; i < checkboxListCart.length; i++) {
    //         if (checkboxListCart[i].newPrice === null || checkboxListCart[i].promotionBlackListId !== null){
    //             total = total + checkboxListCart[i].total
    //         }else {
    //             total = total + checkboxListCart[i].newTotal
    //         }
    //     }
    //     setTotalPriceCart(total)
    // }, [checkboxListCart])

    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    const onCheckOutCart = () =>{
        const now = new Date();
        const strDateTime = [[AddZero(now.getDate()),
            AddZero(now.getMonth() + 1),
            now.getFullYear()].join("/"),
            [AddZero(now.getHours()),
                AddZero(now.getMinutes())].join(":"),
            now.getHours() >= 12 ? "PM" : "AM"].join(" ");
        const list =[]
        const listId=[]
        for (let i = 0; i < checkboxListCart.length; i++) {
            if (checkboxListCart[i].newPrice === null || checkboxListCart[i].promotionBlackListId !== null ){
                list.push({
                    quantity: checkboxListCart[i].quantity,
                    price: checkboxListCart[i].price,
                    bookId: checkboxListCart[i].idBook,
                    status:true
                })
            }else {
                list.push({
                    quantity: checkboxListCart[i].quantity,
                    price: checkboxListCart[i].newPrice,
                    bookId: checkboxListCart[i].idBook,
                    sale:checkboxListCart[i].sale,
                    status:true
                })
            }
            listId.push(checkboxListCart[i].id)
        }
        localStorage.removeItem("listCartId");
        localStorage.setItem("listCartId",JSON.stringify(listId))

        const order = {
            create_date: strDateTime,
            total: totalPriceAfterShippingCost,
            description:"",
            accountId: Auth.getCurrentUser().id,
            orderDetails:list,
            address:address
        }
        const payment ={
            accountId: Auth.getCurrentUser().id,
            amount:totalPriceAfterShippingCost,
            description: "Thanh toan don hang",
            bankCode: "NCB"
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("order");
                localStorage.setItem("order", JSON.stringify(order));
                // saveOrder(order).then((c) => {
                    createPayment(payment).then((p) =>{
                        Swal.fire(
                            'Done!',
                            'Your cart has been checkout. You will be transfer to next page...',
                            'success'
                        ).then(r => {})
                        setTimeout(()=>{
                            window.open(p.data.url)
                        },1000)
                    })

                // })
            }
        })
        // deleteCartDetail(listId).then((c) => {
        // })
    }


    const onDeleteCartDetail = () =>{
        let list = []
        for (let i = 0; i < checkboxListCart.length; i++) {
           list.push(checkboxListCart[i].id)
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true)
                deleteCartDetail(list).then((c) => {
                    setTimeout(()=>{
                        setIsLoading(false)
                    },1000)
                    setTotalPriceCart(0)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then(r => {})
                })
            }
        })
    }

    const updateQuantity = (idCardDetail, quantity) => {
        setIsLoading(true)
        const cardDetail = {
            id: idCardDetail,
            quantity: quantity
        }
        updateQuantityCardDetail(cardDetail).then((c) => {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            Swal.fire(
                'Updated!',
                'Your file has been update.',
                'success'
            ).then(r => {})
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar/>
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
                <main>
                    <Grid container spacing={4} style={{
                        marginTop: "10px",
                        boxShadow: '0px 0px 0 1px rgb(0 0 0 / 10%) inset',
                        padding: '20px',
                        display: 'block'
                    }}>
                        <div style={{
                            display: "flex",
                            color: '#3d85c6',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{display: "flex"}}>
                                <ShoppingBasketIcon/>
                                <h3 style={{margin: '0', marginLeft: '5px'}}>Chi tiết giỏ hàng</h3>
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <Button onClick={() => onDeleteCartDetail()} variant="contained">Xoa san pham</Button>
                            </div>
                        </div>
                        <div>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 700}} aria-label="customized table" style={{marginTop: '20px'}}>
                                    <CheckboxGroup onChange={onCheckboxChange}>
                                        <TableHead style={{height: '50%'}}>
                                            <TableRow>
                                                <TableCell >
                                                    <AllCheckerCheckbox/>
                                                    {/*<input type="checkbox"  onClick={(e) => toggle(e.target)}/>Check all?*/}

                                                </TableCell>
                                                <TableCell >Sản phẩm</TableCell>
                                                <TableCell  align="center">Đơn giá</TableCell>
                                                <TableCell  align="center">Số lượng</TableCell>
                                                <TableCell  align="center">Tổng giá</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cart.map((cartDetail, key) => (
                                                <TableRow  key={key}>
                                                    <TableCell  align="center">
                                                        {/*<input type="checkbox" name="myobject"  value={cartDetail} />*/}
                                                        <Checkbox value={cartDetail}/>
                                                    </TableCell >
                                                    <TableCell  component="th" scope="row" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingLeft: '30px',
                                                    }}>
                                                        <Slider {...settings} style={{width: '100px'}}>
                                                            <div>
                                                                <CardMedia className="imageSwiper"
                                                                           component="img"
                                                                           sx={{
                                                                               width: "100%",
                                                                               display: {
                                                                                   xs: 'none',
                                                                                   sm: 'block',
                                                                                   margin: "auto"
                                                                               }
                                                                           }}
                                                                           image={cartDetail.fontImage}

                                                                />
                                                            </div>
                                                            <div>
                                                                <CardMedia
                                                                    className="imageSwiper"
                                                                    component="img"
                                                                    sx={{
                                                                        width: "100%",
                                                                        display: {
                                                                            xs: 'none',
                                                                            sm: 'block',
                                                                            margin: "auto"
                                                                        }
                                                                    }}
                                                                    image={cartDetail.backImage}

                                                                />
                                                            </div>
                                                        </Slider>
                                                        <div>
                                                            <h3 style={{marginLeft: '40px', color: '#3d85c6'}}>
                                                                {cartDetail.nameBook}
                                                            </h3>
                                                        </div>
                                                    </TableCell >
                                                    <TableCell  align="center" style={{padding:'0px'}}>
                                                        {
                                                            cartDetail.newPrice === null || cartDetail.promotionBlackListId !== null ?
                                                                (
                                                                    <p style={{fontSize: '16px', fontWeight: "bold"}}>
                                                                        <CurrencyFormat value={cartDetail.price}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}
                                                                                        suffix={' đ'}/>
                                                                    </p>
                                                                ) : (
                                                                    <p style={{fontSize: '16px', fontWeight: "bold"}}>
                                                                        <CurrencyFormat value={cartDetail.newPrice}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}
                                                                                        suffix={' đ'}/>
                                                                    </p>
                                                                )
                                                        }
                                                    </TableCell >
                                                    <TableCell  align="center">
                                                        <div style={{width: '40%', display: 'flex', margin: 'auto'}}>
                                                            <TextField
                                                                id="outlined-number"
                                                                label="Number"
                                                                type="number"
                                                                defaultValue={cartDetail.quantity}
                                                                onChange={(e) => {
                                                                    cartDetail.quantity = e.target.value
                                                                }}
                                                            />
                                                            <a onClick={() => updateQuantity(cartDetail.id, cartDetail.quantity)}
                                                               href="#" style={{
                                                                margin: 'auto',
                                                                marginLeft: '5px',
                                                                textDecoration: 'none',
                                                                color: '#3d85c6'
                                                            }}>Update</a>
                                                        </div>
                                                        <div>

                                                        </div>
                                                    </TableCell >
                                                    <TableCell align="center" >
                                                        <p style={{color: "red", fontSize: '16px', fontWeight: "bold"}}>
                                                            {
                                                                cartDetail.newPrice === null || cartDetail.promotionBlackListId !== null ?
                                                                    (
                                                                        <CurrencyFormat value={cartDetail.total}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}
                                                                                        suffix={' đ'}/>
                                                                    ) : (
                                                                        <CurrencyFormat value={cartDetail.newTotal}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}
                                                                                        suffix={' đ'}/>
                                                                    )
                                                            }

                                                        </p>
                                                    </TableCell >

                                                </TableRow >

                                            ))}
                                        </TableBody>
                                    </CheckboxGroup>
                                </Table>
                            </TableContainer>
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "space-between", borderTop: '1px solid rgb(194, 198, 198)',
                            padding: '10px',
                            margin: '28px 0',
                            borderBottom: '1px solid rgb(194, 198, 198)',
                            justifyItems: 'center'
                        }}>
                            <div style={{display: 'flex', height: '50%'}}>
                                {
                                    isShow ? (
                                        <AddressPopUp totalPrice ={totalPriceCart} address={setAddress} shippingCost = {setShippingCost}  passChildData2={setIsShow}/>
                                    ) : (
                                        <Button variant="outlined" startIcon={<HomeIcon />}  onClick={() => {
                                            setIsShow(o => !o)
                                        }}>
                                            Add a address
                                        </Button>
                                    )
                                }
                            </div>
                            <div>
                                <div style={{padding: "5px"}}>
                                    <span style={{width: "280px", display: "inline-block"}}>Tạm tính: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px', float: 'right'}}>
                                        <p style={{fontWeight: "bold", fontSize: "18px", margin: '0'}}>
                                            <CurrencyFormat value={totalPriceCart} displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={' đ'}/>
                                        </p>
                                    </div>
                                </div>
                                <div style={{padding: "5px"}}>
                                    <span style={{width: "280px", display: "inline-block"}}>Chi phí vận chuyển: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px', float: 'right'}}>
                                        <CurrencyFormat value={shippingCost} displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'+ '}
                                                        suffix={' đ'}/>
                                    </div>
                                </div>
                                <div style={{padding: "5px"}}>
                                    <span style={{width: "280px", display: "inline-block"}}>Tổng cộng: </span>
                                    <div style={{display: 'inline-block', marginLeft: '5px', float: 'right'}}>
                                        <p style={{fontWeight: "bold", fontSize: "18px", margin: '0'}}>
                                            <CurrencyFormat value={totalPriceAfterShippingCost} displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={' đ'}/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                            <div>
                                <Button variant="contained">Tiếp tục mua hàng</Button>
                            </div>
                            <div>
                                <Button onClick={() => onCheckOutCart()} variant="contained">Thanh toán</Button>
                            </div>
                        </div>
                    </Grid>
                </main>
            </Container>
            <Footer/>

        </ThemeProvider>

        // <CheckboxGroup onChange={onCheckboxChange}>
        //     <AllCheckerCheckbox/>
        //     {cart.map((cartDetail, key) => (
        //
        //         <div  key ={key}>
        //             {/*<input type="checkbox" name="myobject"  value={cartDetail} />*/}
        //             <Checkbox value={cartDetail}/>
        //         </div>))}
        // </CheckboxGroup>
    )
}
export default CheckoutCart
