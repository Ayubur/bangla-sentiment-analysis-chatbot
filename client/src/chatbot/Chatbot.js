import React, { Component } from "react";
import Message from "./Message";
import PredictServices from '../services/PredictionServices'

class Chatbot extends Component {
  messagesEnd;
  textInput;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showBot: true
    };
  }
  async df_text_query(text) {
    let says = {
      speak: "me",
      msg: {
        text: {
          text: text
        }
      }
    };

    this.setState({ messages: [...this.state.messages, says] });
    try{
      const res = await PredictServices.predict({
        text: text
      });

      says={
        speak:"bot",
        msg:{
          text:{
            text:res.data.prediction
          }
        }
      }
      this.setState({messages:[...this.state.messages, says]})

    }catch(e){
      says={
        speak:"bot",
        msg:{
          text:{
            text:"OOPs...Something went wrong, please try again"
          }
        }
      }
      this.setState({messages:[...this.state.messages, says]})
      console.log(e)

    }
    
  }

  componentDidMount() {
        let says = {
      speak: "bot",
      msg: {
        text: {
          text: "Hello Welcome, Please type your bangla text"
        }
      }
    };

    this.setState({ messages: [...this.state.messages, says] });
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        if (message.msg && message.msg.text && message.msg.text.text) {
          return (
            <Message
              key={i}
              speak={message.speak}
              text={message.msg.text.text}
            />
          );
        } else {
          return <Message key={i} speak={"bot"} text={"Oops...Sorry"} />;
        }
      });
    } else {
      return "hello";
    }
  }

  show = () => {
    this.setState({
      showBot: true
    });
  };

  hide = () => {
    this.setState({
      showBot: false
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  };


  render() {
    if (this.state.showBot) {
      return (
        <div
          style={showBot}
        >
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo">Chatbot</div>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  {
                    <a onClick={this.hide}>Close</a>
                  }
                </li>
              </ul>
            </div>
          </nav>
          <div
            id="chatbot"
            style={chatbot}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={el => (this.messagesEnd = el)}
              style={messageEnd}
            />
          </div>
          <div className="col s12">
            <input
              style={textInput}
              ref={input => (this.textInput = input)}
              type="text"
              placeholder="Enter your text"
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
      );
    }
     else {
      return (
        <div
          style={hideBot}
        >
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo">Chatbot</div>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  {
                    //eslint-disable-next-line
                    <a onClick={this.show}>Show</a>
                  }
                </li>
              </ul>
            </div>
          </nav>
          <div
            ref={el => (this.messagesEnd = el)}
            style={messageEnd}
          />
        </div>
      );
    }
  }
}


export default Chatbot;



//-------------------------CSS------------------------------------

const styles = {
  showBot:{
    height: 530,
    width: 450,
    position: "absolute",
    bottom: 0,
    right: 45,
    border: "1px solid lightgrey"
  },
  textInput:{
    margin: 0,
    borderTop: "1px solid lightgrey",
    paddingLeft: "1%",
    paddingRight: "1%",
    width: "98%"
  },
  microphoneStop:{
    fontSize:"28px",
   float: "right",
   marginRight:"10px",
   marginTop: "-35px",
   position: "relative",
   zIndex: "2",
   cursor:"pointer"
 },
  microphoneStart:{
    fontSize:"28px",
   float: "right",
   marginRight:"10px",
   marginTop: "-35px",
   position: "relative",
   zIndex: "2",
   cursor:"pointer",
   color:"red"
  },
  hideBot:{
    height: 40,
    width: 400,
    position: "absolute",
    bottom: 0,
    right: 20,
    border: "1px solid lightgrey"
  },
  chatbot:{
     height: 418,
      width: "100%", 
      overflow: "auto" 
    },
    messageEnd:{ 
      float: "left",
       clear: "both" 
      }
}

const { showBot, textInput, microphoneStart,microphoneStop, hideBot,chatbot,messageEnd } = styles
