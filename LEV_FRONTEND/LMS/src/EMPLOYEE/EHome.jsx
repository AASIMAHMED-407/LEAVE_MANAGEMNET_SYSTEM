import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
function EHome() {
    let idx = useParams()
    let id = idx.id
    let ename = useRef()
    useEffect(()=>{
        let getEmployeeName = async ()=>{
            let data = await axios.get("http://127.0.0.1:5000/employees/"+id)
            // console.log(data.data[0][1]);
            ename.current.textContent = data.data[0][1]
        }
        getEmployeeName()
    },[])
  return (
    <>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <p class="navbar-brand" ref={ename}></p>
            </div>
        </nav>

        <div className='container d-flex flex-column mt-5'>
            {/* <div class="card">
            <div class="card-body">
                <Link to={"/admin/create/employee"}  class="btn btn-danger w-100" style={{height:"80px"}}>CRATE EMP</Link>
            </div>
            </div> */}

            <div class="card">
            <div class="card-body">
                <Link to={"/employee/views/leave/"+id}  class="btn btn-warning  w-100" style={{height:"80px"}}>view leave</Link>
            </div>
            </div>
            <div class="card">
            <div class="card-body">
                <Link to={"/employee/make/leave/"+id}  class="btn btn-dark  w-100" style={{height:"80px"}}>req leve</Link>
            </div>
            </div>
        </div>
    </>
  )
}

export default EHome
