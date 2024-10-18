import React, { useEffect } from 'react';

const Chatbot2 = () => {
  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = 
          {"appId":"5e40c48944ccdd7ac5ff91967d7ae073","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); 
      s.type = "text/javascript"; 
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; 
      h.appendChild(s);
      window.kommunicate = m; 
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <div>
      {/* Bạn có thể thêm nội dung khác ở đây nếu cần */}
    </div>
  );
};

export default Chatbot2;
