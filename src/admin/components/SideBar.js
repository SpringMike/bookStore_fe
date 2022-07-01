import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {Link} from "react-router-dom";
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
const SideBar = () =>{
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">EBook Admin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to="/admin/accounts" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/admin/books" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Products</span>
                        </li>
                    </Link>
                    <Link to="/admin/categories" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Category</span>
                        </li>
                    </Link>
                    <Link to="/admin/promotions" style={{ textDecoration: "none" }}>
                    <li>
                        <PaidIcon className="icon" />
                        <span>Promotions</span>
                    </li>
                    </Link>
                    <Link to="/admin/transaction" style={{ textDecoration: "none" }}>
                    <li>
                        <ReceiptIcon className="icon" />
                        <span>Transaction</span>
                    </li>
                    </Link>
                    <p className="title">Order</p>
                    <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders on waiting</span>
                    </li>
                    </Link>
                    <Link to="/admin/orders/onConfirm" style={{ textDecoration: "none" }}>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders on confirm</span>
                    </li>
                    </Link>
                    <Link to="/admin/orders/onTheWay" style={{ textDecoration: "none" }}>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders on the way</span>
                    </li>
                    </Link>
                    <Link to="/admin/orders/hasArrived" style={{ textDecoration: "none" }}>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders has arrived</span>
                    </li>
                    </Link>
                </ul>
            </div>

        </div>
    )
}
export default SideBar
