import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Số bài viết hiển thị trên mỗi trang

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/blog");
        setPosts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  // Tính toán chỉ số của bài viết hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Tính toán số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Hàm để thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Blog</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog_area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="blog_left_sidebar">
                {currentPosts.map((post, index) => (
                  <article className="blog_item" key={index}>
                    <div className="blog_item_img">
                      <img
                        className="card-img rounded-0"
                        src={post.img || "default-image.png"}
                        alt={post.title || ""}
                        style={{
                          width: "800px",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />

                      <Link to="#!" className="blog_item_date">
                        <h3>{new Date(post.created_at).getDate()}</h3>
                        <p>
                          {new Date(post.created_at).toLocaleString("default", { month: "short" })}
                        </p>
                      </Link>
                    </div>
                    <div className="blog_details">
                      <Link to={`/blog/detail/${post.id}`}>
                        <h2 className="blog-head" style={{ color: "#2d2d2d" }}>
                          {post.title}
                        </h2>
                      </Link>
                      <ul className="blog-info-link">
                        <li>
                          <Link to="#!">
                            <i className="fa fa-user"></i> {post.category_id}
                          </Link>
                        </li>
                        <li>
                          <Link to="#!">
                            <i className="fa fa-comments"></i> 0 Comments
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </article>
                ))}
                
                <nav className="blog-pagination justify-content-center d-flex">
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <Link to="#!" className="page-link" onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                {/* Các phần khác (Tìm kiếm, Danh mục, Bài viết gần đây, Thẻ) */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
