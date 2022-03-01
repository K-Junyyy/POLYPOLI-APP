import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UserAPI from "../api/UserAPI";
import profile_icon_default from "../images/profile_icon_default.svg";
import profile_icon_red from "../images/profile_icon_red.svg";
import profile_icon_skyblue from "../images/profile_icon_skyblue.svg";
import profile_icon_orange from "../images/profile_icon_orange.svg";
import profile_icon_yellow from "../images/profile_icon_yellow.svg";
import profile_icon_green from "../images/profile_icon_green.svg";
import Modal from "./Modal";
import "./MyPage.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, userProfile: {} };
    this.imgList = [
      profile_icon_default,
      profile_icon_red,
      profile_icon_skyblue,
      profile_icon_orange,
      profile_icon_yellow,
      profile_icon_green,
    ];
  }

  componentDidMount() {
    const { userKey } = this.props.userData;
    UserAPI.getUser(userKey).then((response) => {
      this.setState({
        userProfile: response.data,
      });
    });
  }

  render() {
    const { modal, userProfile } = this.state;
    const { history } = this.props;

    const onClickModal = () => {
      this.setState({ modal: !modal });
    };

    return (
      <div style={{ margin: "19px 20px 75.5px 20px" }}>
        {/* 모달창 */}
        {modal && (
          <Modal
            message={
              "내 지역 변경은 마지막 변경일로부터\n3개윌 이후에 가능합니다."
            }
            type={"confirm"}
            point={"confirm"}
            onClickConfirm={onClickModal}
          ></Modal>
        )}

        {/* 나의 프로필 */}
        <div
          style={{
            fontSize: "16px",
            textAlign: "left",
            fontWeight: "500",
          }}
        >
          나의 프로필
        </div>
        <div className="my-page-profile-box">
          <img
            className="my-page-profile-img"
            src={this.imgList[Number(userProfile.userImg)]}
            alt=""
          />
          <div className="my-page-profile-info">
            <div>
              <div className="my-page-profile-info-user-name">
                {userProfile.userName}
              </div>
              <div className="my-page-profile-info-user-region">
                {/* 방이2동/송파구 갑 */}
                {userProfile.userArea}
              </div>
            </div>
            <Link
              to={{
                pathname: "/SignUp",
                state: {
                  progress: 7,
                  type: "myPage",
                },
              }}
            >
              <div className="my-page-profile-info-user-btn">
                <i className="bi bi-chevron-right"></i>
              </div>
            </Link>
          </div>
        </div>

        {/* 설정 */}
        <div className="my-page-setting-item-box">
          <Link
            to={{
              pathname: "/SignUp",
              state: {
                progress: 6,
                type: "myPage",
              },
            }}
            style={{ textDecoration: "none" }}
            className="my-page-setting-item"
          >
            <i className="bi bi-geo-alt"></i>
            <div>내 지역 변경</div>
          </Link>
          <Link
            className="my-page-setting-item"
            to={"/UserSetting"}
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-gear"></i>
            <div>설정</div>
          </Link>
          <div className="my-page-setting-item">
            <i className="bi bi-headset"></i>
            <div>문의사항</div>
          </div>
          <CopyToClipboard text={"http://localhost:3000/"}>
            <div
              className="my-page-setting-item"
              onClick={() => alert("링크가 복사되었습니다.")}
            >
              <i className="bi bi-share"></i>
              <div>링크공유</div>
            </div>
          </CopyToClipboard>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
