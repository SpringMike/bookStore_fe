import {useEffect, useState} from "react";
import {deleteCartDetail, getPaymentInfo, saveOrder} from "../admin/api/Api";
import {useLocation, useSearchParams} from "react-router-dom";
import Auth from "../security/Auth";

const SuccessPayment = () => {
    const [paymentInfo, setPaymentInfo] = useState({});

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const amount = query.get('vnp_Amount');
    const bankCode = query.get('vnp_BankCode');
    const vnp_BankTranNo = query.get('vnp_BankTranNo');
    const vnp_CardType = query.get('vnp_CardType');
    const vnp_OrderInfo = query.get('vnp_OrderInfo');
    const vnp_PayDate = query.get('vnp_PayDate');
    const vnp_ResponseCode = query.get('vnp_ResponseCode');
    const vnp_TmnCode = query.get('vnp_TmnCode');
    const vnp_TransactionNo = query.get('vnp_TransactionNo');
    const vnp_TransactionStatus = query.get('vnp_ResponseCode');
    const vnp_TxnRef = query.get('vnp_TxnRef');
    const vnp_SecureHash = query.get('vnp_SecureHash');
    const [load,setLoad] = useState(true)

    useEffect(() =>{
        if(load){
            const order = Auth.getCurrentOrder();
            setLoad(false)
            saveOrder(order).then(() =>{
                const accountId = order.accountId;
                getPaymentInfo(amount,bankCode,vnp_BankTranNo,vnp_CardType,vnp_OrderInfo,vnp_PayDate,vnp_ResponseCode,vnp_TmnCode
                    ,vnp_TransactionNo,vnp_TransactionStatus,vnp_TxnRef,vnp_SecureHash,accountId).then((p) =>{
                    setPaymentInfo(p.data)
                    localStorage.removeItem("order")
                })
            })
            deleteCartDetail(Auth.getListCartId()).then((c) => {
                localStorage.removeItem("listCartId")

            })
        }
    },[])
    return(
        <div style={{textAlign:'center'}}>
            <p>Amount: {paymentInfo.amount}</p>
            <p>bankCode: {paymentInfo.bankCode}</p>
            <p>bankTranNo: {paymentInfo.bankTranNo}</p>
            <p>cardType: {paymentInfo.cardType}</p>
            <p>payDate: {paymentInfo.payDate}</p>
            <p>orderInfo: {paymentInfo.orderInfo}</p>
        </div>
    )
}
export default SuccessPayment
