import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import {createTheme, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {ThemeProvider} from "@emotion/react";
import {useState} from "react";
import OrderHistory from "./OrderHistory";
import PopupExample from "../components/PopupExample";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ListFavorite from "./ListFavorite";

function TabPanel(props) {
    const {children, value, index, ...other} = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const AccountInfo = () => {

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function handleClickBreadCrumb() {

    }

    const theme = createTheme({})
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar/>
                <main>
                    <Box
                        sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 724}}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{borderRight: 1, borderColor: 'divider'}}
                        >
                            <Tab label="lICH SU DAT HANG" {...a11yProps(0)} />
                            <Tab label="SAN PHAM DA THICH" {...a11yProps(1)} />
                            <Tab label="QUAN LY HO SO" {...a11yProps(2)} />
                            <Tab label="DANG XUAT" {...a11yProps(3)} />

                        </Tabs>


                        <OrderHistory value={value}/>
                        <ListFavorite value={value} index={1}/>
                        {/*<TabPanel value={value} index={1}>*/}
                        {/*    Item Two*/}
                        {/*</TabPanel>*/}
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Item Four
                        </TabPanel>

                    </Box>

                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    )
}
export default AccountInfo
