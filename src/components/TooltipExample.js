import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {findHistoryStatus, loadOrderOnConfirm} from "../admin/api/Api";
import {useEffect, useState} from "react";
const TooltipExample = ({orderId}) =>{
    const id = {orderId}
    const [data, setData] = useState([]);
    const loadHistory = async () => await findHistoryStatus(parseInt(id.orderId)).then(p => {
        setData(p.data)
    })
    useEffect(() =>{
        loadHistory().then(r => {})
    },[])

return(
    <div
        className="tooltipBoundary"
    >
    <Popup
        className='dcmm2'
        trigger={open => (
            <button className="button">History status</button>
        )}
        position="right center"
        on={['hover', 'focus']}
        arrow={'right center'}
        nested
    >
        {
            data.map((history,key) =>(
                <div key={key}>
                    {
                        history.done ? (
                            <p style={{color:"red"}}><span>{key+1}.</span> Status: {history.statusOrder.typeOrder}. Date: {history.create_date}</p>
                        ) :(
                            <p><span>{key+1}.</span> Status: {history.statusOrder.typeOrder}. Date: {history.create_date}</p>
                        )
                    }
                </div>
            ))
        }
    </Popup>
    </div>
)
}
export default TooltipExample
