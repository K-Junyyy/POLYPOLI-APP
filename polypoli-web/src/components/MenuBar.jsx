import React, { Component } from "react";
import { Link } from "react-router-dom";
import fire from "../images/fire.svg";
import fire_fill from "../images/fire_fill.svg";
import "./MenuBar.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuNum: 1,
      pathname: "",
      scrollY: 0,
    };
  }

  // 스크롤 값 받아오기 (현재는 사용x)
  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }

  // handleScroll = () => {
  //   this.setState({ scrollY: window.scrollY });
  // };

  componentDidUpdate() {
    let pathname = this.props.location.pathname;
    pathname = pathname.split("/")[1];
    if (pathname === this.state.pathname) return;
    if (pathname === "Feed") {
      this.setState({ menuNum: 1, pathname: pathname });
    } else if (pathname === "Ranking") {
      this.setState({ menuNum: 2, pathname: pathname });
    } else if (pathname === "HotTopic") {
      this.setState({ menuNum: 3, pathname: pathname });
    } else if (pathname === "ProfileList") {
      this.setState({ menuNum: 4, pathname: pathname });
    } else if (pathname === "Profile") {
      this.setState({ menuNum: 4, pathname: pathname });
    } else if (pathname === "MyPage") {
      this.setState({ menuNum: 5, pathname: pathname });
    }
    // window.scrollTo(0, 0);
  }

  render() {
    const { menuNum, scrollY } = this.state;

    const changeMenuNum = (menuNum) => {
      this.setState({
        menuNum: menuNum,
      });
    };

    return (
      // <nav style={{ bottom: -scrollY }}>
      <nav>
        {/* Home */}
        <div
          className={menuNum === 1 ? "is-current" : ""}
          style={{ gridColumn: 1 }}
        >
          <Link to="/Feed">
            <button className="menu-btn" onClick={() => changeMenuNum(1)}>
              <i
                className={
                  menuNum === 1 ? "bi bi-house-door-fill" : "bi bi-house-door"
                }
                style={{
                  fontSize: "26px",
                  color: menuNum === 1 ? "#4F0D92" : "#36373C",
                }}
              ></i>
            </button>
          </Link>
        </div>
        {/* 랭킹 */}
        <div
          className={menuNum === 2 ? "is-current" : ""}
          style={{ gridColumn: 2 }}
        >
          <Link to="/Ranking">
            <button className="menu-btn" onClick={() => changeMenuNum(2)}>
              <i
                className={
                  menuNum === 2 ? "bi bi-trophy-fill" : "bi bi bi-trophy"
                }
                style={{
                  fontSize: "26px",
                  color: menuNum === 2 ? "#4F0D92" : "#36373C",
                }}
              ></i>
            </button>
          </Link>
        </div>
        {/* 이번주 핫한 법안 */}
        <div
          className={menuNum === 3 ? "is-current" : ""}
          style={{ gridColumn: 3 }}
        >
          <Link to="/HotTopic">
            <button className="menu-btn" onClick={() => changeMenuNum(3)}>
              <img
                src={menuNum === 3 ? fire_fill : fire}
                alt="fire_fill"
                style={{ height: "30px", width: "30px" }}
              />
            </button>
          </Link>
        </div>
        {/* 프로필 목록*/}
        <div
          className={menuNum === 4 ? "is-current" : ""}
          style={{ gridColumn: 4 }}
        >
          <Link to="/ProfileList">
            <button className="menu-btn" onClick={() => changeMenuNum(4)}>
              <i
                className={
                  menuNum === 4
                    ? "bi bi-person-badge-fill"
                    : "bi bi-person-badge"
                }
                style={{
                  fontSize: "26px",
                  color: menuNum === 4 ? "#4F0D92" : "#36373C",
                }}
              ></i>
            </button>
          </Link>
        </div>
        {/* 설정*/}
        <div
          className={menuNum === 5 ? "is-current" : ""}
          style={{ gridColumn: 5 }}
        >
          <Link to="/MyPage">
            <button className="menu-btn" onClick={() => changeMenuNum(5)}>
              <i
                className="bi bi-list"
                style={{
                  fontSize: "26px",
                  color: menuNum === 5 ? "#4F0D92" : "#36373C",
                }}
              ></i>
            </button>
          </Link>
        </div>
        {/* <div className="nav-underline"></div> */}
      </nav>
    );
  }
}

MenuBar.propTypes = {};

export default MenuBar;
