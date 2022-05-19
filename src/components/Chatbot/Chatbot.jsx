import React from "react";
import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import config from "./config";
import MessageParser from "./messageParser";
import './Chatbot.css'
export default function ChatBot (){
    return (<>
        <div className="chatContainer">
        <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
        
        ></Chatbot>

        </div>
    
    </>)
}