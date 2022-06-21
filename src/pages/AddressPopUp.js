import {useEffect, useState} from "react";

import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import Popup from "reactjs-popup";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {calculateShippingCost, getDistrict, getProvince, getWard} from "../admin/api/Api";
import CurrencyFormat from 'react-currency-format'

const AddressPopUp =(props)=>{
    const {promotionId} = props

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setOpen(false)
        props.passChildData2(false)
        props.address(address)
        props.shippingCost(shippingCost)
    };


    const {totalPriceCart} = props


    const [province,setProvince] = useState([])
    const [provinceId,setProvinceId] = useState(201)
    const [provinceName,setProvinceName] = useState("")


    const [district,setDistrict] = useState([])
    const [districtId,setDistrictId] = useState(1486)
    const [districtName,setDistrictName] = useState("")


    const [ward,setWard] = useState([])
    const [wardId,setWardId] = useState("1A0421")
    const [wardName,setWardName] = useState("")

    const [isChose,setIsChose] = useState(false);

    const [detailAddress,setDetailAddress] = useState("")

    const [shippingCost,setShippingCost] = useState(0);

    const address = detailAddress + wardName +  districtName  + provinceName
    const getProvinceName =(provinceId)=>{
        for (let i =0;i <province.length;i++){
            if (province[i].ProvinceID === provinceId){
                setProvinceName(province[i].ProvinceName)
            }
        }
    }
    const getDistrictName =(districtId)=>{
        for (let i =0;i <district.length;i++){
            if (district[i].DistrictID === districtId){
                setDistrictName(district[i].DistrictName +", ")
            }
        }
    }
    const getWardName =(wardId)=>{
        for (let i =0;i <ward.length;i++){
            if (ward[i].WardCode === wardId){
                setWardName(ward[i].WardName +", ")
            }
        }
    }
    const calculate = () =>{
        calculateShippingCost(districtId).then(cost =>{
            setShippingCost(cost.data.data.total)
        })
    }
    useEffect(() =>{
        getProvince().then(p =>{
            setProvince(p.data.data)
        })
    },[])

    useEffect(() =>{
        getDistrict(provinceId).then(d =>{
            setDistrict(d.data.data)
        })
    },[provinceId])

    useEffect(() =>{
        getWard(districtId).then(d =>{
            setWard(d.data.data)
        })
    },[districtId])

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
    useEffect(()=>{

    },[])


    return (
        <div>
            <div className="cellAction">
                <Button variant="outlined" startIcon={<HomeIcon />}  onClick={() => setOpen(o => !o)}>
                    Add a address
                </Button>
            </div>
            <Popup className="dcmm" open={open} closeOnDocumentClick onClose={closeModal}  modal
                   nested>
                <div className="modal">
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                   <div style={{padding:'50px',width:'70%'}}>
                       <FormControl fullWidth style={{marginBottom:'30px'}}>
                       <TextField id="outlined-basic" disabled={true} label="Dia chi" value={address} variant="outlined" />
                       </FormControl>
                       <FormControl fullWidth style={{marginBottom:'30px'}}>
                           <TextField id="outlined-basic" label="Dia chi cu the" onChange={(e) => setDetailAddress(e.target.value +", ")} variant="outlined" />
                       </FormControl>
                       <FormControl fullWidth style={{marginBottom:'30px'}}>
                           <InputLabel id="demo-simple-select-label">Province</InputLabel>
                           <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={provinceId}
                               label="Province"
                               onChange={(e) => {
                                   setProvinceId(e.target.value)
                                   setIsChose(true)
                                   setWardName("")
                                   setDistrictName("")
                                   getProvinceName(e.target.value)
                               }}
                           >
                               {
                                  province.map((p,key) =>(
                                       <MenuItem key={key} value={p.ProvinceID}>{p.ProvinceName}</MenuItem>
                                   ))
                               }
                           </Select>
                       </FormControl>
                       <FormControl fullWidth style={{marginBottom:'30px'}}>
                           <InputLabel id="demo-simple-select-label">District</InputLabel>
                           <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={districtId}
                               label="District"
                               onChange={(e) => {
                                   setDistrictId(e.target.value)
                                   setIsChose(false)
                                   getDistrictName(e.target.value)
                                   setWardName("")
                               }}
                           >
                               {
                                   district.map((d,key) =>(
                                       <MenuItem key={key} value={d.DistrictID}>{d.DistrictName}</MenuItem>
                                   ))
                               }
                           </Select>
                       </FormControl>
                       <FormControl disabled={isChose} fullWidth style={{marginBottom:'30px'}}>
                           <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                           <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={wardId}
                               label="Ward"
                               onChange={(e) => {
                                   setWardId(e.target.value)
                                   getWardName(e.target.value)
                               }}

                           >
                               {
                                   ward.map((d,key) =>(
                                       <MenuItem key={key} value={d.WardCode}>{d.WardName}</MenuItem>
                                   ))
                               }
                           </Select>
                       </FormControl>
                       <div>
                           <Button onClick={() => calculate()} variant="contained">Calculate</Button>
                            <div><p style={{fontSize:'20px'}}>{shippingCost === 0 ? "" : (
                                <CurrencyFormat value={shippingCost} displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={"Total: "}
                                                suffix={' đ'}/>
                            )}</p></div>
                       </div>
                   </div>
                </div>
            </Popup>
        </div>
    );
}
export default AddressPopUp
