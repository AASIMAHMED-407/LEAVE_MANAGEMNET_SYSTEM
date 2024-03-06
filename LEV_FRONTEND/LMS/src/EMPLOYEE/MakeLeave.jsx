import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MakeLeave() {
    let idx = useParams()
    let id = idx.id
    let ename = useRef()
    let enamer = useRef()
    let navigate = useNavigate()
    let alertbox = useRef()
    let alertText = useRef()
    let [request,setRequest] = useState({
        eid:id,
        reason:"",
        sdate:"",
        edate:"",
        status:"request",
        ename:""
    })
    useEffect(()=>{
        let getEmployeeName = async ()=>{
            let data = await axios.get("http://127.0.0.1:5000/employees/"+id)
            // console.log(data.data[0][1]);
            ename.current.textContent = data.data[0][1]
            enamer.current.value = data.data[0][1]
            setRequest((prev)=>{
                prev.ename = data.data[0][1]
                return prev
            })
        }
        getEmployeeName()
    },[])
    let handleleaveReqBTN = async ()=>{
        console.log(request);
        let data = await axios.post("http://127.0.0.1:5000/employee/make/request/leave",request)
        // console.log(data);
        if(data.data[2]>0){
            alertbox.current.style.display = "block"
            alertText.current.textContent = "made Successfully"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
              navigate("/employee/home/"+id)
            },2000)
        }else{
            alertbox.current.style.display = "block"
            alertText.current.textContent = "request  failed"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
            },2000)
        }
    }
  return (
    <>
         <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <p className="navbar-brand" ref={ename}></p>
            </div>
        </nav>
        <div class="alert alert-warning alert-dismissible fade show" ref={alertbox} style={{display:"none"}} role="alert">
          <strong>HEY!</strong> <span ref={alertText}></span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div className="container"> 
        <div className="row"> 
            <div className="col-md-6">
                <div className="card"> 
                    <div className="box"> 
                        <h1>Make Leave</h1> 
                            <p style={{color:"white"}}> </p> 
                            <input type="text" name="" placeholder="name" ref={enamer} readOnly /> 
                            <div className='d-flex flex-column'>
                            <p className='d-inline' style={{color:"white"}} >START</p>
                            <input type="date" onChange={(e)=>{
                                setRequest((prev)=>{
                                    prev.sdate = e.target.value
                                    return prev
                                })
                            }} /> 
                            </div>
                            <div className='d-flex flex-column'>
                            <p className='d-inline' style={{color:"white"}}>END</p>
                            <input type="date" onChange={(e)=>{
                                setRequest((prev)=>{
                                    prev.edate = e.target.value
                                    return prev
                                })
                            }} /> 
                            </div>
                            <input type="text" name="" placeholder="reason" onChange={(e)=>{
                                setRequest((prev)=>{
                                    prev.reason = e.target.value
                                    return prev
                                })
                            }} />
                            {/* <a className="forgot text-muted" href="#">Forgot password?</a>   */}
                            <button  className='btn btn-info' onClick={handleleaveReqBTN} >Request</button>
                            {/* <Link to={"/admin/home"} classNameName='btn btn-info' >Create</Link> */}
                            <div className="col-md-12"> 
                             </div>
                        </div>
                        </div> 
                    </div> 
                </div>
            </div>
    </>
  )
}

export default MakeLeave
