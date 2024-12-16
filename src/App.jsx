// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


function App() {
 

  return (
    <>


    <div className='bg-dark text-center py-2 shadow-lg'>
        <h1 className='text-white'>Blog App</h1>
    </div>

    <Routes>
       
       <Route path="/Dashboard" element={<Dashboard />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path='/' element={<Blogs/>}/>
       <Route path='/create' element={<CreateBlog/>}/>
       <Route path='/blog/:id' element={ <BlogDetail />} />
       <Route path='/blog/edit/:id' element={ <EditBlog />} />
     </Routes>
     <ToastContainer />
     
    </>
  )
}

export default App