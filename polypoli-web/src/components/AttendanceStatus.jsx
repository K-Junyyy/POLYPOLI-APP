import React, { Component } from "react";
import "./AttendanceStatus.css";

class AttendanceStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      congressmanId: 475,
      currentPage: 1,
      pages: [],
      displayNum: 3,
      data: [],
    };
    this.standingCommitteeData = [
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제391회 08차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제390회 08차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제389회 08차",
        attendance: true,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제388회 08차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제387회 08차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제386회 08차",
        attendance: true,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제385회 08차",
        attendance: true,
      },
      {
        date: "2021 09-21",
        contents: "산업통상자원중소벤처기업위원회 제384회 08차",
        attendance: true,
      },
    ];
    this.plenarySessionData = [
      {
        date: "2021 09-21",
        contents: "제 391회 13차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 12차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 11차",
        attendance: true,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 10차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 9차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 8차",
        attendance: true,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 7차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 6차",
        attendance: false,
      },
      {
        date: "2021 09-21",
        contents: "제 391회 5차",
        attendance: true,
      },
    ];
  }

  componentDidMount() {
    let { pathname } = this.props.location;
    pathname = pathname.split("/")[1];
    let data = [];
    if (pathname === "PlenarySessionAttendance") {
      data = this.plenarySessionData;
      this.setState({ data: data });
    } else if (pathname === "StandingCommitteeAttendance") {
      data = this.standingCommitteeData;
      this.setState({ data: data });
    }

    let pages = [];
    for (let i = 1; i <= (data.length - 1) / this.state.displayNum + 1; i++) {
      pages.push(i);
    }
    this.setState({ pages: pages });
  }

  render() {
    const { data, currentPage, pages, displayNum } = this.state;
    const { title } = this.props.location.state;

    const onClick = (page) => {
      this.setState({ currentPage: page });
    };

    return (
      <div>
        <div
          style={{
            paddingTop: "40px",
            paddingBottom: "33px",
            textAlign: "left",
            backgroundColor: "white",
          }}
        >
          <span
            style={{
              marginLeft: "20px",
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            {title} 출석률
          </span>
        </div>
        <div>
          {data.map((attendance, idx) => {
            if (
              idx < displayNum * (currentPage - 1) ||
              idx >= displayNum * currentPage
            )
              return null;
            else
              return (
                <div key={idx} className="attendance-status-box">
                  <div className="attendance-status-date">
                    {attendance.date}
                  </div>
                  <div className="attendance-status-contents">
                    {attendance.contents}
                  </div>
                  <div
                    className="attendance-status"
                    style={{
                      margin: "auto",
                      color: attendance.attendance ? "#1F9B00" : "#FF2828",
                    }}
                  >
                    {attendance.attendance ? "출석" : "결석"}
                  </div>
                </div>
              );
          })}
        </div>
        <div>
          <div className="attendance-status-footer">
            {pages.map((page, idx) => (
              <span
                style={{
                  padding: "6px",
                  cursor: "pointer",
                  color: idx + 1 === currentPage ? "#36373C" : "#888E95",
                }}
                onClick={() => onClick(page)}
              >
                {page}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AttendanceStatus;
