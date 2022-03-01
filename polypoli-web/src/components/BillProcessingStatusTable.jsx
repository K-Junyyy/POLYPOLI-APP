import React, { Component } from "react";
import "./BillProcessingStatusTable.css";
import PropTypes from "prop-types";
import StackedBarChart from "./StackedBarChart";

class BillProcessingStatusTable extends Component {
  constructor(props) {
    super(props);
    this.billList = [
      {
        billId: 2107477,
        date: "2021 09-21",
        contents:
          "코로나바이러스감염증-19의 퇴치를 위한 특별조치법안(홍준표의원 등 17인)",
      },
      {
        billId: 2104078,
        date: "2021 09-21",
        contents: "대구통합신공항특별법안(홍준표의원 등 17인)",
      },
      {
        billId: 2104078,
        date: "2021 09-21",
        contents: "대구통합신공항특별법안(홍준표의원 등 17인)",
      },
      {
        billId: 2107477,
        date: "2021 09-21",
        contents:
          "코로나바이러스감염증-19의 퇴치를 위한 특별조치법안(홍준표의원 등 17인)",
      },
      {
        billId: 2113374,
        date: "2021 09-21",
        contents:
          "파산선고 등에 따른 결격조항 정비를 위한 외교통일위원회 소관 2개 법률 일부개정을 위한 법률안(박주민의원 등 11인)",
      },
      {
        billId: 2104078,
        date: "2021 09-21",
        contents: "대구통합신공항특별법안(홍준표의원 등 17인)",
      },
      {
        billId: 2113663,
        date: "2021 09-21",
        contents: "과학기술기본법 일부개정법률안(김상희의원 등 10인)",
      },
      {
        billId: 2113653,
        date: "2021 09-21",
        contents: "제대군인지원공단법안(신원식의원 등 28인)",
      },
    ];
  }

  render() {
    const { limit, history } = this.props;
    return (
      <div>
        <div>
          {this.billList.map((bill, idx) => {
            if (idx >= limit) return null;
            else
              return (
                <div className="bill-processing-status-table-box" key={idx}>
                  <div className="bill-processing-status-table-date">
                    {bill.date}
                  </div>
                  <div className="bill-processing-status-table-contents">
                    {bill.contents}
                  </div>
                  <div
                    className="bill-processing-status-table-link"
                    onClick={() => history.push("/Bill?id=" + bill.billId)}
                  >
                    <i
                      className="bi bi-arrow-right-circle"
                      style={{
                        color: "#4F0D92",
                        fontSize: "24px",
                      }}
                    />
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}

BillProcessingStatusTable.propTypes = {
  limit: PropTypes.number,
};

export default BillProcessingStatusTable;
