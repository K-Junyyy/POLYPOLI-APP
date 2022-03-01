import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import PhoneNumberAuthentication from "./PhoneNumberAuthentication";
import PasswordReset from "./PasswordReset";
import UserAPI from "../api/UserAPI.js";
import "./UserSetting.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "설정",
      logoutModal: false,
      deleteUserModal: false,
      settingType: "setting",
    };
  }
  render() {
    const { title, logoutModal, deleteUserModal, settingType } = this.state;
    const { history, userData } = this.props;

    // 뒤로가기
    const goBack = () => {
      if (settingType === "setting") {
        history.push("/MyPage");
      } else if (settingType === "phoneNumberAuthentication") {
        this.setState({
          title: "계정/정보 관리",
          settingType: "accountInfoManagement",
        });
      } else {
        this.setState({ title: "설정", settingType: "setting" });
      }
    };

    // 타이틀, 설정num 변경
    const changeSettingTypeAndTitle = (type, title) => {
      this.setState({ settingType: type, title: title });
    };

    // 휴대폰 번호 인증 확인
    const isAuthenticated = (check, userPhoneNumber) => {
      if (check) {
        UserAPI.getUserByPhoneNumber(userPhoneNumber).then((response) => {
          // 해당 번호를 가진 계정이 없다면
          if (response.data === "") {
            UserAPI.updateUserPhoneNumber(
              userData.userKey,
              userPhoneNumber
            ).then(() => {
              this.props.updateUserPhoneNumber(userPhoneNumber);
              alert("휴대폰 번호가 변경되었습니다.");
              this.setState({
                title: "계정/정보 관리",
                settingType: "accountInfoManagement",
              });
            });
          } else {
            alert("현재 휴대폰 번호와 동일하거나 사용할 수 없는 번호입니다.");
          }
        });
      }
    };

    // 비밀번호 재설정 완료
    const changePasswordComplete = () => {
      this.setState({ title: "설정", settingType: "setting" });
    };

    // 로그아웃
    const onClickLogout = (click) => {
      if (click === "confirm") {
        this.props.logout();
        alert("로그아웃 되었습니다.");
        history.push("/Login");
      }
      this.setState({ logoutModal: !logoutModal });
    };

    // 탈퇴하기
    const deleteUser = (click) => {
      if (click === "confirm") {
        UserAPI.deleteUser(userData.userKey).then(() => {
          this.props.logout();
          alert("계정이 삭제되었습니다.");
          history.push("/Login");
        });
      }
      this.setState({ deleteUserModal: !deleteUserModal });
    };

    return (
      <div>
        {/* 로그아웃 모달창 */}
        {logoutModal && (
          <Modal
            message={"로그아웃하시겠습니까?"}
            type={"cancle and confirm"}
            point={"cancle"}
            onClickConfirm={() => onClickLogout("confirm")}
            onClickCancle={() => onClickLogout()}
          ></Modal>
        )}
        {/* 탈퇴하기 모달창 */}
        {deleteUserModal && (
          <Modal
            message={
              "정말 탈퇴하시겠습니까?\n회원탈퇴 시 모든 정보가 삭제되며,\n 복구되지 않습니다.\n탈퇴하시겠습니까?"
            }
            type={"cancle and confirm"}
            point={"cancle"}
            onClickConfirm={() => deleteUser("confirm")}
            onClickCancle={() => deleteUser()}
          ></Modal>
        )}

        <div className="head-box">
          {/* 뒤로 가기 */}
          <div className="head-back" onClick={goBack}>
            <i className="bi bi-arrow-left" style={{ color: "#36373C" }}></i>
          </div>

          {/* 타이틀 */}
          <div className="head-title">{title}</div>

          <div
            className="head-notice-search-box"
            style={{
              visibility:
                settingType === "phoneNumberAuthentication" ||
                settingType === "passwordReset"
                  ? "hidden"
                  : "",
            }}
          >
            {/* 알림 */}
            <span className="head-notice">
              <button
                className="head-notice-btn"
                style={{
                  backgroundColor: "#e1e6e8",
                }}
                onClick={() => {
                  history.push("/Notification");
                }}
              >
                <i
                  className="bi bi-bell"
                  style={{
                    color: "#36373C",
                    fontSize: "20px",
                  }}
                ></i>
              </button>
            </span>

            {/* 검색 */}
            <span className="head-search">
              <button
                className="head-search-btn"
                style={{
                  backgroundColor: "#e1e6e8",
                }}
                onClick={() => {
                  history.push("/SearchCongressman");
                }}
              >
                <i
                  className="bi bi-search"
                  style={{
                    color: "#36373C",
                    fontSize: "20px",
                  }}
                ></i>
              </button>
            </span>
          </div>
        </div>

        {/* 설정 항목 */}
        {settingType === "setting" && (
          <div>
            <div
              className="user-setting-item"
              onClick={() =>
                changeSettingTypeAndTitle(
                  "accountInfoManagement",
                  "계정/정보 관리"
                )
              }
            >
              계정/정보 관리
            </div>
            <div
              className="user-setting-item"
              onClick={() =>
                changeSettingTypeAndTitle("passwordReset", "비밀번호 재설정")
              }
            >
              비밀번호 재설정
            </div>

            <div className="user-setting-item" onClick={() => onClickLogout()}>
              로그아웃
            </div>
            <div
              className="user-setting-item"
              onClick={() =>
                changeSettingTypeAndTitle("deleteUser", "탈퇴하기")
              }
            >
              탈퇴하기
            </div>
          </div>
        )}

        {/* 계정/정보 관리 */}
        {settingType === "accountInfoManagement" && (
          <div>
            <div className="user-account-info-management-item">
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#36373C",
                  }}
                >
                  휴대폰 번호
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#888E95",
                  }}
                >
                  {userData.userPhoneNumber}
                </div>
              </div>
              <div
                className="user-account-info-management-item-change-text"
                onClick={() =>
                  changeSettingTypeAndTitle(
                    "phoneNumberAuthentication",
                    "휴대폰 번호 인증"
                  )
                }
              >
                변경
              </div>
            </div>
          </div>
        )}

        {/* 휴대폰 번호 인증 */}
        {settingType === "phoneNumberAuthentication" && (
          <div className="user-setting-phone-number-authentication">
            <div className="user-setting-phone-number-authentication-text">
              <div>새로운 휴대폰 번호로 </div>
              <div>휴대폰 인증을 진행해 주세요.</div>
            </div>
            <PhoneNumberAuthentication
              isAuthenticated={isAuthenticated}
            ></PhoneNumberAuthentication>
          </div>
        )}

        {/* 비밀번호 재설정 */}
        {settingType === "passwordReset" && (
          <div className="user-setting-password-reset">
            <PasswordReset
              userId={userData.userId}
              changePasswordComplete={changePasswordComplete}
            ></PasswordReset>
          </div>
        )}

        {/* 탈퇴하기 */}
        {settingType === "deleteUser" && (
          <div>
            <div className="user-delete-account-wrapper">
              <div className="user-delete-account-text">
                <div className="user-delete-account-text-title">
                  정말 탈퇴하시는건가요...?
                </div>
                <div className="user-delete-account-text-contents">
                  <div>
                    계정을 삭제하면 나의 지역구 국회의원, 관심 국회의원 목록,
                    투표 여부 설정 등 모든 계정 정보가 삭제됩니다.
                  </div>
                  <div>
                    또한 재가입시 다시 자신의 지역구를 설정해야하는 등의
                    번거로움이 있어요.
                  </div>
                </div>
              </div>
              <div className="user-delete-account-btn" onClick={deleteUser}>
                탈퇴하기
              </div>
            </div>
          </div>
        )}
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
  return {
    logout: () => {
      dispatch(actions.logout());
    },
    updateUserPhoneNumber: (userPhoneNumber) => {
      dispatch(actions.updateUserPhoneNumber(userPhoneNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);
