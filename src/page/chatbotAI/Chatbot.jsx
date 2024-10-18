import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import predefinedQA from "./predefinedQA"; // Nhập predefinedQA từ file mới

const Chatbot = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const genAI = new GoogleGenerativeAI("AIzaSyCeJ6lEC3H0v19gMZ4vPbxnuqc653AikSM");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const getPredefinedResponse = (userPrompt) => {
        const foundQA = predefinedQA.find((qa) => qa.prompt.toLowerCase() === userPrompt.toLowerCase());
        return foundQA ? foundQA.response : null;
    };

    const getResponse = async (prompt) => {
        try {
            setIsLoading(true);
            const predefinedResponse = getPredefinedResponse(prompt);
            if (predefinedResponse) {
                setChatHistory((prevHistory) =>
                    prevHistory.map((chat, index) =>
                        index === prevHistory.length - 1 ? { ...chat, bot: predefinedResponse } : chat
                    )
                );
            } else {
                const result = await model.generateContent(prompt);
                const responseText = result.response.text();

                setChatHistory((prevHistory) =>
                    prevHistory.map((chat, index) =>
                        index === prevHistory.length - 1 ? { ...chat, bot: responseText } : chat
                    )
                );
            }
        } catch (error) {
            setChatHistory((prevHistory) =>
                prevHistory.map((chat, index) =>
                    index === prevHistory.length - 1
                        ? { ...chat, bot: "Error: Unable to generate response." }
                        : chat
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { user: input, bot: "Generating..." },
            ]);
            getResponse(input);
            setInput("");
        }
    };

    const handleQuestionClick = (prompt) => {
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { user: prompt, bot: "Generating..." },
        ]);
        getResponse(prompt);
    };

    const chatBoxRef = useRef(null); // Tạo một ref cho khung chat

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Cuộn xuống khi có tin nhắn mới
        }
    }, [chatHistory]);

    return (
        <div className="black-bg">
            {/* Hero Section */}
            <div className="slider-area2">
                <div className="slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap hero-cap2 pt-70">
                                    <h2>Chat with AI</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chatbot Section */}
            <section className="team-area fix section-padding30">
                <div className="container">
                    <h2 className="text-center mb-4">Chatbot</h2>

                    {/* Options for predefined questions */}
                    <div className="questionOptions mb-4 text-center">
                        <h3>Chọn câu hỏi:</h3>
                        <div className="d-flex flex-wrap justify-content-center">
                            {predefinedQA.map((qa, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionClick(qa.prompt)}
                                    className="btn btn-primary m-2"
                                    disabled={isLoading}
                                >
                                    {qa.prompt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="chatBox mb-4">
                        <div className="output" ref={chatBoxRef}> {/* Thêm ref cho khung chat */}
                            {chatHistory.map((chat, index) => (
                                <div key={index} className="mb-2">
                                    <p className="message userMessage">
                                        <strong>Bạn:</strong> {chat.user}
                                    </p>
                                    <p className="message botMessage">
                                        <strong>Bot:</strong>
                                        <br />
                                        {chat.bot.split("\n").map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="form mt-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="form-control"
                                    placeholder="Hãy hỏi điều gì đó..."
                                />
                                <button type="submit" className="btn btn-success" disabled={isLoading}>
                                    Gửi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Chatbot;
