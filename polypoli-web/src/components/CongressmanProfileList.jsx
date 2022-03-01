import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import IosSwitchMaterialUi from "ios-switch-material-ui";
import stampOn from "../images/stamp_on.svg";
import stampOff from "../images/stamp_off.svg";
import CongressmanAPI from "../api/CongressmanAPI.js";
import UserAPI from "../api/UserAPI.js";
import "./CongressmanProfileList.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class CongressmanProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStamp: false,
      region_congressman_profile: {},
      interest_congressman_profiles: [],
      totalNumberOfInterestCongressman: 0,
    };
  }

  componentDidMount() {
    const userId = this.props.userData.userId;
    const regionCongressmanId = this.props.userData.regionCongressmanId;
    const userStamp = this.props.userData.userStamp;

    // 도장 정보
    this.setState({
      userStamp: userStamp,
    });

    // 지역구의원 정보
    CongressmanAPI.getCongressman(regionCongressmanId).then((response) => {
      this.setState({
        region_congressman_profile: response.data,
      });
    });

    // 관심 국회의원 정보 가져오기
    CongressmanAPI.getInterestCongressmenByUserId(userId).then((response) => {
      let congressmanProfileList = response.data.filter(
        (profile) => profile.congressmanId !== regionCongressmanId
      );

      for (let i = 0; i < congressmanProfileList.length; i++)
        congressmanProfileList[i].follow = true;

      this.setState({
        interest_congressman_profiles: congressmanProfileList,
        totalNumberOfInterestCongressman: congressmanProfileList.length,
      });
    });
  }

  render() {
    const {
      userStamp,
      region_congressman_profile,
      interest_congressman_profiles,
      totalNumberOfInterestCongressman,
    } = this.state;

    const { history } = this.props;

    // 선거도장
    const onChangeStamp = () => {
      const tmpUserStamp = !userStamp;
      this.setState({
        userStamp: tmpUserStamp,
      });
      this.props.updateUserStamp(tmpUserStamp);
      UserAPI.updateUserStamp(this.props.userData.userKey, tmpUserStamp);
    };

    // 팔로잉&팔로우
    const onChangeFollow = (idx) => {
      interest_congressman_profiles[idx].follow =
        !interest_congressman_profiles[idx].follow;
      this.setState({
        interest_congressman_profiles: interest_congressman_profiles,
        totalNumberOfInterestCongressman: interest_congressman_profiles.filter(
          (profile) => profile.follow
        ).length,
      });

      UserAPI.updateUserFollowings(
        this.props.userData.userKey,
        interest_congressman_profiles[idx].congressmanId
      );

      this.props.updateUserFollowings(
        interest_congressman_profiles[idx].congressmanId,
        interest_congressman_profiles[idx].follow
      );
    };

    // 국회의원 링크
    const onClickProfile = (congressmanId) => {
      history.push("/Profile/" + congressmanId);
    };

    return (
      <div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "10px",
            textAlign: "left",
            backgroundColor: "white",
          }}
        >
          <div className="congressman-profile-list-title">
            내 지역구 국회의원
          </div>
          <div className="congressman-profile-list-text">
            내일이 투표일이라면 {region_congressman_profile.name} 의원을 다시
            뽑을 건가요?
          </div>
        </div>
        <div className="congressman-profile-list-box">
          <img
            className="congressman-profile-list-image"
            src={region_congressman_profile.profileImage}
            alt="profileImage"
            onClick={() =>
              onClickProfile(region_congressman_profile.congressmanId)
            }
          />
          <div
            className="congressman-profile-list-name"
            onClick={() =>
              onClickProfile(region_congressman_profile.congressmanId)
            }
          >
            {region_congressman_profile.name}
          </div>
          <div className="congressman-profile-list-party">
            {region_congressman_profile.party}
          </div>
          <div className="congressman-profile-list-region">
            {region_congressman_profile.region}
          </div>

          <img
            className="congressman-profile-stamp"
            src={userStamp ? stampOn : stampOff}
            alt="stamp"
            onClick={onChangeStamp}
          />
        </div>
        <div>
          <div style={{ height: "10px" }} />
          <div style={{ background: "white" }}>
            <div className="congressman-interest-list-title">
              <div>관심 국회의원</div>
              <div>{totalNumberOfInterestCongressman}명</div>
            </div>

            {interest_congressman_profiles.map((profile, idx) => (
              <div className="congressman-interest-profile-box" key={idx}>
                <img
                  className="congressman-interest-profile-image"
                  src={profile.profileImage}
                  alt="profileImage"
                  onClick={() => onClickProfile(profile.congressmanId)}
                />
                <div>
                  <div
                    className="congressman-interest-profile-name"
                    onClick={() => onClickProfile(profile.congressmanId)}
                  >
                    {profile.name}
                  </div>
                  <div className="congressman-interest-profile-party">
                    {profile.party}
                  </div>
                </div>
                <button
                  className="congressman-interest-follow-btn"
                  style={{
                    backgroundColor: profile.follow ? "#C7C8CE" : "#4F0D92",
                  }}
                  onClick={() => {
                    onChangeFollow(idx);
                  }}
                >
                  {profile.follow ? "팔로잉" : "팔로우"}
                </button>
              </div>
            ))}
          </div>
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
  return {
    updateUserStamp: (userStamp) => {
      dispatch(actions.updateUserStamp(userStamp));
    },
    updateUserFollowings: (followId, isFollowing) => {
      dispatch(actions.updateUserFollowings(followId, isFollowing));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongressmanProfileList);
