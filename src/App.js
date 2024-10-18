// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BmiCalculator from "./compoment/general/BmiCalculator.jsx";
import Footer from "./compoment/general/Footer.jsx";
import Header from "./compoment/general/Header.jsx";
import About from "./page/aboutme/About";
import Blog from "./page/blog/Blog";
import BlogDetail from "./page/blog/BlogDetail";
import Contact from "./page/contact/Contact";
import Home from "./page/home/Home";
import Pricing from "./page/pricing/Pricing";

import ScrollToTop from "./compoment/ScrollToTop/ScrollToTop.js";
import Courses from "./page/courses/Courses.jsx";
import ExCategory from "./page/ExerciseCategory/ExCategory.jsx";
import VideoDetail from "./page/video/Video.jsx";
import "./translations/i18n/i18n.js";

import { useState } from "react";
import Chatbot from "./page/chatbotAI/Chatbot.jsx";

function App() {
  const [location, setLocation] = useState("");

  const getLocation = (pathname) => {
    setLocation(pathname);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Hiển thị luôn Header */}
      <Header />

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog">
          <Route index element={<Blog />} />
          <Route path="detail/:id" element={<BlogDetail />} /> 
        </Route>
        <Route path="/bmi-calculator" element={<BmiCalculator />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/chatbot" element={<Chatbot />}></Route>

        {/* Thêm route cho video */}
        <Route path="/exercises" element={<ExCategory getLocation={getLocation} />}></Route>
        <Route path="/video" element={<VideoDetail getLocation={getLocation} />}></Route>
      </Routes>

      {/* Hiển thị luôn Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
