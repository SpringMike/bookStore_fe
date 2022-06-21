import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format'

const FeaturedBook = (props) => {
    const theme = createTheme({
        typography: {
            txtPrice: {
                color: 'red',
                fontWeight: 'bold',
                fontSize: '16px',

            },
            txtTitle: {
                textTransform: 'capitalize',
                display: 'block',
                marginBottom: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                color: 'black',
            },
            txtOldPrice: {
                textDecoration: 'line-through',
                color: "gray"
            },
            txtDiscount: {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                right: 'auto',
                display: 'block',
                width: '60px',
                padding: '9px 5px',
            }
        },
    });

    const {book} = props
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,

    };


    return (

        <ThemeProvider theme={theme}>
            <Grid item xs={12} md={3}>
                <CardActionArea component="div">
                    <Card sx={{display: 'block', padding: '10px'}}>
                        {
                            book.blackListPromotionId === null ? (
                                <CardContent sx={{flex: 1}} style={{position: 'relative'}}>
                                    <Slider {...settings}>
                                        <div>
                                            <CardMedia className="imageSwiper"
                                                       component="img"
                                                       sx={{width: "100%", display: {xs: 'none', sm: 'block', margin: "auto"}}}
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
                                                    -{book.sale}%
                                                </Typography>
                                            </div>
                                        ) : <></>
                                    }

                                    <div style={{marginLeft: "5px", marginTop: "5px"}}>
                                        <Link to={'detail/bookId=' + book.id} style={{textDecoration: "none"}}>
                                            <Typography variant="txtTitle">
                                                {
                                                    book.name.length > 20 ? book.name.substring(0, 20) + "..." : book.name
                                                }
                                            </Typography>
                                        </Link>
                                        {
                                            book.newPrice !== null ? (
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                                            ) :(
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <Typography variant="txtPrice">
                                                        <CurrencyFormat value={book.price} displayType={'text'}
                                                                        thousandSeparator={true}
                                                                        suffix={' đ'}/>
                                                    </Typography>
                                                </div>
                                            )
                                        }
                                    </div>
                                </CardContent>
                            ) : (
                                <CardContent sx={{flex: 1}} style={{position: 'relative'}}>
                                    <Slider {...settings}>
                                        <div>
                                            <CardMedia className="imageSwiper"
                                                       component="img"
                                                       sx={{width: "100%", display: {xs: 'none', sm: 'block', margin: "auto"}}}
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


                                    <div style={{marginLeft: "5px", marginTop: "5px"}}>
                                        <Link to={'detail/bookId=' + book.id} style={{textDecoration: "none"}}>
                                            <Typography variant="txtTitle">
                                                {
                                                    book.name.length > 20 ? book.name.substring(0, 20) + "..." : book.name
                                                }
                                            </Typography>
                                        </Link>

                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <Typography variant="txtPrice">
                                                <CurrencyFormat value={book.price} displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' đ'}/>
                                            </Typography>
                                        </div>


                                    </div>

                                </CardContent>
                            )
                        }

                    </Card>
                </CardActionArea>
            </Grid>
        </ThemeProvider>

    )
}

export default FeaturedBook
