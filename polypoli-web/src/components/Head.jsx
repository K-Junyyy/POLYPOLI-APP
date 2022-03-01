import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import MenuComponent from "./MenuBar";
import FeedComponent from "./Feed";
import Ranking from "./Ranking";
import CongressmanProfileList from "./CongressmanProfileList";
import CongressmanProfile from "./CongressmanProfile";
import HotTopic from "./HotTopic";
import BillProcessingStatus from "./BillProcessingStatus";
import BillContents from "./BillContents";
import AttendanceStatus from "./AttendanceStatus";
import Notification from "./Notification";
import SearchCongressman from "./SearchCongressman";
import MyPage from "./MyPage";
import "./Head.css";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", pathname: "" };
  }

  componentDidMount() {
    this.setState({ title: "" });
  }

  componentDidUpdate() {
    const { title, pathname } = this.state;
    const currentPathname = this.props.location.pathname.split("/")[1];

    if (currentPathname !== pathname) {
      // 스크롤 최상단 이동
      window.scrollTo(0, 0);
      if (currentPathname === "Feed") {
        this.setState({ title: "", pathname: currentPathname });
      } else if (currentPathname === "Ranking") {
        this.setState({ title: "국회의원 랭킹", pathname: currentPathname });
      } else if (currentPathname === "HotTopic") {
        this.setState({ title: "이번주 핫한 법안", pathname: currentPathname });
      } else if (currentPathname === "ProfileList") {
        this.setState({
          title: "관심 국회의원 목록",
          pathname: currentPathname,
        });
      } else if (currentPathname === "Profile") {
        this.setState({ title: "국회의원 프로필", pathname: currentPathname });
      } else if (currentPathname === "MyPage") {
        this.setState({ title: "마이페이지", pathname: currentPathname });
      } else if (currentPathname === "Bill") {
        this.setState({ title: "법안 내용", pathname: currentPathname });
      } else if (currentPathname === "BillProcessingStatus") {
        this.setState({ title: "법안 처리 현황", pathname: currentPathname });
      } else if (currentPathname === "PlenarySessionAttendance") {
        this.setState({ title: "본회의 출석률", pathname: currentPathname });
      } else if (currentPathname === "StandingCommitteeAttendance") {
        this.setState({
          title: "상임위원회 출석률",
          pathname: currentPathname,
        });
      } else if (currentPathname === "Notification") {
        this.setState({ title: "알림", pathname: currentPathname });
      } else if (currentPathname === "SearchCongressman") {
        this.setState({ title: "국회의원 검색", pathname: currentPathname });
      }
    }
  }

  render() {
    const { title, pathname } = this.state;
    const { location, history } = this.props;

    return (
      <div>
        <div className="head-box">
          {/* 폴리폴리 로고 */}
          <Link to="/Feed" style={{ textDecoration: "none" }}>
            <div className="head-logo">polypoli</div>
          </Link>

          {/* 타이틀 */}
          <div className="head-title">{title}</div>

          <div className="head-notice-search-box">
            {/* 알림 */}
            <div className="head-notice">
              <button
                className="head-notice-btn"
                style={{
                  backgroundColor:
                    pathname === "Notification" ? "#A98EC3" : "#e1e6e8",
                }}
                onClick={() => {
                  history.push("/Notification");
                }}
              >
                <i
                  className="bi bi-bell"
                  style={{
                    color: pathname === "Notification" ? "#ffffff" : "#36373C",
                  }}
                ></i>
              </button>
            </div>

            {/* 검색 */}
            <div className="head-search">
              <button
                className="head-search-btn"
                style={{
                  backgroundColor:
                    pathname === "SearchCongressman" ? "#A98EC3" : "#e1e6e8",
                }}
                onClick={() => {
                  history.push("/SearchCongressman");
                }}
              >
                <i
                  className="bi bi-search"
                  style={{
                    color:
                      pathname === "SearchCongressman" ? "#ffffff" : "#36373C",
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>

        <Route path="/Feed" component={FeedComponent} />
        <Route path="/Ranking" component={Ranking} />
        <Route path="/HotTopic" component={HotTopic} />
        <Route path="/ProfileList" component={CongressmanProfileList} />
        <Route path="/Profile/:id" component={CongressmanProfile} />
        <Route path="/Bill/:id?" component={BillContents} />
        <Route path="/BillProcessingStatus" component={BillProcessingStatus} />
        <Route path="/PlenarySessionAttendance" component={AttendanceStatus} />
        <Route
          path="/StandingCommitteeAttendance"
          component={AttendanceStatus}
        />
        <Route path="/Notification" component={Notification} />
        <Route path="/SearchCongressman" component={SearchCongressman} />
        <Route path="/MyPage" component={MyPage} />
        <MenuComponent location={location}></MenuComponent>
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

export default connect(mapStateToProps, mapDispatchToProps)(Head);
