import React, { Component } from "react";
import UserAPI from "../api/UserAPI.js";
import "./PhoneNumberAuthentication.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class PhoneNumberAuthentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhoneNumber: "",
      authenticationNumber: "",
      realAuthenticationNumber: "****",
      buttonText: "인증문자 받기",
      isPhoneNumber: false,
      authenticationStart: false,
      processID: -1,
      timeRemaining: "05:00",
      resendCount: 3,
      errorMessage: "",
    };
  }
  componentWillUnmount() {
    clearInterval(this.state.processID);
  }

  render() {
    const {
      userPhoneNumber,
      authenticationNumber,
      realAuthenticationNumber,
      buttonText,
      isPhoneNumber,
      authenticationStart,
      processID,
      timeRemaining,
      resendCount,
      errorMessage,
    } = this.state;
    const { isAuthenticated } = this.props;
    const { userKey } = this.props.userData;

    // 랜덤 인증코드 생성기
    const generateRandomCode = () => {
      let str = "";
      for (let i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10);
      }
      return str;
    };

    // 휴대폰 번호 state 및 버튼 활성화 감지
    const onChangePhoneNumber = (e) => {
      const userPhoneNumber = e.target.value;

      // 핸드폰 번호 체크 정규식
      var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

      this.setState({
        userPhoneNumber: userPhoneNumber,
        isPhoneNumber: regExp.test(userPhoneNumber),
      });
    };

    // 문자 인증 번호 state
    const onChangeauthenticationNumber = (e) => {
      this.setState({ authenticationNumber: e.target.value });
    };

    // 문자인증 받기
    const getTextVerification = () => {
      this.setState({
        authenticationStart: true,
        buttonText: "인증문자 확인",
      });
      startAuthentication();
    };

    // 문자인증 확인
    const confirmTextVerification = () => {
      if (
        authenticationNumber !== realAuthenticationNumber ||
        timeRemaining === "00:00"
      ) {
        this.setState({
          errorMessage: "인증번호를 다시 확인해주세요.",
          authenticationNumber: "",
        });
      } else {
        isAuthenticated(true, userPhoneNumber);
      }
    };

    // 인증번호 재발송 버튼
    const onClicResendkBtn = () => {
      if (resendCount > 0) {
        startAuthentication();
        let msg = "일일 인증번호 전송횟수가 " + resendCount + "회 남았습니다.";
        let count = resendCount - 1;
        this.setState({
          errorMessage: msg,
          resendCount: count,
        });
      } else {
        clearInterval(processID);
        this.setState({
          errorMessage: "일일 인증번호 전송횟수를 모두 사용하였습니다.",
          timeRemaining: "00:00",
        });
      }
    };

    // 인증 시작
    const startAuthentication = () => {
      if (processID !== -1) clearInterval(processID);

      let time = 300;
      let tmpId = setInterval(
        function () {
          if (time < 0) {
            clearInterval(processID);
            clearInterval(tmpId);
            this.setState({
              errorMessage: "인증시간이 초과되었습니다.",
            });
            return;
          }
          let mm = String(Math.floor(time / 60)).padStart(2, "0");
          let ss = String(time % 60).padStart(2, "0");
          let timeRemaining = mm + ":" + ss;
          this.setState({
            timeRemaining: timeRemaining,
          });
          time--;
        }.bind(this),
        50
      );
      const randomCode = generateRandomCode();
      this.setState({
        processID: tmpId,
        authenticationNumber: randomCode,
        realAuthenticationNumber: randomCode,
      });
      console.log("인증번호 : " + randomCode);
    };

    return (
      <div>
        {/* 휴대폰번호 입력 */}
        <div
          className="phone-number-authentication-input-box"
          style={{ marginBottom: "5px" }}
        >
          <input
            type="text"
            placeholder="휴대폰 번호 (- 없이 숫자만 입력)"
            maxLength="11"
            value={userPhoneNumber}
            onChange={onChangePhoneNumber}
          />
        </div>
        {/* 인증번호 입력 */}
        {authenticationStart && (
          <div>
            <div
              className="phone-number-authentication-input-box"
              style={{ marginTop: "25px" }}
            >
              <input
                type="text"
                placeholder="인증번호 입력"
                value={authenticationNumber}
                onChange={onChangeauthenticationNumber}
              />
              <div className="phone-number-authentication-time">
                {timeRemaining}
              </div>
              <button
                className="phone-number-authentication-resend-btn"
                onClick={onClicResendkBtn}
              >
                인증번호 재발송
              </button>
            </div>

            {/* 에러 메세지 */}
            <div className="phone-number-authentication-error-msg">
              {errorMessage}
            </div>
          </div>
        )}

        {/* 인증문자 받기 및 확인 버튼 */}
        <button
          className="phone-number-authentication-btn-box"
          style={{ backgroundColor: isPhoneNumber ? "#4F0D92" : "#C7C8CE" }}
          disabled={isPhoneNumber ? "" : "disabled"}
          onClick={
            authenticationStart ? confirmTextVerification : getTextVerification
          }
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // 리덕스의 state
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberAuthentication);
