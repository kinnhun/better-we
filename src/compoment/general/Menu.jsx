import "./Menu.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Menu = ({ videoCategory, videoId }) => {
  const navigate = useNavigate();

  const handleClick = (id, category) => {
    navigate(`/video?category=${category}&id=${id}`);
  };

  return (
    <div className="sidebar">
      {videoCategory.map((item) => (
        <div
          key={item.id}
          className={`menu-item ${videoId === item.video_url ? "active" : ""}`} // Conditionally add the 'active' class
          onClick={() => handleClick(item.video_url, item.category_name)}
        >
          <div className="info">
            <h4>{item.name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
