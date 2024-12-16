// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    const fetchBlog = async () => {
        const res = await fetch("http://localhost:8005/api/blogs/"+params.id)
        const result = await res.json();
        setBlog(result.data);
    }

    useEffect(() => {
        fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className='container'>
        <div className="d-flex justify-content-between pt-5 mb-4">
            <h2>{blog.title}</h2>
            <div>
                <a href='/' className='btn btn-dark'>Back to Blogs</a>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-12'>
                <p>by <strong>{blog.author}</strong> on {blog.date}</p>


                {
                    (blog.image) && (
                        <div className='d-flex justify-content-center'>
                           
                            <img className='w-25' src={`http://localhost:8005/uploads/blogs/${blog.image}`} alt={blog.title} />
                        </div>
                    )
                }

                <div className='mt-5' dangerouslySetInnerHTML={{ __html: blog.description }}>
                </div>
            </div>
        </div>
    </div>
    )
}

export default BlogDetail
