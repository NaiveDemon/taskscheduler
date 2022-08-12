import React, {useEffect, useState} from 'react'
import './Dialog.css'



type DialogProps = {
    onCancel : ()=>void
}


function Dialog({onCancel} : DialogProps) {
  const initialScheduleState = {
    taskName: "",
    duration: 0
  }
    const [formData, setFormData] = useState({taskName: "", duration: 0})
    useEffect(()=>{
        localStorage.setItem("formData", JSON.stringify(formData))
    }, [formData])

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setFormData({...formData, [e.target.name]: e.target.value})
 }
 const handleSubmit = (event: React.FormEvent):void => {
    event.preventDefault();
    console.log(formData);
    
  };
    
  return (
    <div className = "dialogContainer">
      <form className="register" onSubmit={handleSubmit}>
        <fieldset>
            <label htmlFor="taskName">Task Name:</label>
            <input type="text" id = "taskName" name="taskName" value={formData.taskName} onChange={handleChange}/>            
            <br/>
            <label htmlFor="duration">Duration/Interval:</label>
            <input type="number" id = "duration" name="duration" value={formData.duration} onChange={handleChange}/>
            <br/>
            <button type="submit" >Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>

        </fieldset>
      </form>
    </div>

  )
}

export default Dialog
