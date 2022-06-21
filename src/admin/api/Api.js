import axios from "axios";
import authHeader from "../../security/AuthHeader";
import ghnHeader from "../../security/ghnHeader";


export const getBooks = async () => {
    return await axios.get(`${process.env.REACT_APP_API}books/getAllBook`,{ headers: authHeader() })
}
export const getSuppliers = async () => {
    return await axios.get(`${process.env.REACT_APP_API}suppliers`,{ headers: authHeader() })
}
export const getPublishers = async () => {
    return await axios.get(`${process.env.REACT_APP_API}publishers`,{ headers: authHeader() })
}
export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}categories`,{ headers: authHeader() })
}
export const getAuthors= async () => {
    return await axios.get(`${process.env.REACT_APP_API}authors`,{ headers: authHeader() })
}
export const createBooks= async(book) =>{
    return await axios.post(`${process.env.REACT_APP_API}books`, book,{ headers: authHeader() })
}
export const updateStatusProduct= async(id) =>{
    return await axios.put(`${process.env.REACT_APP_API}books/updateStatus/${id}`)
}
export const findByIdBook= async(id) =>{
    return await axios.get(`${process.env.REACT_APP_API}books/updateBook/${id}`)
}
export const updateBook= async(book) =>{
    return await axios.put(`${process.env.REACT_APP_API}books`,book,{ headers: authHeader() })
}

export const getBookByCategory = async (categoryId) => {
    return await axios.get(`${process.env.REACT_APP_API}books?categoryId=${categoryId}`)
}
export const getDetailBook = async (bookId) =>{
    return await axios.get(`${process.env.REACT_APP_API}books/${bookId}`)
}
export const getCart = async (cartId) =>{
    return await axios.get(`${process.env.REACT_APP_API}cartDetails/${cartId}`,{ headers: authHeader() })
}
export const updateQuantityCardDetail= async(cardDetail) =>{
    return await axios.put(`${process.env.REACT_APP_API}cartDetails`,cardDetail,{ headers: authHeader() })
}
export const deleteCartDetail= async(id) =>{
    return await axios.delete(`${process.env.REACT_APP_API}cartDetails?id=${id}`,{ headers: authHeader() })
}
export const createAccount= async(account) =>{
    return await axios.post(`${process.env.REACT_APP_API}accounts`, account)
}
export const getAccounts = async () => {
    return await axios.get(`${process.env.REACT_APP_API}accounts`)
}
export const updateAccountStatus = async (id) => {
    return await axios.put(`${process.env.REACT_APP_API}accounts/updateStatus/${id}`,{ headers: authHeader() })
}
export const updateRole = async (account) => {
    return await axios.put(`${process.env.REACT_APP_API}accounts/updateRole`,account,{ headers: authHeader() })
}
export const createCategory= async(cate) =>{
    return await axios.post(`${process.env.REACT_APP_API}categories`, cate,{ headers: authHeader() })
}
export const updateCategoryStatus = async (id) => {
    return await axios.put(`${process.env.REACT_APP_API}categories/updateStatus/${id}`,{ headers: authHeader() })
}
export const findByIdCate= async(id) =>{
    return await axios.get(`${process.env.REACT_APP_API}categories/${id}`,{ headers: authHeader() })
}
export const updateCategory = async (cate) => {
    return await axios.put(`${process.env.REACT_APP_API}categories`,cate,{ headers: authHeader() })
}
export const addToCart= async(cartDetail) =>{
    return await axios.post(`${process.env.REACT_APP_API}cartDetails`, cartDetail,{ headers: authHeader() })
}
export const findCart= async(id) =>{
    return axios.get(`${process.env.REACT_APP_API}accounts/findCart/${id}`,{ headers: authHeader() })
}
export const saveOrder = async (order) =>{
    return await axios.post(`${process.env.REACT_APP_API}orders`, order,{ headers: authHeader() })
}
export const loadOrderOnConfirm = async (id) =>{
    return axios.get(`${process.env.REACT_APP_API}orders/findByStatus/${id}`,{ headers: authHeader() })
}
export const getOrderDetailById = async (id)=>{
    return axios.get(`${process.env.REACT_APP_API}orders/findById/${id}`,{ headers: authHeader() })

}
export const updateStatusOrder = async (id,order) =>{
    return await axios.put(`${process.env.REACT_APP_API}orders/updateStatus/${id}`, order,{ headers: authHeader() })
}
export const findHistoryStatus = async (id)=>{
    return axios.get(`${process.env.REACT_APP_API}orders/findByHistoryStatus/${id}`,{ headers: authHeader() })

}
export const findOrderByAccountId = async (id)=>{
    return axios.get(`${process.env.REACT_APP_API}orders/findByAccount/${id}`,{ headers: authHeader() })
}

export const getPromotions = async () => {
    return await axios.get(`${process.env.REACT_APP_API}promotions`,{ headers: authHeader() })
}
export const createPromotion = async (promotion) => {
    return await axios.post(`${process.env.REACT_APP_API}promotions`,promotion,{ headers: authHeader() })
}
export const getPromotionById = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}promotions/${id}`,{ headers: authHeader() })
}
export const getAllPromotionIncludeCate = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}categories/findAllByPromotionInclude/${id}`,{ headers: authHeader() })
}
export const getPromotionIncludeCate = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}categories/findByPromotionInclude/${id}`,{ headers: authHeader() })
}
export const addCategoryToPromotion = async (promotionId,categoryId) => {
    return await axios.put(`${process.env.REACT_APP_API}promotions/addCategoryToPromotion/${promotionId}/${categoryId}`,"",{ headers: authHeader() })
}
export const deleteCategoryFromPromotion = async (promotionId,categoryId) => {
    return await axios.delete(`${process.env.REACT_APP_API}promotions/deleteCategoryFromPromotion/${promotionId}/${categoryId}`,{ headers: authHeader() })
}
export const addBookToBlackList = async (promotionId,bookId) => {
    return await axios.put(`${process.env.REACT_APP_API}promotions/addBookToBlackList/${promotionId}/${bookId}`,"",{ headers: authHeader() })
}
export const findByPromotion = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}books/findByPromotion/${id}`,{ headers: authHeader() })
}
export const findByBlackList = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}books/findByBlackList/${id}`,{ headers: authHeader() })
}
export const deleteBookFromBlackList = async (promotionId,bookId) => {
    return await axios.delete(`${process.env.REACT_APP_API}promotions/deleteBookFromBlackList/${promotionId}/${bookId}`,{ headers: authHeader() })
}
export const createPayment = async (payment) =>{
    return await axios.post(`${process.env.REACT_APP_API}payments/create-payment`, payment,{ headers: authHeader() })
}
export const getPaymentInfo = async (amount,bankCode,vnp_BankTranNo,vnp_CardType,vnp_OrderInfo,vnp_PayDate,vnp_ResponseCode,vnp_TmnCode
    ,vnp_TransactionNo,vnp_TransactionStatus,vnp_TxnRef,vnp_SecureHash,accountId) =>{
    return await axios.get(`${process.env.REACT_APP_API}payments/payment-info?vnp_Amount=${amount}&vnp_BankCode=${bankCode}&vnp_BankTranNo=${vnp_BankTranNo}&vnp_CardType=${vnp_CardType}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_PayDate=${vnp_PayDate}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TmnCode=${vnp_TmnCode}&vnp_TransactionNo=${vnp_TransactionNo}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHash=${vnp_SecureHash}&accountId=${accountId}`,{ headers: authHeader() })
}
export const getProvince = async () => {
    return await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,{headers: ghnHeader()})
}
export const getDistrict = async (province_id) => {
    return await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`,{headers: ghnHeader()})
}
export const getWard = async (district_id) => {
    return await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,{headers: ghnHeader()})
}
export const calculateShippingCost = async (district_id) => {
    return await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?shop_id=115246&from_district_id=2004&service_id=53321&to_district_id=${district_id}&Height=50&Weight=200`,{headers: ghnHeader()})
}
export const getAllTransaction = async ()=>{
    return axios.get(`${process.env.REACT_APP_API}transactionHistory`,{ headers: authHeader() })
}
export const findFavoriteByAccountAndBook = async (accountId,bookId)=>{
    return axios.get(`${process.env.REACT_APP_API}favorites/findByAccountAndBook/${accountId}/${bookId}`,{ headers: authHeader() })
}
export const saveFavorite = async (favorite)=>{
    return axios.post(`${process.env.REACT_APP_API}favorites`,favorite,{ headers: authHeader() })
}
export const updateFavorite = async (favorite)=>{
    return axios.put(`${process.env.REACT_APP_API}favorites`,favorite,{ headers: authHeader() })
}
export const findFavoriteByAccount = async (accountId)=>{
    return axios.get(`${process.env.REACT_APP_API}favorites/findByAccount/${accountId}`,{ headers: authHeader() })
}
export const findAllCommentByBook = async (bookId)=>{
    return axios.get(`${process.env.REACT_APP_API}comments/${bookId}`,{ headers: authHeader() })
}
export const submitComment = async (comment)=>{
    return axios.post(`${process.env.REACT_APP_API}comments`,comment,{ headers: authHeader() })
}
export const updateFinished = async (order) =>{
    return await axios.put(`${process.env.REACT_APP_API}orders/updateFinished`, order,{ headers: authHeader() })
}
