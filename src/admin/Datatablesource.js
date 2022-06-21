import {Switch} from "@mui/material";
import CurrencyFormat from 'react-currency-format'

export const bookColumns2 = [
    {field: "id", headerName: "ID", width: 70},
    {
        field: "name",
        headerName: "Name",
        width: 300,
    },
    {
        field: "image",
        headerName: "Image",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.frontCoverImage} alt="avatar"/>
                </div>
            );
        },
    },
    {
        field: "price",
        headerName: "Price",
        width: 150,
        renderCell: (params) => {
            return (
                <CurrencyFormat value={(params.row.price)} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },
    {
        field: "numberPage",
        headerName: "Number Page",
        width: 150,
    },
    {
        field: "quantity",
        headerName: "In stock",
        width: 150,
    },


    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];
export const bookColumns = [
    {field: "id", headerName: "ID", width: 70},
    {
        field: "name",
        headerName: "Name",
        width: 300,
    },
    {
        field: "image",
        headerName: "Image",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.front_cover_image} alt="avatar"/>
                </div>
            );
        },
    },
    {
        field: "price",
        headerName: "Price",
        width: 100,
        renderCell: (params) => {
            return (
                <CurrencyFormat value={(params.row.price)} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },
    {
        field: "number_page",
        headerName: "Number Page",
        width: 110,
    },
    {
        field: "categoryName",
        headerName: "Category",
        width: 150,
    },
    {
        field: "quantity",
        headerName: "In stock",
        width: 100,
    },


    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];


export const accountColumn = [
    {field: "id", headerName: "ID", width: 70},
    {
        field: "fullName",
        headerName: "Name",
        width: 200,
    },
    {
        field: "image",
        headerName: "Image",
        width: 150,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg"
                         src={params.row.image === null ? "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                             : params.row.image} alt="avatar"/>
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 150,
    },
    {
        field: "roles",
        headerName: "Role",
        width: 400,
        renderCell: (params) => {
            return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {
                        params.row.roles.map((role, key) => (
                            <span key={key} className="role">{role.name}</span>
                        ))
                    }
                </div>
            );
        },
    }
]
export const cateColumns = [
    {field: "id", headerName: "ID", width: 170},
    {
        field: "name",
        headerName: "Name",
        width: 350,
    },
    {
        field: "note",
        headerName: "Note",
        width: 350,
    },
]
export const orderWaitingColumns = [
    {field: "orderId", headerName: "ID", width: 70},
    {
        field: "fullName",
        headerName: "Full Name",
        width: 150,
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 120,
    },
    {
        field: "createDate",
        headerName: "Create date",
        width: 170,
    },
    {
        field: "address",
        headerName: "Address",
        width: 350,
    },
    {
        field: "total",
        headerName: "Total",
        width: 150,
        renderCell: (params) => {
            return (
                <CurrencyFormat value={params.row.total} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },

]
export const orderDetailsColumn = [
    {
        field: "id",
        headerName: "ID",
        width: 70,
        renderCell: (params) => {
            return (
                <p>{params.row.book.id}</p>
            );
        },
    },
    {
        field: "Book",
        headerName: "Name",
        width: 350,
        renderCell: (params) => {
            return (
                <p>{params.row.book.name}</p>
            );
        },
    },
    {
        field: "image",
        headerName: "Image",
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <img style={{
                    paddingLeft: '10px',
                    height: '72px',
                }} src={params.row.book.frontCoverImage}/>
            );
        },
    },
    {
        field: "quantity",
        headerName: "Quantity",
        width: 100,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: "price",
        headerName: "Price",
        width: 150,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <CurrencyFormat value={params.row.price} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },
    {
        field: "sale",
        headerName: "Sale (%)",
        width: 100,
        renderCell: (params) => {
            return (
                <div>
                    {
                        params.row.sale === null ? "0" : params.row.sale + " %"
                    }
                </div>
            );
        },
    },
    {
        field: "total",
        headerName: "Total",
        width: 170,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <CurrencyFormat value={(params.row.price) * (params.row.quantity)} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },
]
export const orderAccountColumn = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <p>Order:#{params.row.id}</p>
            );
        },
    },
    {
        field: "status",
        headerName: "Current Status",
        width: 250,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div>
                    {
                        params.row.orderStatusHistories.map((his, key) => (
                            <div key={key}>
                                {
                                    his.done ? (
                                        <p>{his.statusOrder.typeOrder}</p>
                                    ) : <></>
                                }
                            </div>
                        ))
                    }
                </div>
            );
        },
    },
    {
        field: "date",
        headerName: "Current date",
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div>
                    {
                        params.row.orderStatusHistories.map((his, key) => (
                            <div key={key}>
                                {
                                    his.done ? (
                                        <p>{his.create_date}</p>
                                    ) : <></>
                                }
                            </div>
                        ))
                    }
                </div>
            );
        },
    },
    {
        field: "total",
        headerName: "Total",
        width: 250,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <CurrencyFormat value={params.row.total} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },
]
export const promotionCollum = [
    {field: "id", headerName: "ID", width: 170},
    {
        field: "name",
        headerName: "Name",
        width: 250,
    },
    {
        field: "sale",
        headerName: "Sale",
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div>{params.row.sale}%</div>
            );
        },
    },
    {
        field: "activated",
        headerName: "Status",
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div>
                    {params.row.activated ? (
                        "On active"
                    ) : ("Stop")
                    }
                </div>
            );
        },
    },
    {
        field: "createDate",
        headerName: "Created Date",
        width: 170,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "endDate",
        headerName: "End Date",
        width: 170,
        headerAlign: 'center',
        align: 'center',
    },
]
export const transactionCollum = [
    {field: "id", headerName: "ID", width: 50},
    {
        field: "bankCode",
        headerName: "Bank code",
        width: 150,
    },
    {
        field: "bankTranNo",
        headerName: "Bank tranNo",
        width: 150,
    },
    {
        field: "cardType",
        headerName: "Card type",
        width: 150,
    },
    {
        field: "orderInfo",
        headerName: "Desc",
        width: 170,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 150,
        renderCell: (params) => {
            return (
                <CurrencyFormat value={params.row.amount} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },
    {
        field: "createDate",
        headerName: "Date",
        width: 250,
    },
    {
        field: "accountName",
        headerName: "Full name",
        width: 150,
    },
]
export const favColumns = [
    {
        field: "id",
        headerName: "ID",
        width: 70},
    {
        field: "image",
        headerName: "Image",
        width: 250,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.frontCoverImage} alt="avatar"/>
                </div>
            );
        },
    },
    {
        field: "bookName",
        headerName: "Name",
        width: 330,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "price",
        headerName: "Price",
        width: 300,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <CurrencyFormat value={(params.row.price)} displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}/>
            );
        },
    },

]
