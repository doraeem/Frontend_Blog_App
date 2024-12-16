// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:8005/api/blogs');
      const result = await res.json();
      setBlogs(result.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const searchBlogs = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8005/api/blogs?keyword=${keyword}`);
      const result = await res.json();
      setBlogs(result.data);
    } catch (error) {
      console.error("Error searching blogs:", error);
    }
  };

  const resetSearch = () => {
    setKeyword('');
    fetchBlogs();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const deleteBlog = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this blog?");
    if (confirmation) {
      try {
        const res = await fetch(`http://localhost:8005/api/blogs/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.status) {
          setBlogs(blogs.filter((blog) => blog.id !== id));
          toast.success("Blog deleted successfully.");
        } else {
          toast.error("Failed to delete blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("An error occurred while deleting the blog.");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-5">
        <h4>Blogs</h4>
        <div>
          <a href="/create" className="btn btn-dark ms-2">Create</a>
          <button onClick={logout} className="btn btn-dark ms-2">Logout</button>
        </div>
      </div>
      <div className="d-flex justify-content-center pt-5">
        <form onSubmit={searchBlogs}>
          <div className="d-flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search Blogs"
            />
            <button className="btn btn-dark ms-2">Search</button>
            <button type="button" onClick={resetSearch} className="btn btn-success ms-2">Reset</button>
          </div>
        </form>
      </div>
      <div className="row pt-5">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} deleteBlog={deleteBlog} />
          ))
        ) : (
          <p className="text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
