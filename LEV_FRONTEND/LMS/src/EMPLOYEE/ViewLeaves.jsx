import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ViewLeaves() {
    let idx = useParams()
    let id = idx.id
    let ename = useRef()
    let enamer = useRef()
    let navigate = useNavigate()
    let [leaves,setLeaves]=useState([])
    useEffect(()=>{
      let getEmployeeName = async ()=>{
          let data = await axios.get("http://127.0.0.1:5000/employees/"+id)
          // console.log(data.data[0][1]);
          ename.current.textContent = data.data[0][1]
      }
      getEmployeeName()
      let getAllEmployeeLeaves = async ()=>{
        let data = await axios.get("http://127.0.0.1:5000/employees/leaves/"+id)
        // console.log(data);
        setLeaves(data.data)
    }
    getAllEmployeeLeaves()
  },[])
  return (
   <>
     <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <p className="navbar-brand" ref={ename}></p>
            </div>
        </nav>
        
        <div className='container mt-5 d-flex flex-wrap'>
        
          {
            leaves.map((item,i)=>(
                <div class="card" key={i} style={{maxWidth:"20rem",margin:"20px",minWidth:"15rem"}}>
                  <div class="card-body">
                      <h5 class="card-title">REASON</h5>
                      <p className='card-text'>{item[1]}</p>
                      <p class="card-text">From: {item[2].substring(0,17)}</p>
                      <p class="card-text">Till: {item[3].substring(0,17)}</p>
                      <p class="btn btn-info">{item[5]}</p>
                      <input type='hidden' value={item[0]}></input>
                  </div>
              </div> 
            ))
          }
            
        </div>
   </>
  )
}

export default ViewLeaves
