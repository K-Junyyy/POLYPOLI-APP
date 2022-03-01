import React, { Component } from "react";
import CongressmanAPI from "../api/CongressmanAPI.js";
import "./Notification.css";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNotifications: [
        {
          congressmanId: 475,
          congressmanName: "홍준표",
          profileImg: "http://www.assembly.go.kr/photo/9771145.jpg",
          message: "내일이 투표일이라면 홍준표 국회의원을 다시 뽑을 건가요?",
          date: "2월 3일",
        },
        {
          congressmanId: 475,
          congressmanName: "홍준표",
          profileImg: "http://www.assembly.go.kr/photo/9771145.jpg",
          message: "홍준표 국회의원이 법안을 발의했습니다.",
          date: "1월 25일",
        },
        {
          congressmanId: 2905,
          congressmanName: "황희",
          profileImg: "http://www.assembly.go.kr/photo/9770936.jpg",
          message:
            "황희 국회의원이 	국가시범스마트도시 조성 및 지원에 관한 특별법안(황희의원 등...",
          date: "1월 11일",
        },
      ],
      confirmedNotifications: [
        {
          congressmanId: 102,
          congressmanName: "심상정",
          profileImg: "http://www.assembly.go.kr/photo/9770869.jpg",
          message:
            "심상정 국회의원이 생활물류서비스산업발전법 일부개정법률안(심상정의원등 11...",
          date: "1월 23일",
        },
      ],
    };
  }

  componentDidMount() {
    // CongressmanAPI.getCongressman(match.params.id).then((response) => {
    //   this.setState({
    //     congressman_profile: response.data,
    //   });
    // });
  }

  render() {
    const { newNotifications, confirmedNotifications } = this.state;

    // const onClick = () => {
    //   this.setState({
    //     newNotifications: newNotifications.concat({
    //       congressmanId: 3051,
    //       congressmanName: "고민정",
    //       profileImg: "http://www.assembly.go.kr/photo/9771109.jpg",
    //       message: "테스트 알림",
    //       date: "2월 11일",
    //     }),
    //   });
    // };

    return (
      <div style={{ paddingBottom: "75.5px" }}>
        {/* <button className="test-btn" onClick={onClick}>
          add notification
        </button> */}
        <div className="notification-new-title">새로운 알림</div>

        {newNotifications.map((item, idx) => (
          <div className="notification-box" key={idx}>
            <div className="notification-img-box">
              <img src={item.profileImg} alt="profile" />
            </div>
            <div className="notification-msg-box">
              <div className="notification-msg ellipsis">{item.message}</div>
              <div className="notification-date">{item.date}</div>
            </div>
          </div>
        ))}

        <div className="notification-confirmed-title">확인한 알림</div>
        {confirmedNotifications.map((item, idx) => (
          <div className="notification-box" key={idx}>
            <div className="notification-img-box">
              <img src={item.profileImg} alt="profile" />
            </div>
            <div className="notification-msg-box">
              <div className="notification-msg ellipsis">{item.message}</div>
              <div className="notification-date">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
