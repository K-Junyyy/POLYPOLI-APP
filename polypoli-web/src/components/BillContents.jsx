import React, { Component } from "react";
import BillAPI from "../api/BillAPI.js";
import BillUserMappingAPI from "../api/BillUserMappingAPI.js";
import CongressmanAPI from "../api/CongressmanAPI.js";
import queryString from "query-string";
import "./BillContents.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class BillContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billData: {},
      proposers: [],
    };
    this.userKey = this.props.userData.userKey;
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    let arr = [];
    BillAPI.getBillWithUserId(query.id, this.userKey).then((response) => {
      this.setState({ billData: response.data });
      const proposerId = response.data.proposers.split(",");

      for (let i = 0; i < proposerId.length; i++) {
        CongressmanAPI.getCongressman(proposerId[i]).then((response) => {
          const congressmanData = response.data;
          this.setState({
            proposers: this.state.proposers.concat({
              congressmanId: congressmanData.congressmanId,
              name: congressmanData.name,
              party: congressmanData.party,
              profileImage: congressmanData.profileImage,
            }),
          });
        });
      }
    });
  }

  onClickLike = () => {
    const { billData } = this.state;
    if (billData.likeByUser === 1) billData.likeByUser = 0;
    else billData.likeByUser = 1;

    this.setState({
      billData: billData,
    });
    BillUserMappingAPI.upsertBillLike(billData.billId, this.userKey, billData.likeByUser);
  };

  onClickDislike = () => {
    const { billData } = this.state;
    if (billData.likeByUser === -1) billData.likeByUser = 0;
    else billData.likeByUser = -1;

    this.setState({
      billData: billData,
    });
    BillUserMappingAPI.upsertBillLike(billData.billId, this.userKey, billData.likeByUser);
  };

  render() {
    const { billData, proposers } = this.state;
    const { history } = this.props;

    const partyColor = (party) => {
      switch (party) {
        case "국민의힘":
          return "#C71F1F";
        case "더불어민주당":
          return "#1F80C7";
        case "국민의당":
          return "#EB5C24";
        case "기본소득당":
          return "#01A999";
        case "무소속":
          return "#D8D8D8";
        case "시대전환 ":
          return "#9B7DBF";
        case "열린민주당":
          return "#0964A6";
        case "정의당":
          return "#FFD12D";
        default:
          break;
      }
    };

    const onClickProfile = (id) => {
      history.push("Profile/" + id);
    };

    return (
      <div className="bill-contents-wrapper">
        <div className="bill-contents-title">{billData.title}</div>
        <div className="bill-contents-content">
          <div className="bill-contents-subject">제안이유 및 주요내용</div>
          {billData.main_content_and_reason}
        </div>
        <div className="bill-contents-link">
          <a
            href={
              "https://opinion.lawmaking.go.kr/gcom/nsmLmSts/out/" +
              billData.billId +
              "/detailRP"
            }
          >
            &gt;원안 보러가기
          </a>
        </div>

        {/* 함께 발의한 국회의원 */}
        <div className="bill-contents-subject">함께 발의한 국회의원</div>
        <div className="bill-contents-proposers">
          {proposers.map((proposer, key) => (
            <div
              className="bill-contents-proposer-box"
              key={key}
              onClick={() => {
                onClickProfile(proposer.congressmanId);
              }}
              // onClick={() => {
              //   window.location.href = "Profile/" + proposer.congressmanId;
              // }}
              style={{ cursor: "pointer" }}
            >
              <img
                className="bill-contents-proposer-img"
                src={proposer.profileImage}
                alt="congressman"
              />
              <div className="bill-contents-proposer-party-name">
                <div
                  className="bill-contents-proposer-party"
                  style={{ backgroundColor: partyColor(proposer.party) }}
                ></div>
                <div>{proposer.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 좋아요 & 싫어요 */}
        <div className="bill-contents-like-dislike-box">
          <button
            className="bill-contents-like-btn"
            onClick={this.onClickLike}
            style={{ color: billData.likeByUser === 1 ? "#4F0D92" : "#36373C" }}
          >
            <i
              className={
                billData.likeByUser === 1
                  ? "bi bi-emoji-smile-fill"
                  : "bi bi-emoji-smile"
              }
            />
            <div>좋아요</div>
          </button>
          <button
            className="bill-contents-dislike-btn"
            onClick={this.onClickDislike}
            style={{ color: billData.likeByUser === -1 ? "#4F0D92" : "#36373C" }}
          >
            <i
              className={
                billData.likeByUser === -1
                  ? "bi bi-emoji-frown-fill"
                  : "bi bi-emoji-frown"
              }
            />
            <div>싫어요</div>
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillContents);
