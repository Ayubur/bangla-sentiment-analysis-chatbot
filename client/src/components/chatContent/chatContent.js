import React, { createRef, useEffect, useState } from 'react';
import ChatItem from "./chatItem";
import "./chatContent.css";
import {API_URL} from "../../config";

const ChatContent = ()=>{
    const messagesEndRef = createRef(null);
    const chatItms = [
      {
        key: 1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      }
    ];

    const [state, setState] = useState(chatItms);
    const [message, setMessage]=useState('');

    useEffect(() => {
        scrollToBottom();
    });

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const submit = (e) =>{
        if(e.key === 'Enter'){
            let data={
                key: Math.random(),
                type: "",
                msg: message,
                image:"https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            };
            setState((preState)=>([...preState,data]));
            setMessage('');

            fetch(`${API_URL}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text:message
            }),
            })
            .then(response => response.json())
            .then(data => {
                let new_data={
                    key: Math.random(),
                    type: "other",
                    msg: data.prediction,
                    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                };
                setState((preState)=>([...preState,new_data]));
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            scrollToBottom();
        }
    }

    return(
        <div className="main__chatcontent">
          <div className="content__body">
            <div className="chat__items">
              {state.map((itm, index) => {
                return (
                  <ChatItem
                    animationDelay={1}
                    key={itm.key}
                    user={itm.type ? itm.type : "me"}
                    msg={itm.msg}
                    image={itm.image}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="content__footer">
            <div className="sendNewMessage">
              {/* <button className="addFiles">
                <i className="fa fa-plus"></i>
              </button> */}
              <input
                type="text"
                placeholder="Type a message here"
                onChange={(e)=> setMessage(e.target.value)}
                onKeyPress={submit}
                value={message}
              />
              {/* <button className="btnSendMsg" id="sendMsgBtn">
                <i className="fa fa-paper-plane"></i>
              </button> */}
            </div>
          </div>
        </div>
    );
};

export default ChatContent;