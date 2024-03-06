import React, { useRef, useState } from 'react'
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';
function Login() {
  let [eData,setAData] = useState({
    email:"",
    password:""
  })
  let navigate = useNavigate()
  let alertbox = useRef()
  let alertText = useRef()

  let handleEmployeeLogin = async()=>{
    // console.log(eData);
    let data = await axios.post("http://127.0.0.1:5000/employee/login",eData)
    // console.log(data);
    if(data.data.length>0){
      let id = data.data[0][0]
      // console.log(data.data[0][0]);
      alertbox.current.style.display = "block"
      alertText.current.textContent = "Login Successful"
      setTimeout(()=>{
        alertbox.current.style.display = "none"
        navigate("/employee/home/"+id)
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
                        <h1>Employee Login</h1> 
                            <p style={{color:"white"}}> </p> 
                            <input type="text" name="" placeholder="Username" onChange={(e)=>{
                              setAData((prev)=>{
                                prev.email = e.target.value
                                return prev
                              })
                            }}/> 
                            <input type="password" name="" placeholder="Password" onChange={(e)=>{
                              setAData((prev)=>{
                                prev.password = e.target.value
                                return prev
                              })
                            }}/> 
                            {/* <a class="forgot text-muted" href="#">Forgot password?</a>   */}
                            <button type="button" className='btn btn-success mb-3' onClick={handleEmployeeLogin}>Login</button>
                            {/* <input type="submit" name="" value="Login" href="#"/>  */}
                            <div class="col-md-12"> 
                            {/* <ul class="social-network social-circle"> */}
                             {/* <li><a href="#" class="icoFacebook" title="Facebook"><i class="fab fa-facebook-f"></i></a></li> <li><a href="#" class="icoTwitter" title="Twitter"><i class="fab fa-twitter"></i></a></li> <li><a href="#" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a></li> </ul> 
                             </div> </form>  */}
                             <Link to={"/admin/login"}>Admin Login</Link>
                             </div>
                             </div>
                             </div> 
                             </div> 
                             </div>
</div>
    </>
  )
}

export default Login
