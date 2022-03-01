import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import { Link, useParams } from "react-router-dom";
import "./CongressmanProfile.css";

import StackedBarChart from "./StackedBarChart";
import StackedBarChartWithLegend from "./StackedBarChartWithLegend";
import BillProcessingStatusTable from "./BillProcessingStatusTable";
import AttendanceStatusTable from "./AttendanceStatusTable";

import CongressmanAPI from "../api/CongressmanAPI.js";
import UserAPI from "../api/UserAPI.js";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

const medalImageUrl = "/medal.png";

class CongressmanProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      congressman_profile: {},
      follow: true,
      modal: false,
      showFollowBtn: true,
    };
    this.userData = this.props.userData;
    this.billProcessing = [
      {
        terms: "계류",
        explanation: "국회의 의안 처리를 기다리고 있는 상태",
      },
      {
        terms: "원안가결",
        explanation: "발의자가 제안한 원안 그대로 의결하는 경우",
      },
      {
        terms: "수정가결 ",
        explanation: "원안에 수정을 가해 의결하는 경우",
      },
      {
        terms: "대안반영폐기 ",
        explanation:
          "위원회가 마련한 대안에 내용이 반영되고 해당 법안은 폐기되는 경우",
      },
      {
        terms: "철회",
        explanation: "발의자가 법률안의 입안을 스스로 거두어들이는 경우",
      },
      {
        terms: "폐기",
        explanation: "제출된 안건을 심의·의결대상에서 제외하는 경우",
      },
    ];
  }

  componentDidMount() {
    const { match } = this.props;
    const congressmanId = Number(match.params.id);

    // 현재 페이지 국회의원 프로필 가져오기
    CongressmanAPI.getCongressman(congressmanId).then((response) => {
      this.setState({
        congressman_profile: response.data,
      });

      // 자신의 지역구 국회의원인지 확인
      if (congressmanId === this.props.userData.regionCongressmanId) {
        this.setState({
          showFollowBtn: false,
          follow: true,
        });
      }
      // 현재 페이지의 국회의원을 팔로잉중인지 확인
      else {
        CongressmanAPI.getInterestCongressmenByUserId(
          this.userData.userId
        ).then((response) => {
          const congressmanList = response.data;
          const isExists = congressmanList.find(
            (profile) => profile.congressmanId === Number(congressmanId)
          );
          if (isExists === undefined) {
            this.setState({
              follow: false,
            });
          } else {
            this.setState({
              follow: true,
            });
          }
        });
      }
    });

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  render() {
    const { congressman_profile, modal, follow, showFollowBtn } = this.state;
    const { history } = this.props;

    const modalOnOff = () => {
      this.setState({ modal: !modal });
    };

    // 팔로잉&팔로우
    const onChangeFollow = () => {
      const tmpFollow = !follow;
      this.setState({
        follow: tmpFollow,
      });

      UserAPI.updateUserFollowings(
        this.userData.userKey,
        congressman_profile.congressmanId
      );

      this.props.updateUserFollowings(
        congressman_profile.congressmanId,
        tmpFollow
      );
    };

    return (
      <div
        className="test-test"
        style={{
          paddingBottom: "100px",
        }}
      >
        {/* 의안 처리 설명 모달창 */}
        {modal && (
          <div className="congressman-profile-modal">
            <div className="congressman-profile-modal-title">
              <div>{/*blank_div*/}</div>
              <div>의안 처리의 {this.billProcessing.length}가지 경우</div>
              <div>
                <i
                  className="bi bi-x"
                  style={{ fontSize: "30px" }}
                  onClick={modalOnOff}
                ></i>
              </div>
            </div>
            <div className="congressman-profile-modal-bar"></div>
            {this.billProcessing.map((item, idx) => (
              <div
                key={idx}
                style={{ textAlign: "left", padding: "12px 30px" }}
              >
                <span className="congressman-profile-modal-terms">
                  {item.terms}
                </span>{" "}
                :{" "}
                <span className="congressman-profile-modal-explanation">
                  {item.explanation}
                </span>
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "11px",
            paddingBottom: "10px",
            textAlign: "left",
            backgroundColor: "white",
          }}
        >
          <div className="congressman-profile-top">
            <div>국회의원 프로필</div>
            <button
              style={{
                display: showFollowBtn ? "" : "none",
                backgroundColor: follow ? "#C7C8CE" : "#4F0D92",
              }}
              onClick={onChangeFollow}
              disabled={
                congressman_profile.congressmanId ===
                this.userData.regionCongressmanId
              }
            >
              {follow ? "팔로잉" : "팔로우"}
            </button>
          </div>
        </div>
        <div className="congressman-profile-box">
          <Image
            className="congressman-profile-image"
            src={congressman_profile.profileImage}
            rounded
          />
          <div className="congressman-profile-name">
            {congressman_profile.name}
          </div>
          <div className="congressman-profile-party">
            {congressman_profile.party}
          </div>
          <div className="congressman-profile-region">
            {congressman_profile.region}
          </div>
          <div className="congressman-profile-medal-box">
            {congressman_profile.win &&
              Object.values(congressman_profile.win).map((text, key) => (
                <div key={key}>
                  <div className="congressman-profile-medal-text">{text}대</div>
                  <img
                    className="medal image"
                    src={medalImageUrl}
                    alt="medal"
                    style={{ width: "21px", height: "28px" }}
                  ></img>
                </div>
              ))}
          </div>
          <div className="congressman-profile-age-key">출생</div>
          <div className="congressman-profile-age-value">
            {String(congressman_profile.age).substring(0, 4) +
              ". " +
              String(congressman_profile.age).substring(4, 6) +
              ". " +
              String(congressman_profile.age).substring(6, 8)}
          </div>
          <div className="congressman-profile-committee-key">소속위원회</div>
          <div className="congressman-profile-committee-value">
            {congressman_profile.committee}
          </div>
          {/* <div className="congressman-profile-academic-background-key">
            학력
          </div>
          <div className="congressman-profile-academic-background-value">
            {congressman_profile.academicBackground}
          </div> */}
          <div className="congressman-profile-career-key">
            <div>학력 및</div>
            <div>주요경력</div>
          </div>
          <div className="congressman-profile-career-value">
            {congressman_profile.career}
          </div>
          <div className="congressman-profile-tel-key">연락처</div>
          <div className="congressman-profile-tel-value">
            {congressman_profile.tel}
          </div>
        </div>
        <div className="congressman-profile-items-title-box">
          <span
            style={{ marginLeft: "20px", fontWeight: "500", fontSize: "16px" }}
          >
            대표 법안 발의
          </span>
          <span
            style={{
              float: "right",
              marginRight: "20px",
              fontWeight: "500",
              fontSize: "16px",
              color: "#4F0D92",
            }}
          >
            32개
          </span>
        </div>
        <div className="congressman-profile-bill-box">
          <div className="congressman-profile-chart-bill-box">
            <StackedBarChartWithLegend
              width="320px"
              height="30px"
              fontSize="13px"
              chartData={[
                { key: "환경노동위원회", value: 37.5 },
                { key: "환경노동위원회", value: 25 },
                { key: "국토교통위원회", value: 18.75 },
                { key: "국토교통위원회", value: 6.25 },
                { key: "교육위원회", value: 6.25 },
                { key: "교육위원회", value: 6.25 },
              ]}
              percentageEnable={true}
            />
          </div>
        </div>
        <div className="congressman-profile-items-title-box">
          <span
            style={{ marginLeft: "20px", fontWeight: "500", fontSize: "16px" }}
          >
            법안 처리 현황
          </span>
          <span
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: "2px solid #888E95",
              float: "right",
              marginRight: "20px",
              fontWeight: "500",
              fontSize: "16px",
              color: "#888E95",
              textAlign: "center",
              lineHeight: "20px",
              cursor: "pointer",
            }}
            onClick={modalOnOff}
          >
            ?
          </span>
        </div>
        <div className="congressman-profile-bill-box">
          <div className="congressman-profile-chart-bill-box">
            <StackedBarChartWithLegend
              width="320px"
              height="30px"
              fontSize="13px"
              chartData={[
                { key: "원안가결", value: 20 },
                { key: "철회", value: 19 },
                { key: "수정가결", value: 18 },
                { key: "폐기", value: 17 },
                { key: "대안반영폐기", value: 16 },
                { key: "기타", value: 10 },
              ]}
              percentageEnable={true}
            />
          </div>
          <div className="congressman-profile-table-bill-box">
            <BillProcessingStatusTable limit={3} history={history} />
          </div>
          <Link
            to="/BillProcessingStatus"
            className="congressman-profile-table-bill-detail-button"
            style={{ textDecoration: "none" }}
          >
            <span>&gt; 자세히보러가기</span>
          </Link>
        </div>
        <div className="congressman-profile-items-title-box">
          <span
            style={{ marginLeft: "20px", fontWeight: "500", fontSize: "16px" }}
          >
            상임위원회 출석률
          </span>
        </div>
        <div className="congressman-profile-attendance-box">
          <div className="congressman-profile-chart-attendance-box">
            <div style={{ paddingTop: "16px", paddingBottom: "6px" }}>
              15.6%
            </div>
            <StackedBarChart
              width="320px"
              height="30px"
              fontSize="10px"
              chartData={[{ key: "환경노동위원회", value: 15.6 }]}
              percentageEnable={false}
            />
          </div>
          <div className="congressman-profile-table-attendance-box">
            <AttendanceStatusTable
              limit={3}
              data={[
                {
                  date: "2021 09-21",
                  contents: "산업통상자원중소벤처기업위원회 제391회 08차",
                  attendance: false,
                },
                {
                  date: "2021 09-21",
                  contents: "산업통상자원중소벤처기업위원회 제391회 08차",
                  attendance: false,
                },
                {
                  date: "2021 09-21",
                  contents: "산업통상자원중소벤처기업위원회 제391회 08차",
                  attendance: true,
                },
              ]}
            />
          </div>
          <Link
            to={{
              pathname: "/StandingCommitteeAttendance",
              state: {
                title: "상임위원회",
              },
            }}
            className="congressman-profile-table-attendance-detail-button"
            style={{ textDecoration: "none" }}
          >
            <span>&gt; 자세히보러가기</span>
          </Link>
        </div>
        <div className="congressman-profile-items-title-box">
          <span
            style={{ marginLeft: "20px", fontWeight: "500", fontSize: "16px" }}
          >
            본회의 출석률
          </span>
        </div>
        <div className="congressman-profile-attendance-box">
          <div className="congressman-profile-chart-attendance-box">
            <div style={{ paddingTop: "16px", paddingBottom: "6px" }}>
              15.6%
            </div>
            <StackedBarChart
              width="320px"
              height="30px"
              fontSize="10px"
              chartData={[{ key: "환경노동위원회", value: 15.6 }]}
              percentageEnable={false}
            />
          </div>
          <div className="congressman-profile-table-attendance-box">
            <AttendanceStatusTable
              limit={3}
              data={[
                {
                  date: "2021 09-21",
                  contents: "제 391회 11차",
                  attendance: false,
                },
                {
                  date: "2021 09-21",
                  contents: "제 391회 11차",
                  attendance: false,
                },
                {
                  date: "2021 09-21",
                  contents: "제 391회 11차",
                  attendance: true,
                },
              ]}
            />
          </div>
          <Link
            to={{
              pathname: "/PlenarySessionAttendance",
              state: {
                title: "본회의",
              },
            }}
            className="congressman-profile-table-attendance-detail-button"
            style={{ textDecoration: "none" }}
          >
            <span>&gt; 자세히보러가기</span>
          </Link>
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
    updateUserFollowings: (followId, isFollowing) => {
      dispatch(actions.updateUserFollowings(followId, isFollowing));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CongressmanProfile);
