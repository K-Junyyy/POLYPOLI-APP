import React, { Component } from "react";
import "./Modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      message, // 모달창 메시지
      type, // 취소&확인 or 확인
      point, // 글자색 강조
      onClickConfirm, // 확인 클릭시 함수실행
      onClickCancle, // 취소 클릭시 함수실행
    } = this.props;
    return (
      <div className="modal-background">
        <div className="modal-box">
          <div className="modal-msg">
            {message.split("\n").map((text, idx) => (
              <div key={idx}>{text}</div>
            ))}
          </div>
          <div className="modal-bar"></div>
          <div className="modal-btn-box">
            {type === "cancle and confirm" ? (
              <div
                className="modal-btn-cancle"
                style={{ color: point === "cancle" ? "#5d5fef" : "#c7c8ce" }}
                onClick={onClickCancle}
              >
                취소
              </div>
            ) : (
              ""
            )}
            <div
              className="modal-btn-confirm"
              style={{ color: point === "confirm" ? "#5d5fef" : "#c7c8ce" }}
              onClick={onClickConfirm}
            >
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}
