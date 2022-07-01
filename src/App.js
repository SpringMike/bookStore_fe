import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import List from "./admin/pages/book/List";
import ListAccount from "./admin/pages/account/ListAccount";
import New from "./admin/pages/book/New";
import {userInputs} from "./admin/Formsource";
import './admin/css/style.css'
import Update from "./admin/pages/book/Update";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Details from "./pages/Details";
import CheckoutCart from "./pages/CheckoutCart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ListCategory from "./admin/pages/category/ListCategory";
import NewCategory from "./admin/pages/category/NewCategory";
import UpdateCategory from "./admin/pages/category/UpdateCategory";
import ListOrder from "./admin/pages/order/ListOrder";
import AccountInfo from "./pages/AccountInfo";
import ProtectedRoutes from "./security/ProtectedRoutes";
import ProtectedRoutesWithRole from "./security/ProtectedRoutesWithRole";
import ListPromotion from "./admin/pages/promotion/ListPromotion";
import NewPromotion from "./admin/pages/promotion/NewPromotion";
import DetailPromotion from "./admin/pages/promotion/DetailPromotion";
import SuccesPayment from "./pages/SuccesPayment";
import TransactionHistory from "./admin/pages/TransactionHistory/TransactionHistory";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home/>}/>
                        <Route path="detail/bookId=:bookId" element={<Details/>}/>
                        <Route path="/sign-in" element={<SignIn/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>

                    </Route>

                    <Route element={<ProtectedRoutes/>}>
                        <Route path="checkout-cart" element={<CheckoutCart/>}/>
                        <Route path="/accounts" element={<AccountInfo/>}/>
                        <Route path="/success-payment" element={<SuccesPayment/>}/>
                    </Route>

                    <Route path="/admin" element={<ProtectedRoutesWithRole/>}>
                        <Route path="books">
                            <Route index element={<List/>}/>
                            <Route path=":bookId" element={<Update/>}/>
                            <Route
                                path="new"
                                element={<New inputs={userInputs} title="Add New Book"/>}
                            />
                        </Route>
                        <Route path="accounts">
                            <Route index element={<ListAccount/>}/>
                        </Route>
                        <Route path="categories">
                            <Route index element={<ListCategory/>}/>
                            <Route path=":cateId" element={<UpdateCategory/>}/>
                            <Route
                                path="new"
                                element={<NewCategory inputs={userInputs} title="Add New Category"/>}
                            />
                        </Route>
                        <Route path="orders">
                            <Route index element={<ListOrder id={1} nextIdOrder={2} title={"On Waiting"}/>}/>
                            <Route path="onConfirm"
                                   element={<ListOrder id={2} nextIdOrder={3} title={"On Confirm"}/>}/>
                            <Route path="onTheWay"
                                   element={<ListOrder id={3} nextIdOrder={4} title={"On the way"}/>}/>
                            <Route path="hasArrived"
                                   element={<ListOrder id={4} nextIdOrder={0} title={"Has arrived"}/>}/>
                        </Route>
                        <Route path="promotions">
                            <Route index element={<ListPromotion/>}/>
                            <Route path="new" element={<NewPromotion/>}/>
                            <Route path=":promotionId" index element={<DetailPromotion/>}/>
                        </Route>
                        <Route path="transaction">
                            <Route index element={<TransactionHistory/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
