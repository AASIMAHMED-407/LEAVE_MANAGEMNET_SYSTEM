import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function RequsetLeave() {
    let [leaves,setLeaves]=useState([])
    let navigate = useNavigate()
    let alertbox = useRef()
    let alertText = useRef()
    let nodata = useRef()
    useEffect(()=>{
        let getAllEmployeeLeavesRequest = async ()=>{
            let data = await axios.get("http://127.0.0.1:5000/employees/leaves/request")
            // console.log(data);
            setLeaves(data.data)
            if(data.data.length<=0){
                nodata.current.style.display="block"
            }else{
                nodata.current.style.display="none"
            }
        }
        getAllEmployeeLeavesRequest()
    },[])
    let handleAccept = async(lid)=>{
        let data = await axios.get("http://127.0.0.1:5000/employees/leaves/request/accept/"+lid)
        console.log(data);
        if(data.data=="ACCEPTED"){
            alertbox.current.style.display = "block"
            alertText.current.textContent = "ACCEPTED Successful"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
            //   navigate("/admin/home")
            window.location.reload()
            },2000)
        }else{
            alertbox.current.style.display = "block"
            alertText.current.textContent = "ACCEPTED  failed"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
            },2000)
        }
    }
    let handleReject = async (lid)=>{
        // console.log(lid);
        let data = await axios.get("http://127.0.0.1:5000/employees/leaves/request/reject/"+lid)
        console.log(data);
        if(data.data=="REJECTED"){
            alertbox.current.style.display = "block"
            alertText.current.textContent = "REJECTED Successful"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
            //   navigate("/admin/home")
            window.location.reload()
            },2000)
        }else{
            alertbox.current.style.display = "block"
            alertText.current.textContent = "REJECTED  failed"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
            },2000)
        }
    }
  return (
    <>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <p class="navbar-brand">Navbar</p>
            </div>
        </nav>
        <div class="alert alert-warning alert-dismissible fade show" ref={alertbox} style={{display:"none"}} role="alert">
          <strong>HEY!</strong> <span ref={alertText}></span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <p style={{display:"none"}} ref={nodata}>YOU DONT HANE ANY REQUEST YET</p>
        <div className='container mt-5 d-flex flex-wrap'>
        
        {
            leaves.map((item,i)=>(
                <div class="card" key={i} style={{maxWidth:"20rem",margin:"20px",minWidth:"15rem"}}>
                  <div class="card-body">
                      <h5 class="card-title">REASON</h5>
                      <p className='card-text'>{item[1]}</p>
                      <p class="card-text">From: {item[2].substring(0,17)}</p>
                      <p class="card-text">Till: {item[3].substring(0,17)}</p>
                      <input type='hidden' value={item[0]}></input>
                      <p class="btn btn-success" style={{marginRight:"20px"}} onClick={()=>handleAccept(item[0])}>Accept</p>
                      <p class="btn btn-danger" onClick={()=>handleReject(item[0])}>Reject</p>
                      {/* <input type='hidden' value={item[0]}></input> */}
                  </div>
              </div> 
            ))
          } 
        </div>
    </>
  )
}

export default RequsetLeave
