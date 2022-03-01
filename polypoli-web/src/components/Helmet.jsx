import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Helmet.css";

// 로그인, 회원가입, 계정찾기, 프로필 설정 등등
// 페이지 상단에 뒤로가기 버튼, 제목, 진행바 부분에 대해
// 재사용성이 커서 참고하기 위해 만든 예시 컴포넌트

export class Helmet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.progress,
      title: this.props.title,
      location: this.props.location,
    };
  }

  render() {
    const { progress, title, location } = this.state;
    return (
      <div className="helmet-head">
        <div className="helmet-top">
          <Link
            to={location + "/" + (progress - 1)}
            style={{
              cursor: "pointer",
              color: "#36373C",
              textDecoration: "none",
            }}
          >
            <i
              className="bi bi-arrow-left"
              style={{
                fontSize: "25px",
              }}
            ></i>
          </Link>

          <div>{title}</div>
          <div>{/*blank div*/}</div>
        </div>
        <div className="helmet-progress-bar">
          <div
            className="helmet-progress"
            style={{ width: progress * 40 }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Helmet;
