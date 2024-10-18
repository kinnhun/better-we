import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import Youtube from "react-youtube";
import Menu from "../../compoment/general/Menu";

const VideoDetail = ({ getLocation }) => {
  // const [category, setCategory] = useState();
  const [videos, setVideos] = useState([]);

  const { t } = useTranslation();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const videoId = searchParams.get("id") || videos[0]?.video_url;

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/exercise?category=${category}${
            videoId ? `&exId=${videoId}` : ""
          }`
        );

        // Kiểm tra nếu có dữ liệu trả về mới thực hiện set state
        if (res.data && res.data.length > 0) {
          setVideos(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategory();
  }, []); // Thêm 'category' và 'videoId' vào dependency array để trigger lại khi chúng thay đổi

  const opts = {
    height: "100vh",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      loop: 0,
    },
  };

  const handleVideoEnd = (event) => {
    event.target.seekTo(0);
    event.target.stopVideo();
  };

  useEffect(() => {
    getLocation(location.pathname);

    return () => {
      getLocation("");
    };
  }, []);

  return (
    <section className="video-section row">
      <div className="video-section col-10">
        {videoId && (
          <Youtube
            videoId={videoId}
            opts={opts}
            className="youtube-container"
            onEnd={handleVideoEnd}
          />
        )}
      </div>
      <div className="sidebar col-2">
        <Menu videoCategory={videos} videoId={videoId} />
      </div>
    </section>
  );
};

export default VideoDetail;
