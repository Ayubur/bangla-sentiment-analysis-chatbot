import React, { createRef, useEffect, useState } from 'react';
import ChatItem from "./chatItem";
import "./chatContent.css";

const ChatContent = ()=>{
    const messagesEndRef = createRef(null);
    const chatItms = [
      {
        key: 1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 2,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 3,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 4,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 5,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 6,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 7,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "হ্যালো ! ",
      },
      {
        key: 8,
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
                onKeyPress={(e)=>{
                    if(e.key === 'Enter'){
                        let data={
                            key: state.length + 1,
                            type: "",
                            msg: message,
                            image:"https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
                        };
                        setState((preState)=>([...preState,data]));
                        setMessage('');
                        scrollToBottom();
                    }
                }}
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