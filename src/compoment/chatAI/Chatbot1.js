import React, { useState } from 'react';

const Chatbot1 = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const handleButtonClick = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <button 
        onClick={handleButtonClick}
        style={{
          padding: '10px 15px',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
      >
        {isChatbotVisible ? 'Ẩn Chatbot' : 'Hiện Chatbot'}
      </button>
      {isChatbotVisible && (
        <iframe
          width="350"
          height="430"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/7700dc2e-4ad7-4e13-adcb-e2ae50e683a0"
          title="Chatbot"
          style={{
            position: 'absolute',
            bottom: '60px', // Đặt vị trí iframe dưới nút
            right: '0',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        ></iframe>
      )}
    </div>
  );
};

export default Chatbot1;
