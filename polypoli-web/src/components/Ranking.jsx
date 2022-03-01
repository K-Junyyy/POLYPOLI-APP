import React, { Component } from "react";
import crown_y from "../images/crown_y.svg";
import dark_and_stormy from "../images/dark_and_stormy.svg";
import "./Ranking.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuNum: 1,
      year: 2022,
      month: 1,
      week: 1,
      bestRanking: [
        {
          name: "홍준표",
          party: "국민의힘",
          numberOfLikes: 1234,
          profileImg: "http://www.assembly.go.kr/photo/9771145.jpg",
        },
        {
          name: "심상정",
          party: "정의당",
          numberOfLikes: 1211,
          profileImg: "http://www.assembly.go.kr/photo/9770869.jpg",
        },
        {
          name: "황희",
          party: "더불어민주당",
          numberOfLikes: 1088,
          profileImg: "http://www.assembly.go.kr/photo/9770936.jpg",
        },
        {
          name: "강은미",
          party: "정의당",
          numberOfLikes: 956,
          profileImg: "http://www.assembly.go.kr/photo/9771276.jpg",
        },
        {
          name: "김의겸",
          party: "열린민주당",
          numberOfLikes: 875,
          profileImg: "http://www.assembly.go.kr/photo/9770936.jpg",
        },
        {
          name: "김기현",
          party: "국민의힘",
          numberOfLikes: 777,
          profileImg: "http://www.assembly.go.kr/photo/9771164.jpg",
        },
        {
          name: "박성중",
          party: "국민의힘",
          numberOfLikes: 678,
          profileImg: "http://www.assembly.go.kr/photo/9770944.jpg",
        },
        {
          name: "김민석",
          party: "더불어민주당",
          numberOfLikes: 555,
          profileImg: "http://www.assembly.go.kr/photo/9771120.jpg",
        },
        {
          name: "윤재옥",
          party: "국민의힘",
          numberOfLikes: 521,
          profileImg: "http://www.assembly.go.kr/photo/9770812.jpg",
        },
        {
          name: "박덕흠",
          party: "국민의힘",
          numberOfLikes: 500,
          profileImg: "http://www.assembly.go.kr/photo/9770768.jpg",
        },
        {
          name: "변재일",
          party: "더불어민주당",
          numberOfLikes: 422,
          profileImg: "http://www.assembly.go.kr/photo/9770356.jpg",
        },
        {
          name: "김영주",
          party: "더불어민주당",
          numberOfLikes: 366,
          profileImg: "http://www.assembly.go.kr/photo/9770975.jpg",
        },
      ],
      worstRanking: [
        {
          name: "정성호",
          party: "더불어민주당",
          numberOfLikes: 5,
          profileImg: "http://www.assembly.go.kr/photo/9770881.jpg",
        },
        {
          name: "이광재",
          party: "더불어민주당",
          numberOfLikes: 10,
          profileImg: "http://www.assembly.go.kr/photo/9771198.jpg",
        },
        {
          name: "정청래",
          party: "더불어민주당",
          numberOfLikes: 15,
          profileImg: "http://www.assembly.go.kr/photo/9771114.jpg",
        },
        {
          name: "조경태",
          party: "국민의힘",
          numberOfLikes: 21,
          profileImg: "http://www.assembly.go.kr/photo/9770450.jpg",
        },
        {
          name: "조정식",
          party: "더불어민주당",
          numberOfLikes: 44,
          profileImg: "http://www.assembly.go.kr/photo/9770456.jpg",
        },
        {
          name: "서영교",
          party: "더불어민주당",
          numberOfLikes: 45,
          profileImg: "http://www.assembly.go.kr/photo/9770784.jpg",
        },
        {
          name: "전해철",
          party: "더불어민주당",
          numberOfLikes: 47,
          profileImg: "http://www.assembly.go.kr/photo/9770846.jpg",
        },
        {
          name: "유의동",
          party: "국민의힘",
          numberOfLikes: 63,
          profileImg: "http://www.assembly.go.kr/photo/9770912.jpg",
        },
        {
          name: "김종민",
          party: "더불어민주당",
          numberOfLikes: 88,
          profileImg: "http://www.assembly.go.kr/photo/9771009.jpg",
        },
        {
          name: "이용호",
          party: "국민의힘",
          numberOfLikes: 111,
          profileImg: "http://www.assembly.go.kr/photo/9771015.jpg",
        },
        {
          name: "우원식",
          party: "더불어민주당",
          numberOfLikes: 200,
          profileImg: "http://www.assembly.go.kr/photo/9770872.jpg",
        },
        {
          name: "정진석",
          party: "국민의힘",
          numberOfLikes: 320,
          profileImg: "http://www.assembly.go.kr/photo/9771006.jpg",
        },
      ],
    };
  }

  componentDidMount() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDay();
    // 나중에 몇주차인지 구할 때 필요한 부분
  }

  render() {
    const { menuNum, year, month, week, bestRanking, worstRanking } =
      this.state;

    const onClickBest = () => {
      this.setState({ menuNum: 1 });
    };
    const onClickWorst = () => {
      this.setState({ menuNum: 2 });
    };

    const nextWeek = () => {
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
    };

    const lastWeek = () => {
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
    };

    return (
      <div
        style={{
          display: "grid",
          grid: "subgrid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "20px 37px 35px 68px 210px 1fr",
          background: "white",
        }}
      >
        {/* Best 20 || Worst 20 네비게이션 바 */}
        <div className="rangking-nav-wrapper">
          <div className="rangking-nav">
            <div
              style={{
                cursor: "pointer",
                color: menuNum === 1 ? "#36373C" : "#C7C8CE",
              }}
              onClick={onClickBest}
            >
              Best 20
            </div>
            <div
              style={{
                cursor: "pointer",
                color: menuNum === 2 ? "#36373C" : "#C7C8CE",
              }}
              onClick={onClickWorst}
            >
              Worst 20
            </div>
          </div>
          <div
            className="rangking-nav-underline"
            style={
              menuNum === 1
                ? { left: "14%", width: "20%" }
                : { left: "64%", width: "20%" }
            }
          ></div>
        </div>

        {/* ????년 ??월 ?주차 랭킹*/}
        <div className="ranking-calendar">
          <div style={{ fontSize: "10px", color: "#888E95" }}>{year}년</div>
          <div className="ranking-calendar-this-week">
            <div className="ranking-calendar-arrow" onClick={lastWeek}>
              <i className="bi bi-chevron-left"></i>
            </div>
            <div
              style={{
                margin: "0px 37px 0px 37px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {month}월 {week}주차 랭킹
            </div>
            <div className="ranking-calendar-arrow" onClick={nextWeek}>
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>

        {/* 1,2,3위 표시 */}
        <div className="ranking-top-congressman">
          {/* 2위 */}
          <div className="ranking-top-congressman-2nd">
            <div style={{ fontWeight: "500", fontSize: "16px" }}>2</div>
            <div>
              <img
                className="ranking-top-congressman-profile-img"
                src={
                  menuNum === 1
                    ? bestRanking[1].profileImg
                    : worstRanking[1].profileImg
                }
                alt="profileImg"
              />
            </div>
            <div className="ranking-top-congressman-name">
              {menuNum === 1 ? bestRanking[1].name : worstRanking[1].name}
            </div>
            <div className="ranking-top-congressman-party">
              {menuNum === 1 ? bestRanking[1].party : worstRanking[1].party}
            </div>
            <div className="ranking-top-congressman-likes">
              <i
                className="bi bi-emoji-smile-fill"
                style={{ color: "#723DA8", marginRight: "5px" }}
              ></i>
              {menuNum === 1
                ? bestRanking[1].numberOfLikes
                : worstRanking[1].numberOfLikes}
            </div>
          </div>
          {/* 1위 */}
          <div className="ranking-top-congressman-1st">
            {menuNum === 1 ? (
              <img
                className="ranking-top-ranker-icon"
                style={{ width: "30px", top: "3px" }}
                src={crown_y}
                alt="1st"
              />
            ) : (
              <img
                className="ranking-top-ranker-icon"
                style={{ width: "40px", top: "6px" }}
                src={dark_and_stormy}
                alt="1st"
              />
            )}
            <div>
              <img
                className="ranking-top-ranker-icon"
                style={{ width: "80px", height: "80px" }}
                className="ranking-top-congressman-profile-img"
                src={
                  menuNum === 1
                    ? bestRanking[0].profileImg
                    : worstRanking[0].profileImg
                }
                alt="profileImg"
              />
            </div>
            <div className="ranking-top-congressman-name">
              {menuNum === 1 ? bestRanking[0].name : worstRanking[0].name}
            </div>
            <div className="ranking-top-congressman-party">
              {menuNum === 1 ? bestRanking[0].party : worstRanking[0].party}
            </div>
            <div className="ranking-top-congressman-likes">
              <i
                className="bi bi-emoji-smile-fill"
                style={{ color: "#723DA8", marginRight: "5px" }}
              ></i>
              {menuNum === 1
                ? bestRanking[0].numberOfLikes
                : worstRanking[0].numberOfLikes}
            </div>
          </div>
          {/* 3위 */}
          <div className="ranking-top-congressman-3rd">
            <div style={{ fontWeight: "500", fontSize: "16px" }}>3</div>
            <div>
              <img
                className="ranking-top-congressman-profile-img"
                src={
                  menuNum === 1
                    ? bestRanking[2].profileImg
                    : worstRanking[2].profileImg
                }
                alt="profileImg"
              />
            </div>
            <div className="ranking-top-congressman-name">
              {menuNum === 1 ? bestRanking[2].name : worstRanking[2].name}
            </div>
            <div className="ranking-top-congressman-party">
              {menuNum === 1 ? bestRanking[2].party : worstRanking[2].party}
            </div>
            <div className="ranking-top-congressman-likes">
              <i
                className="bi bi-emoji-smile-fill"
                style={{ color: "#723DA8", marginRight: "5px" }}
              ></i>
              {menuNum === 1
                ? bestRanking[2].numberOfLikes
                : worstRanking[2].numberOfLikes}
            </div>
          </div>
        </div>

        {/* 4위~ */}
        <div className="ranking-list">
          <div className="ranking-list-column">
            <div>순위</div>
            <div>이름</div>
            <div>소속당</div>
            <div>게시글 좋아요</div>
          </div>
          <div className="ranking-list-bar"></div>

          {(menuNum === 1 ? bestRanking : worstRanking).map((item, key) => (
            <div key={key} style={{ display: key + 1 <= 3 ? "none" : "block" }}>
              <div className="ranking-list-item">
                <div
                  className="ranking-list-item-position-1"
                  style={{ color: key + 1 <= 10 ? "#4F0D92" : "#36373C" }}
                >
                  {key + 1}
                </div>
                <div className="ranking-list-item-position-2">
                  <img
                    style={{
                      objectFit: "cover",
                      width: "40px",
                      height: "40px",
                    }}
                    src={item.profileImg}
                    alt="profileImg"
                  />
                </div>

                <div className="ranking-list-item-position-3">{item.name}</div>
                <div className="ranking-list-item-position-4">{item.party}</div>
                <div className="ranking-list-item-position-5">
                  {item.numberOfLikes}
                </div>
              </div>

              <div className="ranking-list-bar"></div>
            </div>
          ))}
          <div style={{ paddingBottom: "75.5px" }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
