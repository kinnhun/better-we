import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the route params
  const [blog, setBlog] = useState(null); // State for storing blog data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Hero Section */}
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>{blog.title}</h2> {/* Dynamic blog title */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="blog_area single-post-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <div className="single-post">
                <div className="feature-img">
                  <img
                    className="img-fluid"
                    src={blog.img || "default-image.png"} // Show blog image or default image
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="blog_details">
                  <h2 style={{ color: "#2d2d2d" }}>{blog.title}</h2>
                  <ul className="blog-info-link mt-3 mb-4">
                    <li>
                      <a href="#">
                        <i className="fa fa-user"></i> {blog.category}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-comments"></i> {blog.comments || 0} Comments
                      </a>
                    </li>
                  </ul>
                  <p className="excert">{blog.excerpt}</p>
                  <p>{blog.content}</p>
                  <div className="quote-wrapper">
                    <div className="quotes">
                      {blog.quote || "No quote available for this blog."}
                    </div>
                  </div>
                  <p>{blog.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Area */}
      <section className="services-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-40">
                <div className="features-icon">
                  <img src="assets/img/icon/icon1.svg" alt="" />
                </div>
                <div className="features-caption">
                  <h3>Location</h3>
                  <p>{blog.location || "No location provided."}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-40">
                <div className="features-icon">
                  <img src="assets/img/icon/icon2.svg" alt="" />
                </div>
                <div className="features-caption">
                  <h3>Phone</h3>
                  <p>(90) 277 278 2566</p>
                  <p>(78) 267 256 2578</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-40">
                <div className="features-icon">
                  <img src="assets/img/icon/icon3.svg" alt="" />
                </div>
                <div className="features-caption">
                  <h3>Email</h3>
                  <p>jacson767@gmail.com</p>
                  <p>contact56@zacsion.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
