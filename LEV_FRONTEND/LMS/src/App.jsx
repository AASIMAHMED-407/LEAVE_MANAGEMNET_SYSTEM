import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import AdminLogin from './AdminLogin';
import AHome from './ADMIN/AHome';
import CreateEmployee from './ADMIN/CreateEmployee';
import ViewEmployee from './ADMIN/ViewEmployee';
import RequsetLeave from './ADMIN/RequsetLeave';
import EHome from './EMPLOYEE/EHome';
import MakeLeave from './EMPLOYEE/MakeLeave';
import ViewLeaves from './EMPLOYEE/ViewLeaves';

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}> </Route>
        <Route path="/admin/home" element={<AHome />}> </Route>
        <Route path="/employee/home/:id" element={<EHome />}> </Route>
        <Route path="/admin/create/employee" element={<CreateEmployee />}> </Route>
        <Route path="/admin/view/employee" element={<ViewEmployee />}> </Route>
        <Route path="/admin/leave/req" element={<RequsetLeave />}> </Route>
        <Route path="/employee/make/leave/:id" element={<MakeLeave />}> </Route>
        <Route path="/employee/views/leave/:id" element={<ViewLeaves />}> </Route>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        
         
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
