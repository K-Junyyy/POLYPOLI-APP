import React, { Component } from "react";
import PropTypes from "prop-types";

class StackedBarChart extends Component {
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
    const absolutePosition = [];
    let restPercentage = 100.0;

    chartData.map((data) => {
      restPercentage -= parseFloat(data.value);
    });

    chartData.reduce((acc, cur) => {
      absolutePosition.push((parseFloat(acc) / 100) * parseFloat(width));
      return acc + cur.value;
    }, 0);

    return (
      <div style={{ width: width, fontSize: fontSize, fontWeight: 500 }}>
        {/* 14% 이하 퍼센티지 상단 표시 */}
        {percentageEnable && (
          <div
            style={{
              position: "relative",
              height: parseFloat(fontSize) * 2 + 2,
            }}
          >
            {chartData.map((data, idx) => {
              if (data.value < 14 && idx % 2 === 0)
                return (
                  <div
                    key={idx}
                    style={{
                      width: data.value + "%",
                      textAlign: "center",
                      lineHeight: height,
                      position: "absolute",
                      left: absolutePosition[idx],
                    }}
                  >
                    {data.value + "%"}
                  </div>
                );
            })}
          </div>
        )}
        {/* 14% 이하 퍼센티지 상단 수직선 */}
        {percentageEnable && (
          <div style={{ position: "relative", height: parseFloat(height) / 2 }}>
            {chartData.map((data, idx) => {
              if (data.value < 14 && idx % 2 === 0)
                return (
                  <div
                    key={idx}
                    style={{
                      height: parseFloat(height) / 2,
                      position: "absolute",
                      left:
                        absolutePosition[idx] +
                        ((parseFloat(data.value) / 100) * parseFloat(width)) /
                          2,
                      borderLeft: "1px solid #C7C8CE",
                    }}
                  />
                );
            })}
          </div>
        )}
        {/* Stacked Bar */}
        <div
          style={{
            display: "flex",
          }}
        >
          {chartData.map((data, idx) => (
            <div
              className="stacked-bar"
              key={idx}
              style={{
                width: data.value + "%",
                height: height,
                color: "white",
                backgroundColor: colorList[idx],
                textAlign: "center",
              }}
            >
              <span style={{ lineHeight: height }}>
                {percentageEnable && data.value >= 14 ? data.value + "%" : ""}
              </span>
            </div>
          ))}
          <div
            style={{
              width: restPercentage + "%",
              height: height,
              color: "white",
              backgroundColor: "#E1E6E8",
              textAlign: "center",
            }}
          />
        </div>
        {/* 14% 이하 퍼센티지 하단 수직선 */}
        {percentageEnable && (
          <div style={{ position: "relative", height: parseFloat(height) / 2 }}>
            {chartData.map((data, idx) => {
              if (data.value < 14 && idx % 2)
                return (
                  <div
                    key={idx}
                    style={{
                      height: parseFloat(height) / 2,
                      position: "absolute",
                      left:
                        absolutePosition[idx] +
                        ((parseFloat(data.value) / 100) * parseFloat(width)) /
                          2,
                      borderLeft: "1px solid #C7C8CE",
                    }}
                  />
                );
            })}
          </div>
        )}
        {/* 14% 이하 퍼센티지 하단 표시 */}
        {percentageEnable && (
          <div
            style={{
              position: "relative",
              height: parseFloat(fontSize) * 2 + 2,
            }}
          >
            {chartData.map((data, idx) => {
              if (data.value < 14 && idx % 2)
                return (
                  <span
                    key={idx}
                    style={{
                      width: data.value + "%",
                      textAlign: "center",
                      lineHeight: 1.1,
                      position: "absolute",
                      left: absolutePosition[idx],
                    }}
                  >
                    {data.value + "%"}
                  </span>
                );
            })}
          </div>
        )}
      </div>
    );
  }
}

StackedBarChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  chartData: PropTypes.array,
  percentageEnable: PropTypes.bool,
};

export default StackedBarChart;
