import React, { Component } from "react";
import CongressmanAPI from "../api/CongressmanAPI.js";
import UserAPI from "../api/UserAPI.js";
import "./SearchCongressman.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class SearchCongressman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      congressmanName: "",
      region: "",
      party: "",
      search: false,
      searchResult: [],
    };
    this.regionList = [
      "전체",
      "강원",
      "경기",
      "경남",
      "경북",
      "광주",
      "대구",
      "대전",
      "부산",
      "서울",
      "세종",
      "울산",
      "인천",
      "전남",
      "전북",
      "제주",
      "충남",
      "충북",
      "비례대표",
    ];
    this.partyList = [
      "전체",
      "국민의당",
      "국민의힘",
      "기본소득당",
      "더불어민주당",
      "무소속",
      "시대전환",
      "정의당",
    ];
  }

  render() {
    const { congressmanName, region, party, searchResult } = this.state;
    const { history, userData } = this.props;

    const onChangeInputs = (e) => {
      const { name, value } = e.target;
      this.setState({
        ...this.state,
        [name]: value,
      });
    };

    // 검색하기
    const onClickSearch = () => {
      let reqName = congressmanName;
      let reqRegion = region;
      let reqParty = party;

      if (reqName === "") {
        reqName = "%";
      } else {
        reqName += "%"; // "홍준%"
      }

      if (reqRegion === "" || reqRegion === "전체") {
        reqRegion = "%";
      } else {
        reqRegion += "%"; // "대구%"
      }

      if (reqParty === "" || reqParty === "전체") {
        reqParty = "%";
      }

      CongressmanAPI.searchCongressmanList(reqName, reqRegion, reqParty).then(
        (response) => {
          const searchResult = response.data;
          const followingList = userData.userFollowings.split(",");
          for (let i = 0; i < searchResult.length; i++) {
            const congressmanId = searchResult[i].congressmanId;
            const isIncluded = followingList.find(
              (followId) => String(congressmanId) === followId
            );
            if (isIncluded !== undefined) {
              searchResult[i].follow = true;
            }
          }
          this.setState({ searchResult: searchResult });
        }
      );
    };

    // 팔로잉 & 언팔로잉
    const onChangeFollow = (key) => {
      searchResult[key].follow = !searchResult[key].follow;
      console.log(searchResult[key]);
      this.setState({
        searchResult: searchResult,
      });

      UserAPI.updateUserFollowings(
        userData.userKey,
        searchResult[key].congressmanId
      );
      this.props.updateUserFollowings(
        searchResult[key].congressmanId,
        searchResult[key].follow
      );
    };

    return (
      <div style={{ margin: "38px 20px 75.5px 20px", paddingBottom: "75.5px" }}>
        {/* 이름 */}
        <div className="search-congressman-item-box">
          <div className="search-congressman-item-title">이름</div>
          <div className="search-congressman-item-input-box">
            <input
              className="search-congressman-item-input"
              type="text"
              name="congressmanName"
              value={congressmanName}
              placeholder="이름 입력"
              onChange={onChangeInputs}
            />
          </div>
        </div>

        {/* 지역 */}
        <div className="search-congressman-item-box">
          <div className="search-congressman-item-title">지역</div>
          <div className="search-congressman-item-input-box">
            <select
              className="search-congressman-item-select"
              name="region"
              onChange={onChangeInputs}
              defaultValue={"default"}
            >
              {this.regionList.map((item, idx) => (
                <option key={idx} value={item} onChange={onChangeInputs}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 정당 */}
        <div className="search-congressman-item-box">
          <div className="search-congressman-item-title">정당</div>
          <div className="search-congressman-item-input-box">
            <select
              className="search-congressman-item-select"
              name="party"
              onChange={onChangeInputs}
              defaultValue={"default"}
            >
              {this.partyList.map((item, idx) => (
                <option key={idx} value={item} onChange={onChangeInputs}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 검색하기 */}
        <button className="search-congressman-btn" onClick={onClickSearch}>
          검색하기
        </button>

        <div className="search-congressman-text">
          총 295명의 의원 중 / 검색결과 {searchResult.length}명
        </div>

        <div style={{ margin: "45px 0px 53px 0px" }}>
          {searchResult.map((profile, key) => (
            <div className="search-congressman-list-box" key={key}>
              <img
                className="search-congressman-list-image"
                src={profile.profile_image}
                alt="profileImage"
                onClick={() =>
                  history.push("/Profile/" + profile.congressmanId)
                }
              />
              <div>
                <div className="search-congressman-list-name">
                  {profile.name}
                </div>
                <div className="search-congressman-list-party">
                  {profile.party}
                </div>
              </div>
              <button
                className="search-congressman-list-follow-btn"
                style={{
                  backgroundColor: profile.follow ? "#C7C8CE" : "#4F0D92",
                }}
                onClick={() => {
                  onChangeFollow(key);
                }}
              >
                {!profile.follow ? "팔로우" : "팔로잉"}
              </button>
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
  return {
    updateUserFollowings: (followId, isFollowing) => {
      dispatch(actions.updateUserFollowings(followId, isFollowing));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCongressman);
