import React from "react";

const Message = props => (
  <div className="col s12 m8 offset-m2 offset-13">
    <div className="card-panel grey lighten-5 z-depth-1">
      <div className="row valign-wrapper">
        <div className="s2">
          {props.speak === "bot" && (
            <a
              href="/#"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              {props.speak}
            </a>
          )}
        </div>

        <div className="s10">
          <div className="black-text text-manual">{props.text}</div>
        </div>
        <div className="s2">
          {props.speak === "me" && (
            <a
              href="/#"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              {props.speak}
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Message;
