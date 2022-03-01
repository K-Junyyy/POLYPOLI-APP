import React, { Component } from "react";
import PropTypes from "prop-types";
import StackedBarChart from "./StackedBarChart";

class StackedBarChartWithLegend extends Component {
  render() {
    const { width, height, fontSize, chartData, percentageEnable } = this.props;
    const colorList = [
      "#723DA8",
      "#FF5353",
      "#4CAF33",
      "#56CCF2",
      "#F2C94C",
      "#C7C8CE",
      "#FF9797",
      "#008DBA",
      "#E76DE2",
      "#FFBC8B",
      "#A49618",
      "#F5FF83",
      "#4BE3AD",
      "#929292",
      "#EBA9CD",
      "#AF90D8",
      "#92B7FF",
      "#FFCFCF",
      "#CFEEFF",
      "#7B90FF",
    ];

    return (
      <div>
        <StackedBarChart
          width={width}
          height={height}
          fontSize={fontSize}
          chartData={chartData}
          percentageEnable={percentageEnable}
        />
        <div
          className="stacked-bar-chart-legend"
          style={{
            display: "grid",
            grid: "subgrid",
            marginTop: "20px",
            gridTemplateColumns: "0.4fr 0.4fr",
            gridTemplateRows: "1fr 1fr 1fr 1fr",
          }}
        >
          {chartData.map((data, idx) => (
            <div style={{ display: "flex" }} key={idx}>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  margin: "3px",
                  borderRadius: "50%",
                  backgroundColor: colorList[idx],
                }}
              />
              {data.key}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

StackedBarChartWithLegend.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  chartData: PropTypes.array,
  percentageEnable: PropTypes.bool,
};

export default StackedBarChartWithLegend;
