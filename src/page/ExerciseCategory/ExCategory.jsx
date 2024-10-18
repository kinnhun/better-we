import "./ExCategory.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  { name: "Chest", path: "/video?category=chest", img: "assets/img/exercise/chest.webp" },
  { name: "Back", path: "/video?category=back", img: "assets/img/exercise/back.jpg" },
  { name: "Arms", path: "/video?category=arm", img: "assets/img/exercise/arm.webp" },
  { name: "Shoulders", path: "/video?category=shoulder", img: "assets/img/exercise/shoulder.webp" },
  { name: "Quads", path: "/video?category=quad", img: "assets/img/exercise/quad.jpg" },
  {
    name: "Hamstrings",
    path: "/video?category=hamstring",
    img: "assets/img/exercise/hamstring.webp",
  },
  { name: "Calf", path: "/video?category=calf", img: "assets/img/exercise/calf.jfif" },
  { name: "Glutes", path: "/video?category=glute", img: "assets/img/exercise/glute.jpg" },
];

const ExCategory = ({ getLocation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/exercise/category");
        setCategories(res.data);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    };

    getCategory();
  }, []);

  const location = useLocation();

  useEffect(() => {
    getLocation(location.pathname);

    return () => {
      getLocation("");
    };
  }, [location.pathname]);

  return (
    <div className="category-selection">
      <h2>Select Exercise Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.name} className="category-item">
            <Link to={`/video?category=${category.name}`}>
              <img
                src={`assets/img/exercise/${category.name.toLowerCase()}.jpg`}
                alt={category.name}
                className="category-img"
              />
              <p className="category-name">{category.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExCategory;
