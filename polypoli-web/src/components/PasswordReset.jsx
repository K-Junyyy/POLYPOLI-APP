import React, { Component } from "react";
import UserAPI from "../api/UserAPI.js";
import "./PasswordReset.css";

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 1,
      userId: this.props.userId,
      currentPassword: "",
      newPassword1: "",
      newPassword2: "",
      showOrHide: false,
      checkPassword: false,
      showErrorMsg: false,
      errorMsg: "비밀번호를 다시 확인해주세요.",
      activeBtn: false,
    };
  }

  render() {
    const {
      progress, // 1: 현재비번 확인 / 2: 새로운비번 세팅
      userId, // 유저 아이디
      currentPassword, // 현재 비밀번호
      newPassword1, // 새 비밀번호
      newPassword2, // 새 비밀번호 확인
      showOrHide, // 비밀번호 보이기 or 숨기기
      checkPassword, // 길이 확인
      showErrorMsg, // 경고 메시지 표시여부
      errorMsg, // input박스 경고 아래 메시지
      activeBtn, // 버튼 활성화
    } = this.state;

    const { changePasswordComplete } = this.props;

    // 현재 비밀번호 state
    const onChangeCurrentPassword = (e) => {
      const currentPassword = e.target.value;
      this.setState({
        currentPassword: currentPassword,
        showErrorMsg: false,
        activeBtn: currentPassword !== "",
      });
    };

    // 현재 비밀번호와 입력값이 일치하는지 확인
    const checkUserPassword = () => {
      UserAPI.getUserByUserId(userId).then((response) => {
        if (response.data.userPassword === currentPassword) {
          this.setState({
            progress: 2,
            newPassword1: "",
            showOrHide: false,
            activeBtn: false,
            errorMsg: "비밀번호를 다시 입력해주세요.",
            showErrorMsg: false,
          });
        } else {
          this.setState({ showErrorMsg: true });
        }
      });
    };

    // 새 비밀번호 state
    const onChangeNewPassword1 = (e) => {
      const newPassword1 = e.target.value;
      // 12~20자 영문, 숫자조합 비밀번호 체크 정규식
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{12,20}$/;

      this.setState({
        newPassword1: newPassword1,
        checkPassword: regExp.test(newPassword1),
        activeBtn: newPassword1.length === newPassword2.length,
      });
    };

    // 새 비밀번호 확인 state
    const onChangeNewPassword2 = (e) => {
      const newPassword2 = e.target.value;
      this.setState({
        newPassword2: newPassword2,
        activeBtn: newPassword1.length === newPassword2.length,
        showErrorMsg: false,
      });
    };

    // 비밀번호 표시/숨기기
    const onToggleShowOrHidePassword = () => {
      this.setState({ showOrHide: !showOrHide });
    };

    // 새 비밀번호로 변경하기
    const changePassword = () => {
      if (newPassword1 === newPassword2 && checkPassword) {
        UserAPI.updateUserPassword(userId, newPassword1);
        alert("비밀번호 설정이 완료되었습니다.");
        changePasswordComplete();
      } else {
        this.setState({
          showErrorMsg: true,
        });
      }
    };

    return (
      <div className="password-reset-wrapper">
        {/* 현재 비밀번호 입력 */}
        {progress === 1 && (
          <div>
            <div className="password-reset-text">
              <div>현재 사용중인 비밀번호를</div>
              <div>입력해주세요.</div>
            </div>
            <div className="password-reset-wrapper">
              {/* 비밀번호 입력 */}
              <div className="password-reset-input-box">
                <input
                  className="password-reset-input"
                  type={showOrHide ? "text" : "password"}
                  placeholder="비밀번호 입력"
                  maxLength="20"
                  value={currentPassword}
                  onChange={onChangeCurrentPassword}
                />
                <i
                  className="bi bi-eye-fill"
                  style={{
                    color: showOrHide ? "black" : "#C7C8CE",
                  }}
                  onClick={onToggleShowOrHidePassword}
                ></i>
              </div>

              {/* 경고 메시지 */}
              <div
                className="password-reset-error-msg"
                style={{
                  visibility: showErrorMsg ? "visible" : "hidden",
                  color: "#FF2828",
                }}
              >
                {errorMsg}
              </div>

              {/* 확인 버튼 */}
              <button
                className="password-reset-btn"
                style={{
                  background: activeBtn ? "#4F0D92" : "#C7C8CE",
                }}
                disabled={!activeBtn}
                onClick={checkUserPassword}
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* 새 비밀번호 설정 */}
        {progress === 2 && (
          <div>
            <div className="password-reset-text">
              <div>Polypoli 계정 로그인에 사용할</div>
              <div>새 비밀번호를 만들어 주세요.</div>
            </div>
            <div className="password-reset-wrapper">
              {/* 새 비밀번호 입력 */}
              <div className="password-reset-input-box">
                <input
                  type={showOrHide ? "text" : "password"}
                  placeholder="새 비밀번호 입력"
                  maxLength="20"
                  value={newPassword1}
                  onChange={onChangeNewPassword1}
                />
                <i
                  className="bi bi-eye-fill"
                  style={{
                    color: showOrHide ? "black" : "#C7C8CE",
                  }}
                  onClick={onToggleShowOrHidePassword}
                ></i>
              </div>

              {/* 경고 메시지 */}
              <div
                className="password-reset-error-msg"
                style={{
                  color: checkPassword ? "#4F0D92" : "#888E95",
                }}
              >
                12-20자 이내 영문+숫자
                <i className="bi bi-check-lg"></i>
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="password-reset-input-box">
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  maxLength="20"
                  value={newPassword2}
                  onChange={onChangeNewPassword2}
                />
              </div>

              {/* 경고 메시지 */}
              <div
                className="password-reset-error-msg"
                style={{
                  visibility: showErrorMsg ? "visible" : "hidden",
                }}
              >
                {errorMsg}
              </div>

              {/* 완료하기 버튼 */}
              <button
                className="password-reset-btn"
                style={{
                  background: activeBtn ? "#4F0D92" : "#C7C8CE",
                }}
                disabled={!activeBtn}
                onClick={changePassword}
              >
                완료하기
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
