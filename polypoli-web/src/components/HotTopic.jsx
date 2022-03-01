import React, { Component } from "react";
import moment from "moment";
import "./HotTopic.css";
import BillAPI from "../api/BillAPI.js";
import BillUserMappingAPI from "../api/BillUserMappingAPI.js";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class HotTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuNum: 1,
      year: 2022,
      month: 1,
      week: 1,
      hotTopicFeed: [],
    };
    this.userKey = this.props.userData.userKey;
  }

  componentDidMount() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const weekOfMonth = (m) => m.week() - moment(m).startOf('month').week() + 1;
    const week = weekOfMonth(moment());

    this.setState({
      year: year,
      month: month,
      week: week
    })
    this.updateHotTopicFeed(year, month, week);
  }

  updateHotTopicFeed(year, month, week) {
      BillAPI.getHotBills(week, month, year, this.userKey).then((res) => {
        this.setState({
          hotTopicFeed: res.data
        })
      })
  }

  onClickLike = (feed) => {
    if (feed.likeByUser === 1) feed.likeByUser = 0;
    else feed.likeByUser = 1;

    this.setState({
      feed: feed,
    });
    BillUserMappingAPI.upsertBillLike(feed.billId, this.userKey, feed.likeByUser);
  };

  onClickDislike = (feed) => {
    if (feed.likeByUser === -1) feed.likeByUser = 0;
    else feed.likeByUser = -1;

    this.setState({
      feed: feed
    });
    BillUserMappingAPI.upsertBillLike(feed.billId, this.userKey, feed.likeByUser);
  };

  nextWeek = () => {
     const { year, month, week } = this.state;
     let tmpYear = year;
     let tmpMonth = month;
     let tmpWeek = week + 1;
     if (tmpWeek > 5) {
        tmpMonth++;
        tmpWeek = 1;
     }
     if (tmpMonth > 12) {
        tmpYear++;
        tmpMonth = 1;
     }
     this.setState({ year: tmpYear, month: tmpMonth, week: tmpWeek });
     this.updateHotTopicFeed(tmpYear, tmpMonth, tmpWeek);
  };

  lastWeek = () => {
     const { year, month, week } = this.state;
     let tmpYear = year;
     let tmpMonth = month;
     let tmpWeek = week - 1;
     if (tmpWeek < 1) {
        tmpMonth--;
        tmpWeek = 5;
     }
     if (tmpMonth < 1) {
        tmpYear--;
        tmpMonth = 12;
     }
     this.setState({ year: tmpYear, month: tmpMonth, week: tmpWeek });
     this.updateHotTopicFeed(tmpYear, tmpMonth, tmpWeek);
  };

  render() {
    const { year, month, week, hotTopicFeed } = this.state;
    const { history } = this.props;

    const progressColor = (progress) => {
      if (progress === "원안가결" || progress === "수정가결") {
        return "#1F9B00";
      } else if (
        progress === "대안반영폐기" ||
        progress === "철회" ||
        progress === "폐기"
      ) {
        return "#FF2828";
      } else if (progress === "계류") {
        return "#5D5FEF";
      }
    };

    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: "66px 1fr",
          marginBottom: "10px",
          backgroundColor: "white",
        }}
      >
        {/* ????년 ??월 ?주차 핫한 법안*/}
        <div className="hot-topic-calendar">
          <div style={{ fontSize: "10px", color: "#888E95" }}>{year}년</div>
          <div className="hot-topic-calendar-this-week">
            <div className="hot-topic-calendar-arrow" onClick={this.lastWeek}>
              <i className="bi bi-chevron-left"></i>
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {month}월 {week}주차 법안
            </div>
            <div className="hot-topic-calendar-arrow" onClick={this.nextWeek}>
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>

        {hotTopicFeed.map((feed, key) => (
          // 법안 피드 box
          <div key={key} className="hot-topic-feed-box">
            {/* 법안 피드 */}
            <div className="hot-topic-feed">
              <div className="hot-topic-feed-date">{feed.date}</div>
              <div className="hot-topic-feed-count">
                좋아요 {feed.like}개 / 싫어요{" "}
                {feed.dislike}개
              </div>
              <div className="hot-topic-feed-contents">
                <p style={{ lineHeight: 1.15 }}
                    dangerouslySetInnerHTML={{ __html: feed.feedContent }}/>
              </div>
              <div className="hot-topic-feed-link">
                <button
                  className="hot-topic-feed-link-btn"
                  onClick={() => {
                    history.push("/Bill?id=" + feed.billId);
                  }}
                >
                  &gt; 자세히 보러가기
                </button>
              </div>
            </div>
            {/* 좋아요 & 싫어요 버튼 */}
            <div className="hot-topic-like-dislike-box">
              <button
                className="hot-topic-like-btn"
                onClick={() => this.onClickLike(feed)}
                style={{ color: feed.likeByUser == 1 ? "#4F0D92" : "#36373C" }}
              >
                <i
                  className={
                    feed.likeByUser == 1 ? "bi bi-emoji-smile-fill" : "bi bi-emoji-smile"
                  }
                />
                <div>좋아요</div>
              </button>
              <button
                className="hot-topic-dislike-btn"
                onClick={() => this.onClickDislike(feed)}
                style={{ color: feed.likeByUser == -1 ? "#4F0D92" : "#36373C" }}
              >
                <i
                  className={
                    feed.likeByUser == -1 ? "bi bi-emoji-frown-fill" : "bi bi-emoji-frown"
                  }
                />
                <div>싫어요</div>
              </button>
            </div>
            <div style={{ height: "8px", backgroundColor: "#E1E6E8" }}></div>
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(HotTopic);
