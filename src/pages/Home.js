import NavBar from "../components/NavBar";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import FeaturedBook from "../components/FeaturedBook";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from "react";
import {getBookByCategory, getBooks, getCategories} from "../admin/api/Api";

const Home = () => {

    const mainFeaturedPost = {
        title: 'Title of a longer featured blog post',
        description:
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random',
        imageText: 'main image description',
        linkText: 'Continue reading…',
    };
    const [bookByCategory, setBookByCategory] = useState([])

    useEffect(() =>{
        getBookByCategory(4).then(p => {
            setBookByCategory(p.data.content)
        })
    },[])

    const theme = createTheme();
    const [value, setValue] = useState('4');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        getBookByCategory(parseInt(newValue)).then(p => {
            setBookByCategory(p.data.content)

        })
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar/>
                <main>
                    <Carousel post={mainFeaturedPost}/>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={value} style={{justifyContent:'center!important'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                         style={{justifyContent: "center"}}>
                                    <Tab label="Văn Học" value="4"/>
                                    <Tab label="Kinh Tế" value="5"/>
                                    <Tab label="Kỹ Năng" value="6"/>
                                    <Tab label="Thiếu Nhi" value="7"/>
                                </TabList>
                            </Box>
                            <TabPanel value="4" className="dit me may the a cai lonn a">
                                <Grid container spacing={4}>
                                    {
                                        bookByCategory ? bookByCategory.map((book,key) => (
                                            <FeaturedBook key={key} book={book}/>
                                        )) : <></>
                                    }
                                    {/*<Slider {...settings}>*/}
                                    {/*{featuredPosts.map((post) => (*/}
                                    {/*    <FeaturedBook key={post.title} post={post} />*/}
                                    {/*))}*/}
                                    {/*</Slider>*/}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="5">
                                <Grid container spacing={4}>
                                    {
                                        bookByCategory ? bookByCategory.map((book,key) => (
                                            <FeaturedBook key={key} book={book}/>
                                        )) : <></>
                                    }
                                </Grid>
                            </TabPanel>
                            <TabPanel value="6">
                                <Grid container spacing={4}>
                                {
                                    bookByCategory ? bookByCategory.map((book,key) => (
                                        <FeaturedBook key={key} book={book}/>
                                    )) : <></>
                                }
                                </Grid>
                            </TabPanel>
                            <TabPanel value="7">
                                <Grid container spacing={4}>
                                {
                                    bookByCategory ? bookByCategory.map((book,key) => (
                                        <FeaturedBook key={key} book={book}/>
                                    )) : <></>
                                }
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    )
}
export default Home
