import React from 'react'
import { Link } from 'react-router-dom'
function AHome() {
  return (
    <>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <p class="navbar-brand">Navbar</p>
            </div>
        </nav>

        <div className='container d-flex flex-column mt-5'>
            <div class="card">
            <div class="card-body">
                <Link to={"/admin/create/employee"}  class="btn btn-danger w-100" style={{height:"80px"}}>CRATE EMP</Link>
            </div>
            </div>

            <div class="card">
            <div class="card-body">
                <Link to={"/admin/view/employee"}  class="btn btn-warning  w-100" style={{height:"80px"}}>view EMP</Link>
            </div>
            </div>
            <div class="card">
            <div class="card-body">
                <Link to={"/admin/leave/req"}  class="btn btn-dark  w-100" style={{height:"80px"}}>req EMP</Link>
            </div>
            </div>
        </div>
    </>
  )
}

export default AHome
