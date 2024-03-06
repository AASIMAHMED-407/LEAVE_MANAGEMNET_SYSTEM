import axios from 'axios';
import React, { useReducer, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminLogin() {
  let [aData,setAData] = useState({
    email:"",
    password:""
  })
  let navigate = useNavigate()
  let alertbox = useRef()
  let alertText = useRef()
  let handleAdminLogin = async()=>{
    // console.log(aData);
    let data = await axios.post("http://127.0.0.1:5000/admin/login",aData)
    // console.log(data.data.length>0);
    if(data.data.length>0){
      alertbox.current.style.display = "block"
      alertText.current.textContent = "Login Successful"
      setTimeout(()=>{
        alertbox.current.style.display = "none"
        navigate("/admin/home")
      },2000)
    }else{
      // console.log("admin login failed");
      alertbox.current.style.display = "block"
      alertText.current.textContent = "Login failed"
      setTimeout(()=>{
        alertbox.current.style.display = "none"
      },2000)
    }
  }
  return (
    <>
            <div class="alert alert-warning alert-dismissible fade show" ref={alertbox} style={{display:"none"}} role="alert">
          <strong>HEY!</strong> <span ref={alertText}></span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
         <div class="container"> 
        <div class="row"> 
            <div class="col-md-6">
                <div class="card"> 
                    <div class="box"> 
                        <h1>Admin Login</h1> 
                            <p style={{color:"white"}}> </p> 
                            <input type="text" name="" placeholder="Username" onChange={(e)=>{
                              setAData((prev)=>{
                                prev.email = e.target.value
                                return prev
                              })
                            }}/> 
                            <input type="text" name="" placeholder="Password" onChange={(e)=>{
                              setAData((prev)=>{
                                prev.password = e.target.value
                                return prev
                              })
                            }}/> 
                            {/* <a class="forgot text-muted" href="#">Forgot password?</a>   */}
                            <button className='btn btn-info' onClick={handleAdminLogin}>Login</button>
                            {/* <Link to={"/admin/home"} className='btn btn-info' >Login</Link> */}
                            <div class="col-md-12"> 
                             </div>
                             </div>
                             </div> 
                             </div> 
                             </div>
</div>
    </>
  )
}

export default AdminLogin
