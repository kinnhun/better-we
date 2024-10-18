import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái để kiểm tra chatbot có mở hay không

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev); // Đảo ngược trạng thái khi nhấn nút
  };

  const styles = {
    button: {
      position: 'fixed', // Đặt nút ở vị trí cố định
      bottom: '20px', // Khoảng cách từ đáy trang
      right: '20px', // Khoảng cách từ bên phải
      backgroundColor: '#007bff', // Màu nền
      color: '#fff', // Màu chữ
      border: 'none', // Không có viền
      borderRadius: '20px', // Bo góc cho nút chat
      padding: '10px 15px', // Khoảng cách bên trong nút
      cursor: 'pointer', // Con trỏ chuột
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Đổ bóng
      zIndex: 1000, // Đảm bảo nút ở trên cùng
      transition: 'background-color 0.3s', // Hiệu ứng chuyển màu
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Màu nền khi hover
    },
    container: {
      position: 'fixed', // Đặt iframe ở vị trí cố định
      bottom: '80px', // Khoảng cách từ đáy trang
      right: '20px', // Khoảng cách từ bên phải
      zIndex: 1000, // Đảm bảo iframe ở trên cùng
      width: isOpen ? '350px' : '50px', // Chiều rộng tùy theo trạng thái
      height: isOpen ? '430px' : '50px', // Chiều cao tùy theo trạng thái
      transition: 'width 0.3s ease, height 0.3s ease', // Hiệu ứng chuyển động
      overflow: 'hidden', // Ẩn phần vượt quá
    },
    iframe: {
      width: '100%', // Chiều rộng iframe
      height: '100%', // Chiều cao iframe
      border: 'none', // Không có viền
      borderRadius: '8px', // Bo góc
    },
  };

  return (
    <div>
      {/* Nút chat */}
      <button 
        style={styles.button} 
        onClick={toggleChatbot}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      >
        {isOpen ? '❌' : '💬'} {/* Biểu tượng chat hoặc đóng */}
      </button>
      {/* Container cho iframe */}
      <div style={styles.container}>
        {isOpen && (
          <iframe
            title="BetterWE"
            src="https://d42kc5ii20lhsomxz6rgv.ai.copilot.live"
            style={styles.iframe} // Sử dụng styles từ biến
            loading="lazy"
            allow="microphone;camera;speaker;clipboard-read;clipboard-write;geolocation;"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
