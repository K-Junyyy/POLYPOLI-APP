import React, { Component } from "react";
import "./FindAccount.css";

import UserAPI from "../api/UserAPI.js";

import PhoneNumberAuthentication from "./PhoneNumberAuthentication";
import PasswordReset from "./PasswordReset";

class FindAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 1,
      type: "id",
      title: "계정 찾기",
      userId: "",
      userPhoneNumber: "",
      showFindIdMsg: false,
      errorMsg: "존재하지 않는 아이디입니다.",
      isExistId: false,
    };
  }
  render() {
    const {
      progress,
      type,
      title,
      userId,
      userPhoneNumber,
      showFindIdMsg,
      errorMsg,
      isExistId,
    } = this.state;
    const { history } = this.props;

    // 찾기 탭 변경
    const onChangeFindTap = (to) => {
      if (to === "id" && type !== "id") {
        this.setState({ progress: 1, type: "id", userId: "" });
      } else if (to === "password" && type !== "password") {
        this.setState({ progress: 1, type: "password", userId: "" });
      } else {
        console.log("잘못된 타입입니다.");
      }
    };

    // 휴대폰 번호 인증 확인
    const isAuthenticated = (check, userPhoneNumber) => {
      if (check) {
        // 아이디 찾기탭에서
        if (type === "id") {
          UserAPI.getUserByPhoneNumber(userPhoneNumber).then((response) => {
            if (response.data === "") {
              this.setState({ progress: 2, userId: "" });
            } else {
              this.setState({ progress: 2, userId: response.data.userId });
            }
          });
          // 비밀번호 찾기탭에서
        } else if (type === "password") {
          UserAPI.getUserByPhoneNumber(userPhoneNumber).then((response) => {
            if (response.data.userId === userId && isExistId) {
              alert("인증이 완료되었습니다.");
              this.setState({
                title: "비밀번호 재설정",
                progress: 2,
                userPhoneNumber: userPhoneNumber,
              });
            } else {
              alert("계정 정보가 일치하지 않습니다.");
            }
          });
        }
      }
    };

    // 비밀번호 재설정 클릭
    const onClickResetPassword = () => {
      this.setState({ progress: 1, type: "password" });
    };

    // 아이디 state
    const onChangeId = (e) => {
      const tagerId = e.target.value;
      this.setState({
        userId: tagerId,
        showFindIdMsg: false,
        isExistId: false,
      });
    };

    // 아이디 확인
    const checkId = () => {
      UserAPI.getUserByUserId(userId).then((response) => {
        if (response.data === "") {
          this.setState({
            showFindIdMsg: true,
            isExistId: false,
            errorMsg: "존재하지 않는 아이디입니다.",
          });
          this.setState({ userPhoneNumber: userPhoneNumber });
        } else {
          this.setState({
            showFindIdMsg: true,
            isExistId: true,
            errorMsg: "아이디가 확인되었습니다.",
          });
        }
      });
    };

    // 비밀번호 재설정 완료
    const changePasswordComplete = () => {
      history.push("./Login");
    };

    return (
      <div>
        {/* 헤드부분 */}
        <div className="find-account-head">
          <div>
            <i
              className="bi bi-arrow-left"
              style={{ visibility: "hidden" }}
              onClick={() => history.push("./Login")}
            ></i>
          </div>
          <div>{title}</div>
          <div>{/* blank div */}</div>
        </div>

        {/* 아이디 찾기 & 비밀번호 찾기 탭 */}
        <div
          className="find-account-nav"
          style={{
            display: type === "password" && progress === 2 ? "none" : "",
          }}
        >
          <div
            className="find-account-nav-id"
            style={{
              color: type === "id" ? "#36373C" : "#888E95",
              backgroundColor: type === "id" ? "#FFFFFF" : "#F1F2F4",
            }}
            onClick={() => {
              onChangeFindTap("id");
            }}
          >
            아이디 찾기
          </div>
          <div
            className="find-account-nav-password"
            style={{
              color: type === "password" ? "#36373C" : "#888E95",
              backgroundColor: type === "password" ? "#FFFFFF" : "#F1F2F4",
            }}
            onClick={() => {
              onChangeFindTap("password");
            }}
          >
            비밀번호 찾기
          </div>
        </div>

        {/* 아이디 찾기 & 비밀번호 찾기 */}
        <div className="find-account-contents">
          <div
            className="find-account-text"
            style={{ display: progress === 1 ? "" : "none" }}
          >
            <div>휴대폰 인증을 통해 아이디 확인 및</div>
            <div>비밀번호를 변경하실 수 있습니다.</div>
          </div>

          {/* 아이디찾기 - 인증 */}
          {type === "id" && progress === 1 && (
            <PhoneNumberAuthentication
              isAuthenticated={isAuthenticated}
            ></PhoneNumberAuthentication>
          )}

          {/* 아이디찾기 - 결과(계정 존재) */}
          {type === "id" && progress === 2 && userId !== "" && (
            <div>
              <div className="find-account-id-result">
                <div>아이디 확인</div>
                <div>{userId}</div>
              </div>
              <button
                className="find-account-btn"
                onClick={() => history.push("./Login")}
              >
                로그인하기
              </button>
              <div className="find-account-footer">
                <div
                  className="find-account-footer-title"
                  onClick={onClickResetPassword}
                >
                  비밀번호 재설정하기
                </div>
                <div className="find-account-footer-text">
                  <div>
                    SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.
                  </div>
                  <div>
                    로그인 화면에서 ‘SNS계정으로 로그인’ 하신 후 이용해주세요.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 아이디찾기 - 결과(계정 없음) */}
          {type === "id" && progress === 2 && userId === "" && (
            <div>
              <div className="find-account-id-result">
                <div>가입이 확인된 계정이 없습니다.</div>
              </div>
              <button
                className="find-account-btn"
                onClick={() => history.push("./SignUp")}
              >
                회원가입하기
              </button>
            </div>
          )}

          {/* 비밀번호찾기 - 인증 */}
          {type === "password" && progress === 1 && (
            <div>
              <div className="find-account-password-input">
                <input
                  type="text"
                  name="userId"
                  value={userId}
                  placeholder="아이디 입력"
                  onChange={onChangeId}
                />
                <button onClick={checkId}>아이디 확인</button>
              </div>
              <div className="find-account-password-error-msg">
                {showFindIdMsg && (
                  <div style={{ color: isExistId ? "#1F9B00" : "#FF2828" }}>
                    {errorMsg}
                  </div>
                )}
              </div>
              <PhoneNumberAuthentication
                isAuthenticated={isAuthenticated}
              ></PhoneNumberAuthentication>
            </div>
          )}

          {/* 비밀번호찾기 - 비밀번호 재설정 */}
          {type === "password" && progress === 2 && (
            <PasswordReset
              userId={userId}
              changePasswordComplete={changePasswordComplete}
            ></PasswordReset>
          )}
        </div>
      </div>
    );
  }
}

export default FindAccount;
