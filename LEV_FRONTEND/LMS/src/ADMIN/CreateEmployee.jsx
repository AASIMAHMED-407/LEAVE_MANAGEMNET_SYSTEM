import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
function CreateEmployee() {
    let [deptData,setDeptData]=useState([])
    let [roleData,setRoleData]=useState([])
    let [createEmp,setCreateEmp]=useState({
        name:"",
        dept:"",
        role:"",
        email:"",
        password:""
    })
    let navigate = useNavigate()
    let alertbox = useRef()
    let alertText = useRef()

    useEffect(()=>{
        let getAllDept = async()=>{
            let data = await axios.get("http://127.0.0.1:5000/department")
            // console.log(data.data);
            setDeptData(data.data)
        }
        getAllDept()
        let getAllEmpRole = async()=>{
            let data = await axios.get("http://127.0.0.1:5000/role")
            // console.log(data.data);
            setRoleData(data.data)
        }
        getAllEmpRole()
    },[])

    let handleCreateEmpBTN = async ()=>{
        // console.log(createEmp);
        let data = await axios.post("http://127.0.0.1:5000/admin/create/amployee",createEmp)
        // console.log(data.data[0]);
        if(data.data[2]>0){
            alertbox.current.style.display = "block"
            alertText.current.textContent = "cerate Successful"
            setTimeout(()=>{
              alertbox.current.style.display = "none"
              navigate("/admin/home")
            },2000)
        }else{
            alertbox.current.style.display = "block"
            alertText.current.textContent = "ceration  failed"
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
        <div class="container"> 
        <div class="row"> 
            <div class="col-md-6">
                <div class="card"> 
                    <div class="box"> 
                        <h1>Create Employee</h1> 
                            <p style={{color:"white"}}> </p> 
                            <input type="text" name="" placeholder="name" onChange={(e)=>{
                                setCreateEmp((prev)=>{
                                    prev.name = e.target.value
                                    return prev
                                })
                            }}/> 
                            {/* <input type="text" name="" placeholder="department"/>  */}
                            <select class="form-select" aria-label="Default select example" onChange={(e)=>{
                                setCreateEmp((prev)=>{
                                    prev.dept = e.target.value
                                    return prev
                                })
                            }}>
                                <option defaultChecked>select dept</option>
                                {/* <option value="1">One</option> */}
                                {
                                    deptData.map((item,i)=>(
                                        <option key={i} value={item[1]}>{item[1]}</option>
                                    ))
                                }
                            </select>

                            <select class="form-select" aria-label="Default select example" onChange={(e)=>{
                                setCreateEmp((prev)=>{
                                    prev.role = e.target.value
                                    return prev
                                })
                            }}>
                                <option defaultChecked>select emp</option>
                                {/* <option value="1">One</option> */}
                                {
                                    roleData.map((item,i)=>(
                                        <option key={i} value={item[1]}>{item[1]}</option>
                                    ))
                                }
                            </select>
                            
                            <input type="text" name="" placeholder="Username" onChange={(e)=>{
                                setCreateEmp((prev)=>{
                                    prev.email = e.target.value
                                    return prev
                                })
                            }}/> 
                            <input type="text" name="" placeholder="Password" onChange={(e)=>{
                                setCreateEmp((prev)=>{
                                    prev.password = e.target.value
                                    return prev
                                })
                            }}/> 
                            {/* <a class="forgot text-muted" href="#">Forgot password?</a>   */}
                            <button onClick={handleCreateEmpBTN} className='btn btn-info' >Create</button>
                            {/* <Link to={"/admin/home"} className='btn btn-info' >Create</Link> */}
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

export default CreateEmployee
