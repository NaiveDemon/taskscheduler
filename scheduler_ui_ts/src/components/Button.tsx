import { useState } from "react"
import { JsxAttributeLike } from "typescript"
import Dialog from "./Dialog"
import './Button.css';




export default function Button() {
    const [popup, setPopup] = useState<boolean>(false)
    const onCancel = ()=> {
        setPopup(false)
        console.log("popup toggled")
    }
    const showFormDialog = (popup:boolean):JSX.Element=> {
        if(popup){
            return <Dialog onCancel={onCancel}/>
        }
        return <></>
        }

    
    return (
        <div className="buttons">
        {showFormDialog(popup)}
        <ul>
        
            <li><button onClick={()=>{if(!popup)setPopup(true)}}>Regiser Schedule</button></li>
            <li><button>Show All Schedules</button></li>
            <li><button>Run Schedule</button></li>
        </ul>
        </div>
    )
}