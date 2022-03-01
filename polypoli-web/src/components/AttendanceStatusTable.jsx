import React, { Component } from "react";
import "./AttendanceStatusTable.css";
import PropTypes from "prop-types";

class AttendanceStatusTable extends Component {
  constructor() {
    super();
  }

  render() {
    const { limit, data } = this.props;

    return (
      <div>
        <div>
          {data.map((attendance, idx) => {
            if (idx >= limit) return null;
            else
              return (
                <div key={idx} className="attendance-status-table-box">
                  <div className="attendance-status-table-date">
                    {attendance.date}
                  </div>
                  <div className="attendance-status-table-contents">
                    {attendance.contents}
                  </div>
                  <div
                    className="attendance-status-table"
                    style={{
                      color: attendance.attendance ? "#1F9B00" : "#FF2828",
                    }}
                  >
                    {attendance.attendance ? "출석" : "결석"}
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}

AttendanceStatusTable.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.array,
};

export default AttendanceStatusTable;
