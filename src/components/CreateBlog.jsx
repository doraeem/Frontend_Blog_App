// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
   const [html, setHtml] = useState('');
   const [imageId, setImageId] = useState('');

   const navigate = useNavigate();

   // Handle changes in the editor
   function onChange(e) {
    setHtml(e.target.value);
   }

   // Handle file change and upload the image
   const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:8005/api/save-temp-image/", {
        method: 'POST',
        body: formData
    });
    const result = await res.json();
    console.log(result);  // Log the response for debugging
    if (result.status === false) {
        alert(result.errors.image);
        e.target.value = null;
    } else {
        setImageId(result.image.id);
    }
   }

   // React Hook Form setup
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const formSubmit = async (data) => {
    const newData = {...data, description: html, image_id: imageId};

    // Log to check the data before sending
    console.log(newData);

    const res = await fetch("http://localhost:8005/api/blogs", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newData)
    });

    const result = await res.json();
    console.log(result);  // Log the response from backend
    if (result.status) {
        toast("Blog added successfully.");
        navigate('/');
    } else {
        toast.error(result.message || "Something went wrong!");
    }
  }

  return (
    <div className='container mb-5'>
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Create Blog</h4>
        <a href="/" className='btn btn-dark'>Back</a>
      </div>
      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
                <label className='form-label'>Title</label>
                <input {...register('title',{required: true})}
                  type="text" 
                  className={`form-control ${errors.title && 'is-invalid'}`} 
                  placeholder='Title'/>
                {errors.title && <p className='invalid-feedback'>Title field is required</p>}
            </div>

            <div className="mb-3">
                <label className='form-label'>Short Description</label>
                <textarea {...register('shortDesc')}
                cols="30" rows="5" className='form-control'></textarea>
            </div>

            <div className="mb-3">
                <label className='form-label'>Description</label>
                <Editor value={html} containerProps={{ style: { height: '700px' } }}
                onChange={onChange} />
            </div>

            <div className="mb-3">
                <label className='form-label'>Image</label> <br/>
                <input onChange={handleFileChange} type="file" />
            </div>

            <div className="mb-3">
                <label className='form-label'>Author</label>
                <input {...register('author',{required: true})}
                type="text" 
                className={`form-control ${errors.author && 'is-invalid'}`} 
                placeholder='Author'/>
                {errors.author && <p className='invalid-feedback'>Author field is required</p>}
            </div>

            <button className='btn btn-dark'>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog;
