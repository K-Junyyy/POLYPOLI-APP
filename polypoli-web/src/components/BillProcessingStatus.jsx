import React, { Component } from "react";
import "./BillProcessingStatus.css";

class BillProcessingStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pages: [],
      displayNum: 3,
    };
    this.billList = [
      {
        billId: 2107477,
        date: "2021 09-21",
        contents:
          "코로나바이러스감염증-19의 퇴치를 위한 특별조치법안(홍준표의원 등 17인)",
      },
      {
        billId: 2104078,
        date: "2021 09-22",
        contents: "대구통합신공항특별법안(홍준표의원 등 17인)",
      },
      {
        billId: 2104078,
        date: "2021 09-23",
        contents: "대구통합신공항특별법안(홍준표의원 등 17인)",
      },
      {
        billId: 2107477,
        date: "2021 09-24",
        contents:
          "코로나바이러스감염증-19의 퇴치를 위한 특별조치법안(홍준표의원 등 17인)",
      },
      {
        billId: 2113374,
        date: "2021 09-25",
        contents:
          "파산선고 등에 따른 결격조항 정비를 위한 외교통일위원회 소관 2개 법률 일부개정을 위한 법률안(박주민의원 등 11인)",
      },
      {
        billId: 2104078,
        date: "2021 09-26",
        contents: "대구통합신공항특별법안(홍준표의원 등 17인)",
      },
      {
        billId: 2113663,
        date: "2021 09-27",
        contents: "과학기술기본법 일부개정법률안(김상희의원 등 10인)",
      },
      {
        billId: 2113653,
        date: "2021 09-28",
        contents: "제대군인지원공단법안(신원식의원 등 28인)",
      },
    ];
  }

  componentDidMount() {
    let pages = [];
    for (
      let i = 1;
      i <= (this.billList.length - 1) / this.state.displayNum + 1;
      i++
    ) {
      pages.push(i);
    }
    this.setState({ pages: pages });
  }

  render() {
    const { currentPage, pages, displayNum } = this.state;
    const { history } = this.props;

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
            법안 처리 현황
          </span>
        </div>
        <div>
          {this.billList.map((bill, idx) => {
            if (
              idx < displayNum * (currentPage - 1) ||
              idx >= displayNum * currentPage
            )
              return null;
            else
              return (
                <div key={idx} className="bill-processing-status-box">
                  <div className="bill-processing-status-date">{bill.date}</div>
                  <div className="bill-processing-status-contents">
                    {bill.contents}
                  </div>
                  <div
                    className="bill-processing-status-link"
                    onClick={() => history.push("/Bill?id=" + bill.billId)}
                  >
                    <i
                      className="bi bi-arrow-right-circle"
                      style={{
                        color: "#4F0D92",
                        fontSize: "24px",
                      }}
                    ></i>
                  </div>
                </div>
              );
          })}
        </div>
        <div>
          <div className="bill-processing-status-footer">
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

export default BillProcessingStatus;
