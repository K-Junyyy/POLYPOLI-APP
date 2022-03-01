import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import "./Feed.css";
import FeedAPI from "../api/FeedAPI";
import FeedUserMappingAPI from "../api/FeedUserMappingAPI";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      page: -1,
    };

    this.userKey = this.props.userData.userKey;

    this.setRef = this.setRef.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
  }

  setRef(ref) {
    this.ref = ref;
  }

  checkScroll() {
    const { feeds, page } = this.state;
    // div 태크에서 받은 ref 프로퍼티 객체
    if (!this.ref) return;
    const posBottom = this.ref.getBoundingClientRect().bottom;
    const winHeight = window.innerHeight + 1;
    // 스크롤이 내려오면 리스트 추가
    if (posBottom < winHeight + 1) {
      FeedAPI.getFeed(this.userKey, page + 1).then((response) => {
        this.setState({
          page: page + 1,
          feeds: feeds.concat(response.data),
        });
      });
    }
  }

  componentDidMount() {
    // 이벤트 리스너에 체크 함수 연결
    window.addEventListener("scroll", this.checkScroll);
    this.checkScroll();
  }

  onClickLike = (key) => {
    const { feeds } = this.state;
    if (feeds[key].like === 1) feeds[key].like = 0;
    else feeds[key].like = 1;

    this.setState({
      feeds: feeds,
    });
    FeedUserMappingAPI.upsertFeedLike(
      feeds[key].feedId,
      this.userKey,
      feeds[key].like
    );
  };

  onClickDislike = (key) => {
    const { feeds } = this.state;
    if (feeds[key].like === -1) feeds[key].like = 0;
    else feeds[key].like = -1;

    this.setState({
      feeds: feeds,
    });
    FeedUserMappingAPI.upsertFeedLike(
      feeds[key].feedId,
      this.userKey,
      feeds[key].like
    );
  };

  render() {
    const { feeds } = this.state;

    return (
      <div ref={this.setRef}>
        <div style={{ marginTop: "25px" }}></div>
        <div>
          {feeds.map((data, key) => (
            <div key={key} className="feed-box">
              <a
                className="profile-image-box"
                href={"/Profile/" + data.congressman.congressmanId}
              >
                <Image
                  className="profile-image"
                  src={data.congressman.profileImage}
                  rounded
                />
              </a>
              <div className="name">{data.congressman.name}</div>
              <div className="date">{data.feed.date}</div>
              <div className="content">
                <p
                  style={{ lineHeight: 1.15 }}
                  dangerouslySetInnerHTML={{ __html: data.feed.content }}
                />
                {data.feed.billId && (
                  <div style={{marginBottom: "10px"}}>
                    <Link
                        to={"/Bill?id=" + data.feed.billId}
                        style={{
                          textDecoration: "none",
                          fontSize: "14px",
                          color: "#888E95",
                        }}
                      >
                        &gt; 자세히 보러가기</Link>
                  </div>
                )}
              </div>
              <button
                className="like"
                onClick={() => this.onClickLike(key)}
                style={{ color: data.like === 1 ? "#4F0D92" : "black" }}
              >
                <i
                  className={
                    data.like === 1
                      ? "bi bi-emoji-smile-fill"
                      : "bi bi-emoji-smile"
                  }
                />
                <div>좋아요</div>
              </button>
              <button
                className="dislike"
                onClick={() => this.onClickDislike(key)}
                style={{ color: data.like === -1 ? "#4F0D92" : "#36373C" }}
              >
                <i
                  className={
                    data.like === -1
                      ? "bi bi-emoji-frown-fill"
                      : "bi bi-emoji-frown"
                  }
                />
                <div>싫어요</div>
              </button>
              <div className="feed-bottom-margin"></div>
            </div>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
