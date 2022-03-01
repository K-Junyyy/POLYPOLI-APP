import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../api/UserAPI.js";
import kakaoLogo from "../images/kakaoLogo.png";
import naverLogo from "../images/naverLogo.png";
import "./Login.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      userDataCheck: true,
      autoLogin: false,
      showOrHide: false,
    };
  }
  render() {
    const { history } = this.props;

    const onChangeId = (e) => {
      this.setState({ id: e.target.value });
    };
    const onChangePassword = (e) => {
      this.setState({ password: e.target.value });
    };

    const onKeyPressEnter = (e) => {
      if (e.key === "Enter") {
        onClickLoginBtn();
      }
    };

    const onClickLoginBtn = () => {
      const userId = this.state.id;
      const userPassword = this.state.password;
      UserAPI.login(userId, userPassword).then((response) => {
        // 아이디 & 비밀번호 일치시
        if (response.data !== "") {
          this.setState({ userDataCheck: true });
          // store에 유저 정보 저장
          const userData = {
            userKey: response.data.userKey,
            userId: response.data.userId,
            userPhoneNumber: response.data.userPhoneNumber,
            userName: response.data.userName,
            userArea: response.data.userArea,
            userRegion: response.data.userRegion,
            regionCongressmanId: response.data.regionCongressmanId,
            userStamp: response.data.userStamp,
            userGender: response.data.userGender,
            userYearOfBirth: response.data.userYearOfBirth,
            userFollowings: response.data.userFollowings,
            userImg: response.data.userImg,
          };
          this.props.login(userData);

          // 프로필 설정을 마치지 않았을 경우
          if (userData.userArea === null) {
            history.push({
              pathname: "/SignUp",
              state: {
                progress: 6,
              },
            });
          } else {
            history.push("/Feed");
          }
        } else {
          this.setState({ userDataCheck: false });
        }
      });
    };

    const onClickEraseId = () => {
      this.setState({ id: "" });
    };

    const onToggleAutoLogin = () => {
      this.setState({ autoLogin: !this.state.autoLogin });
    };

    const onToggleShowOrHidePassword = () => {
      this.setState({ showOrHide: !this.state.showOrHide });
    };

    return (
      <div>
        <div
          style={{
            display: "grid",
            grid: "subgrid",
            gridTemplateColumns: "30px 1fr 30px",
            gridTemplateRows: "132px 1fr 210px",
          }}
        >
          <div className="login-box">
            <div className="logo">polypoli</div>
            <div className="login-input-box">
              <input
                name="id"
                value={this.state.id}
                placeholder=" 아이디를 입력해주세요"
                onChange={onChangeId}
                onKeyPress={onKeyPressEnter}
              ></input>
              <i
                className="bi bi-x-circle-fill"
                style={{
                  color: "#C7C8CE",
                  cursor: "pointer",
                }}
                onClick={onClickEraseId}
              ></i>
            </div>
            <div className="login-input-box">
              <input
                type={this.state.showOrHide ? "text" : "password"}
                name="password"
                value={this.state.password}
                placeholder=" 비밀번호를 입력해주세요"
                maxLength={20}
                onChange={onChangePassword}
                onKeyPress={onKeyPressEnter}
              ></input>
              <i
                className="bi bi-eye-fill"
                style={{
                  color: this.state.showOrHide ? "black" : "#C7C8CE",
                  cursor: "pointer",
                }}
                onClick={onToggleShowOrHidePassword}
              ></i>
            </div>

            <div
              className="login-error-box"
              style={{
                visibility: this.state.userDataCheck ? "hidden" : "visible",
              }}
            >
              아이디나 비밀번호가 일치하지 않습니다.
            </div>
            <div className="keep-check">
              <div onClick={onToggleAutoLogin}>
                <i
                  className="bi bi-check-circle-fill"
                  style={{
                    color: this.state.autoLogin ? "#4F0D92" : "#C7C8CE",
                  }}
                ></i>
                <span
                  className="auto-login"
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  자동 로그인
                </span>
              </div>
              <Link to="/FindAccount" style={{ textDecoration: "none" }}>
                <div className="find-id-pw"> ID/PW 찾기</div>
              </Link>
            </div>
            <div className="login-btn-box">
              <button className="login-btn" onClick={onClickLoginBtn}>
                로그인
              </button>
            </div>
            <div className="sign-up-box">
              <div className="sign-up-text">아직 회원이 아니신가요?</div>
              <Link
                to={{
                  pathname: "/SignUp",
                  state: {
                    progress: 1,
                    type: "signUp",
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="sign-up-link">가입하기</div>
              </Link>
            </div>
          </div>
          <div
            className="login-sns-box"
            style={{
              visibility: "hidden",
            }}
          >
            <div className="login-sns-logo">
              <a href="https://www.epis.or.kr/api/sns/kakaoAPI">
                <img src={kakaoLogo} alt="Kakao login" />
              </a>
            </div>
            <div className="login-sns-logo">
              <a href="https://nid.naver.com/">
                <img src={naverLogo} alt="Naver login" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = (state) => {
  // 리덕스의 state
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userData) => {
      dispatch(actions.login(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
