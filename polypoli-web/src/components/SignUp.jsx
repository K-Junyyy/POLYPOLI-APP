import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./SignUp.css";

import profile_icon_default from "../images/profile_icon_default.svg";
import profile_icon_red from "../images/profile_icon_red.svg";
import profile_icon_skyblue from "../images/profile_icon_skyblue.svg";
import profile_icon_orange from "../images/profile_icon_orange.svg";
import profile_icon_yellow from "../images/profile_icon_yellow.svg";
import profile_icon_green from "../images/profile_icon_green.svg";

import raw1 from "../TermsOfService/이용약관동의.txt";
import raw2 from "../TermsOfService/개인정보수집및이용동의.txt";
import raw3 from "../TermsOfService/위치정보수집및이용동의.txt";

import UserAPI from "../api/UserAPI.js";
import RegionListAPI from "../api/RegionListAPI.js";
import CongressmanAPI from "../api/CongressmanAPI.js";

import PhoneNumberAuthentication from "./PhoneNumberAuthentication";
import Modal from "./Modal";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      type: "signUp",
      title: "이용약관 동의",
      guidanceText: "Polypoli 서비스 이용약관에\n동의해주세요.",
      /* 회원가입 정보 */
      userKey: -1,
      userId: "",
      userPassword: "",
      userPhoneNumber: "",
      userName: "",
      userArea: "",
      userRegion: "",
      regionCongressmanId: 0,
      userStamp: 0,
      userGender: "",
      userYearOfBirth: "",
      userFollowings: "",
      userImg: 0,
      /* 이용약관 */
      termsOfServiceTitle: [
        "만 14세 이상입니다",
        "[필수] 이용약관 동의",
        "[필수] 개인정보 수집 및 이용 동의",
        "[필수] 위치정보 수집 및 이용 동의",
      ],
      termsOfServiceDescription: ["", "", "", ""],
      termsOfServiceModal: false,
      termsOfServiceModalTitle: "",
      termsOfServiceModalDescription: "",
      agreeCheckAll: false,
      agreeCheck: [false, false, false, false],
      /* 휴대폰 번호 인증 */
      accountAlreadyExist: false,
      /* 아이디 생성 */
      checkId: false,
      idErrorMessage: "",
      /* 비밀번호 생성 */
      password1: "",
      password2: "",
      showOrHide: false,
      checkPassword: false,
      checkPasswordEqual: true,
      passwordErrorMessage: "비밀번호가 일치하지 않습니다.",
      /* 내지역 설정 */
      regionList: [],
      searchWord: "",
      isEmptySearchWord: true,
      area: "",
      region: "",
      city: "",
      electoralDistrict: "",
      congressmanId: "",
      congressmanName: "",
      congressmanParty: "",
      congressmanImg: "",
      /* 프로필 설정 */
      profileImg: profile_icon_default,
      isEmptyProfileInputs: true,
      isUserNameDuplicate: false,
    };
    this.areaList = [
      { id: "강원도", value: "강원" },
      { id: "경기도", value: "경기" },
      { id: "경상남도", value: "경남" },
      { id: "경상북도", value: "경북" },
      { id: "광주광역시", value: "광주" },
      { id: "대구광역시", value: "대구" },
      { id: "대전광역시", value: "대전" },
      { id: "부산광역시", value: "부산" },
      { id: "서울특별시", value: "서울" },
      { id: "세종특별자치시", value: "세종" },
      { id: "울산광역시", value: "울산" },
      { id: "인천광역시", value: "인천" },
      { id: "전라남도", value: "전남" },
      { id: "전라북도", value: "전북" },
      { id: "제주특별자치도", value: "제주" },
      { id: "충청남도", value: "충남" },
      { id: "충청북도", value: "충북" },
    ];
    this.yearList = [];
    this.imgList = [
      profile_icon_default,
      profile_icon_red,
      profile_icon_skyblue,
      profile_icon_orange,
      profile_icon_yellow,
      profile_icon_green,
    ];
  }

  onClickNext = (progress) => {
    const { history } = this.props;

    if (progress === 0) {
      history.push("/Login");
    } else {
      this.setState({ progress: progress });
    }
    switch (progress) {
      case 1:
        this.setState({
          title: "이용약관 동의",
          guidanceText: "Polypoli 서비스 이용약관에\n동의해주세요.",
        });
        fetch(raw1)
          .then((r) => r.text())
          .then((text) => {
            const decription = [...this.state.termsOfServiceDescription];
            decription[1] = text;
            this.setState({ termsOfServiceDescription: decription });
          });
        fetch(raw2)
          .then((r) => r.text())
          .then((text) => {
            const decription = [...this.state.termsOfServiceDescription];
            decription[2] = text;
            this.setState({ termsOfServiceDescription: decription });
          });
        fetch(raw3)
          .then((r) => r.text())
          .then((text) => {
            const decription = [...this.state.termsOfServiceDescription];
            decription[3] = text;
            this.setState({ termsOfServiceDescription: decription });
          });
        break;
      case 2:
        this.setState({
          title: "휴대폰 번호 인증",
          guidanceText:
            "Polypoli 회원가입을 위해\n휴대폰 인증을 진행해 주세요.",
        });
        break;
      case 3:
        this.setState({
          title: "아이디 생성",
          guidanceText:
            "Polypoli 계정 로그인에 사용할\n아이디를 만들어 주세요.",
        });
        break;
      case 4:
        this.setState({
          title: "비밀번호 생성",
          guidanceText:
            "Polypoli 계정 로그인에 사용할\n비밀번호를 만들어 주세요.",
        });
        break;
      case 5:
        this.setState({
          title: "회원가입 완료",
          guidanceText: "회원가입이 완료되었습니다.",
        });
        break;
      case 6:
        this.setState({
          title: "내지역 설정",
        });
        const { regionList } = this.state;
        RegionListAPI.getRegionList().then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            const city = response.data[i].city;
            const town = response.data[i].town;
            const townShip = response.data[i].townShip;
            const electoralDistrict = response.data[i].electoralDistrict;
            const address = city + " " + town + " " + townShip;
            regionList.push([address, electoralDistrict]);
          }
          this.setState({
            ...this.state,
            regionList: regionList,
          });
        });
        break;
      case 7:
        this.setState({
          title: "프로필 설정",
        });
        const date = new Date();
        const yyyy = date.getFullYear();

        // 만 13세부터 1901년생까지
        for (let year = yyyy - 13; year >= 1901; year--) {
          this.yearList.push({ value: year });
        }
        break;

      default:
        break;
    }
  };

  componentDidMount() {
    const { progress, type } = this.props.location.state;
    const userKey = this.props.userData.userKey;
    this.setState({
      userKey: userKey,
      progress: progress,
      type: type,
    });

    // 마이페이지 - 프로필설정 기존 데이터 불러오기
    if (userKey !== -1 && progress === 7) {
      UserAPI.getUser(userKey).then((response) => {
        this.setState({
          userArea: response.data.userArea,
          userImg: response.data.userImg,
          profileImg: this.imgList[response.data.userImg],
          userName: response.data.userName,
          userYearOfBirth: response.data.userYearOfBirth,
          userGender: response.data.userGender,
        });
      });
    }

    this.onClickNext(progress);
  }

  render() {
    const {
      progress,
      type,
      title,
      guidanceText,
      /* 회원가입 정보 */
      userKey,
      userId,
      userPassword,
      userPhoneNumber,
      userName,
      userArea,
      userRegion,
      regionCongressmanId,
      userStamp,
      userGender,
      userYearOfBirth,
      userFollowings,
      userImg,
      /* 이용약관 */
      termsOfServiceTitle,
      termsOfServiceDescription,
      termsOfServiceModal,
      termsOfServiceModalTitle,
      termsOfServiceModalDescription,
      agreeCheckAll,
      agreeCheck,
      /* 휴대폰 번호 인증 */
      accountAlreadyExist,
      /* 아이디 생성 */
      checkId,
      idErrorMessage,
      /* 비밀번호 생성 */
      password1,
      password2,
      showOrHide,
      checkPassword,
      checkPasswordEqual,
      passwordErrorMessage,
      /* 내지역 설정 */
      regionList,
      searchWord,
      isEmptySearchWord,
      area,
      region,
      city,
      electoralDistrict,
      congressmanId,
      congressmanName,
      congressmanParty,
      congressmanImg,
      /* 프로필 설정 */
      profileImg,
      isEmptyProfileInputs,
      isUserNameDuplicate,
    } = this.state;

    const { history } = this.props;

    // 모두 동의하기 체크
    const onClickAgreeCheckAll = () => {
      this.setState({
        agreeCheckAll: !agreeCheckAll,
        agreeCheck: [
          !agreeCheckAll,
          !agreeCheckAll,
          !agreeCheckAll,
          !agreeCheckAll,
        ],
      });
    };

    // 동의하기 체크
    const onClickAgreeCheck = (idx) => {
      const newAgreeCheck = [...agreeCheck];
      newAgreeCheck[idx] = !newAgreeCheck[idx];
      this.setState({
        agreeCheck: newAgreeCheck,
      });

      if (newAgreeCheck.every((check) => check === true)) {
        this.setState({
          agreeCheckAll: true,
        });
      } else {
        this.setState({
          agreeCheckAll: false,
        });
      }
    };

    // 이용약관 자세히보기
    const onClickTermsOfServiceModal = (idx) => {
      this.setState({
        termsOfServiceModal: true,
        termsOfServiceModalTitle: termsOfServiceTitle[idx],
        termsOfServiceModalDescription: termsOfServiceDescription[idx],
      });
    };

    // 이용약관 자세히보기닫기
    const onCloseTermsOfServiceModal = () => {
      this.setState({
        termsOfServiceModal: false,
      });
    };

    // 휴대폰 번호 인증 확인
    const isAuthenticated = (check, userPhoneNumber) => {
      if (check) {
        UserAPI.getUserByPhoneNumber(userPhoneNumber).then((response) => {
          if (response.data === "") {
            alert("인증이 완료되었습니다.");
            this.setState({ userPhoneNumber: userPhoneNumber });
            this.onClickNext(3);
          } else {
            this.setState({ accountAlreadyExist: true });
          }
        });
      }
    };

    // "이미 가입된 계정이 존재, 로그인? 모달창 확인"
    const confirmModal = () => {
      this.setState({ accountAlreadyExist: false });
      history.push("/Login");
    };
    // "이미 가입된 계정이 존재, 로그인? 모달창 취소"
    const cancleModal = () => {
      this.setState({ accountAlreadyExist: false });
    };

    // 아이디 state 변경
    const onChangeId = (e) => {
      const targetId = e.target.value;
      this.setState({ userId: targetId });

      // 6~20자 영문, 숫자조합 아이디 체크 정규식
      var regExp = /^[0-9a-zA-Z]{6,20}$/;
      this.setState({ checkId: regExp.test(targetId) });
    };

    // 사용가능한 아이디 인지
    const checkUserId = () => {
      UserAPI.checkUserId(userId).then((response) => {
        // 사용 가능한 아이디
        if (response.data) {
          this.onClickNext(4);
        }
        // 이미 사용중인 아이디
        else {
          this.setState({
            checkId: false,
            idErrorMessage: "이미 사용중인 아이디입니다.",
          });
        }
      });
    };

    // 패스워드1 state
    const onChangePassword1 = (e) => {
      const targetPassword = e.target.value;
      // 12~40자 영문 or 숫자 or 일부특수문자 비밀번호 체크 정규식
      var regExp = /^[0-9a-zA-Z~!@#$%^&*]{12,40}$/;

      if (targetPassword.length >= 12) {
        this.setState({
          ...this.state,
          password1: targetPassword,
          checkPassword: regExp.test(targetPassword),
        });
      } else {
        this.setState({
          ...this.state,
          password1: targetPassword,
          checkPassword: regExp.test(targetPassword),
        });
      }
    };

    // 패스워드2 state
    const onChangePassword2 = (e) => {
      const targetPassword = e.target.value;
      if (password1 === targetPassword) {
        this.setState({
          ...this.state,
          password2: targetPassword,
          checkPasswordEqual: true,
        });
      } else {
        this.setState({
          ...this.state,
          password2: targetPassword,
          checkPasswordEqual: false,
        });
      }
    };

    // 패스워드 표시 or 숨김
    const onToggleShowOrHidePassword = () => {
      this.setState({ ...this.state, showOrHide: !showOrHide });
    };

    // 유저 생성
    const createUser = () => {
      const userPassword = password1;
      this.setState({ userPassword: userPassword });
      UserAPI.createUser(userId, userPassword, userPhoneNumber).then(
        (response) => {
          this.setState({ userKey: response.data.userKey });
        }
      );
      this.onClickNext(5);
    };

    // 검색어 state
    const onChangeSearchWord = (e) => {
      const str = e.target.value;
      if (str === "") {
        this.setState({ searchWord: str, isEmptySearchWord: true });
      } else {
        this.setState({ searchWord: str, isEmptySearchWord: false });
      }
    };

    // 검색결과 지역 클릭
    const onClickArea = (data) => {
      const area = data[0];
      const city = this.areaList.find(
        (obj) => obj.id === area.split(" ")[0]
      ).value;
      const electoralDistrict = data[1];

      const region = city + " " + electoralDistrict;

      CongressmanAPI.getCongressmanByRegion(region).then((response) => {
        this.setState({
          area: area,
          region: region,
          city: city,
          electoralDistrict: electoralDistrict,
          congressmanId: response.data.congressmanId,
          congressmanName: response.data.name,
          congressmanParty: response.data.party,
          congressmanImg: response.data.profileImage,
        });
      });
    };

    // 지역 설정
    const setRegion = () => {
      this.setState({
        userArea: area,
        userRegion: region,
        regionCongressmanId: congressmanId,
      });
      this.onClickNext(7);
    };

    // 마이페이지 내지역 설정
    const updateUserRegion = () => {
      const userRegionData = {
        userKey: userKey,
        userArea: area,
        userRegion: region,
        regionCongressmanId: congressmanId,
      };
      UserAPI.updateUserRegion(userRegionData);
      this.props.updateUserRegion(userRegionData);
      alert("내 지역 변경이 완료되었습니다.");
      history.push("./MyPage");
    };

    // 프로필 state
    const onChangeProfileInputs = (e) => {
      const { value, name } = e.target;
      this.setState(
        {
          ...this.state,
          [name]: value,
        },
        () => {
          if (
            this.state.userName !== "" &&
            this.state.userYearOfBirth !== "" &&
            this.state.userGender !== ""
          ) {
            this.setState({ isEmptyProfileInputs: false });
          } else {
            this.setState({ isEmptyProfileInputs: true });
          }
        }
      );
    };

    // 프로필 이미지 카운터
    const imgCounter = (x) => {
      let counter = (userImg + x + 6) % 6;
      this.setState({
        userImg: counter,
        profileImg: this.imgList[counter],
      });

      if (
        this.state.userName !== "" &&
        this.state.userYearOfBirth !== "" &&
        this.state.userGender !== ""
      ) {
        this.setState({ isEmptyProfileInputs: false });
      } else {
        this.setState({ isEmptyProfileInputs: true });
      }
    };

    // 프로필 설정
    const setUserRegionAndProfile = () => {
      UserAPI.getUserByUserName(userName).then((response) => {
        // 사용가능한 별명(userName)이거나
        if (response.data === "") {
          const userRegionAndProfileData = {
            userKey: userKey,
            userArea: userArea,
            userRegion: userRegion,
            regionCongressmanId: congressmanId,
            userImg: userImg,
            userName: userName,
            userYearOfBirth: userYearOfBirth,
            userGender: userGender,
          };
          UserAPI.setUserRegionAndProfile(userRegionAndProfileData);
          alert("프로필 설정이 완료되었습니다.");

          UserAPI.getUser(userKey).then((response) => {
            const userData = {
              userKey: response.data.userKey,
              userId: response.data.userId,
              userPhoneNumber: response.data.userPhoneNumber,
              userName: response.data.userName,
              userArea: response.data.userArea,
              userRegion: response.data.userRegion,
              regionCongressmanId: response.data.regionCongressmanId,
              userStamp: response.data.userStamp,
              userGender: response.data.userGender,
              userYearOfBirth: response.data.userYearOfBirth,
              userFollowings: response.data.userFollowings,
              userImg: response.data.userImg,
            };
            // store에 유저 정보 저장
            this.props.login(userData);
            history.push("/Feed");
          });
        }
        // 이미 사용중인 별명입니다.
        else {
          this.setState({ isUserNameDuplicate: true });
        }
      });
    };

    // 마이페이지 프로필 설정
    const updateUserProfile = () => {
      const userProfileData = {
        userKey: userKey,
        userName: userName,
        userGender: userGender,
        userYearOfBirth: userYearOfBirth,
        userFollowings: userFollowings,
        userImg: userImg,
      };
      UserAPI.updateUserProfile(userProfileData);
      this.props.updateUserProfile(userProfileData);
      alert("프로필 변경이 완료되었습니다.");
      history.push("./MyPage");
    };

    return (
      <div className="sign-up-wrapper">
        {/* 헤드부분 */}
        <div className="sign-up-head">
          <div>
            <i
              className="bi bi-arrow-left"
              // 회원가입 시 뒤로가기버튼은 추후 고려
              style={{ visibility: type !== "myPage" ? "hidden" : "" }}
              onClick={
                type !== "myPage"
                  ? () => this.onClickNext(progress - 1)
                  : () => {
                      history.push("/MyPage");
                    }
              }
            ></i>
          </div>
          <div>{title}</div>
          <div>{/* blank div */}</div>
        </div>

        {/* 진행상황 바 */}
        <div
          className="sign-up-progress-bar"
          style={{ display: progress === 5 || type === "myPage" ? "none" : "" }}
        >
          <div
            className="sign-up-progress"
            style={{
              width: progress < 5 ? progress * 20 : (progress - 5) * 40,
            }}
          ></div>
        </div>

        {/* 안내 텍스트 */}
        <div
          className="sign-up-guidance-text"
          style={{ display: progress >= 5 ? "none" : "" }}
        >
          {guidanceText.split("\n").map((text, idx) => (
            <div key={idx}>{text}</div>
          ))}
        </div>

        {/* 이용약관 동의 */}
        {progress === 1 && (
          <div>
            <div className="sign-up-agree-check-all">
              <i
                className="bi bi-check-square-fill"
                style={{
                  color: this.state.agreeCheckAll ? "#4F0D92" : "#C7C8CE",
                }}
                onClick={onClickAgreeCheckAll}
              ></i>
              <div>모두 동의 (선택 정보 포함)</div>
            </div>
            <div className="sign-up-bar"></div>

            <div className="sign-up-check-list">
              {termsOfServiceTitle.map((text, idx) => (
                <div key={idx} className="sign-up-check-list-item">
                  <i
                    className="bi bi-check-lg check-icon"
                    style={{
                      color: agreeCheck[idx] ? "#4F0D92" : "#C7C8CE",
                    }}
                    onClick={() => onClickAgreeCheck(idx)}
                  ></i>
                  <div className="sign-up-check-list-text">{text}</div>
                  <i
                    className="bi bi-chevron-right"
                    style={{ display: idx === 0 ? "none" : "" }}
                    onClick={() => onClickTermsOfServiceModal(idx)}
                  ></i>
                </div>
              ))}
            </div>
            <button
              className="sign-up-btn"
              style={{
                backgroundColor: agreeCheckAll ? "#4F0D92" : "#C7C8CE",
              }}
              onClick={() => this.onClickNext(2)}
              disabled={!agreeCheckAll}
            >
              다음
            </button>
          </div>
        )}

        {/* 이용약관 자세히보기 모달창 */}
        {termsOfServiceModal && (
          <div className="sign-up-tos-modal">
            <i className="bi bi-x" onClick={onCloseTermsOfServiceModal}></i>
            <div className="sign-up-tos-title">{termsOfServiceModalTitle}</div>
            <div className="sign-up-tos-bar"></div>
            <div className="sign-up-tos-description">
              {termsOfServiceModalDescription}
            </div>
          </div>
        )}

        {/* 휴대폰 번호 인증 */}
        {progress === 2 && (
          <PhoneNumberAuthentication
            isAuthenticated={isAuthenticated}
          ></PhoneNumberAuthentication>
        )}

        {/* 휴대폰 번호 인증 모달창(이미 가입된 계정이 있습니다.) */}
        {accountAlreadyExist && (
          <Modal
            message={
              "동일한 번호로 가입된 계정이 있습니다.\n로그인하시겠습니까?"
            }
            type={"cancle and confirm"}
            point={"confirm"}
            onClickConfirm={() => confirmModal("confirm")}
            onClickCancle={() => cancleModal()}
          ></Modal>
        )}

        {/* 아이디 생성 */}
        {progress === 3 && (
          <div className="sign-up-create-id-box">
            <div className="sign-up-create-id-input-box">
              <input
                name="id"
                value={userId}
                placeholder="아이디 입력 (6~20자, 특수문자 제외)"
                onChange={onChangeId}
              ></input>
            </div>
            <div
              className="sign-up-create-id-error"
              style={{
                visibility: !checkId ? "visible" : "hidden",
              }}
            >
              {idErrorMessage}
            </div>
            <button
              className="sign-up-btn"
              style={{
                cursor: checkId ? "pointer" : "",
                background: checkId ? "#4F0D92" : "#C7C8CE",
              }}
              disabled={!checkId}
              onClick={checkUserId}
            >
              다음
            </button>
          </div>
        )}

        {/* 비밀번호 생성 */}
        {progress === 4 && (
          <div className="sign-up-create-password-box">
            <div className="sign-up-create-password-input-box">
              <input
                type={showOrHide ? "text" : "password"}
                name="password1"
                value={password1}
                placeholder=" 비밀번호 입력"
                maxLength="40"
                onChange={onChangePassword1}
              ></input>
              <i
                className="bi bi-eye-fill"
                style={{
                  color: showOrHide ? "black" : "#C7C8CE",
                }}
                onClick={onToggleShowOrHidePassword}
              ></i>
            </div>
            <div
              className="sign-up-password-check"
              style={{
                color: checkPassword ? "#4F0D92" : "#ff2828",
              }}
            >
              12-40자 이내
              {checkPassword ? (
                <i className="bi bi-check-lg"></i>
              ) : (
                <i className="bi bi-x-lg"></i>
              )}
            </div>
            <div className="sign-up-create-password-input-box">
              <input
                type="password"
                name="password2"
                value={password2}
                placeholder="비밀번호 확인"
                maxLength="40"
                onChange={onChangePassword2}
              ></input>
            </div>
            <div
              className="sign-up-create-password-error"
              style={{
                visibility: checkPasswordEqual ? "hidden" : "visible",
              }}
            >
              {passwordErrorMessage}
            </div>
            <button
              className="sign-up-create-password-btn"
              style={{
                cursor:
                  password2 !== "" && checkPassword && checkPasswordEqual
                    ? "pointer"
                    : "",
                background:
                  password2 !== "" && checkPassword && checkPasswordEqual
                    ? "#4F0D92"
                    : "#C7C8CE",
              }}
              disabled={
                !(password2 !== "" && checkPassword && checkPasswordEqual)
              }
              onClick={createUser}
            >
              완료하기
            </button>
          </div>
        )}

        {/* 회원가입 완료 */}
        {progress === 5 && (
          <div>
            <div className="sign-up-complete-text">
              회원가입이 완료되었습니다.
            </div>
            <button className="sign-up-btn" onClick={() => this.onClickNext(6)}>
              시작하기
            </button>
          </div>
        )}

        {/* 내지역 설정 */}
        {progress === 6 && (
          <div className="sign-up-area-box">
            {/* 1. 지역 검색 */}
            <div style={{ display: area === "" ? "" : " none" }}>
              <div className="sign-up-area-text-box">
                <div>자신의 지역구 국회의원을 등록하기 위해</div>
                <div>
                  <span style={{ color: "#4F0D92", fontWeight: "500" }}>
                    본인의 주민등록상 주소
                  </span>
                  를 기준으로
                </div>
                <div>지역을 검색해주세요.</div>
              </div>
              <div className="sign-up-area-search-input-box">
                <i
                  className="bi bi-search"
                  style={{ margin: "0px 10px 0px 12px" }}
                ></i>
                <input
                  placeholder="동명(읍,면)으로 검색 (ex. 서초동)"
                  value={searchWord}
                  onChange={onChangeSearchWord}
                ></input>
              </div>
              <div
                className="sign-up-area-warning-msg"
                style={{
                  display: !isEmptySearchWord ? "none" : "",
                }}
              >
                지역 선택 이후에는 3개월 간 변경이 불가능합니다
              </div>

              <div
                className="sign-up-area-search-result"
                style={{
                  display: isEmptySearchWord ? "none" : "",
                }}
              >
                <div style={{ marginBottom: "30px", fontSize: "16px" }}>
                  '{searchWord}' 검색 결과
                </div>
                {regionList.map((item, key) => (
                  <div
                    key={key}
                    style={{
                      display: !item[0].includes(searchWord) && "none",
                      cursor: "pointer",
                    }}
                    onClick={() => onClickArea(item)}
                  >
                    <div style={{ margin: "15px 0px 15px 0px" }}>{item[0]}</div>
                    <div className="sign-up-area-search-result-bar"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* 2. 검색 결과 */}
            <div style={{ display: area === "" ? "none" : "" }}>
              <div className="sign-up-area-text-box">
                <div style={{ textAlign: "center" }}>'{area}'</div>
                <div>
                  지역 선택 이후에는
                  <span style={{ color: "#4F0D92", fontWeight: "500" }}>
                    {" 3개월 "}
                  </span>
                  간 변경이 불가합니다.
                </div>
                <div>지역 설정을 완료하시겠습니까?</div>
              </div>
              <div className="sign-up-area-constituency-member-box">
                <div className="sign-up-area-constituency-member-title">
                  내 지역 국회의원
                </div>
                <div className="sign-up-area-congressman-profile-box">
                  <div className="sign-up-area-congressman-profile-img-box">
                    <img
                      className="sign-up-area-congressman-profile-img"
                      src={congressmanImg}
                      alt="congressman"
                    />
                  </div>
                  <div className="sign-up-area-congressman-profile-content">
                    <div className="sign-up-area-congressman-profile-content-name">
                      {congressmanName}
                    </div>
                    <div className="sign-up-area-congressman-profile-content-info">
                      <div>{congressmanParty}</div>
                      <div>
                        {city} {electoralDistrict}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sign-up-area-confirm-btn-box">
                <button
                  className="sign-up-area-confirm-btn"
                  onClick={type === "myPage" ? updateUserRegion : setRegion}
                >
                  지역 설정하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 프로필 설정 */}
        {progress === 7 && (
          <div className="sign-up-profile-setting-wrapper">
            {/* 프로필 이미지 선택 */}
            <div className="sign-up-profile-setting-img-wrapper">
              <div className="sign-up-profile-setting-img-counter">
                <i
                  className="bi bi-chevron-left"
                  onClick={() => imgCounter(-1)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <img
                className="sign-up-profile-setting-img"
                src={profileImg}
                alt="Profile img"
              ></img>
              <div className="sign-up-profile-setting-img-counter">
                <i
                  className="bi bi-chevron-right"
                  onClick={() => imgCounter(1)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
            {/* 지역 선택 */}
            <div className="sign-up-profile-setting-item">
              <div className="sign-up-profile-setting-item-title">지역</div>

              <div className="sign-up-profile-setting-input-box">
                <input type="text" value={userArea} readOnly />
              </div>
            </div>
            <div className="sign-up-profile-setting-warning-msg-area">
              지역 선택 이후에는 3개월 간 변경이 불가능합니다.
            </div>
            {/* 별명 선택 */}
            <div className="sign-up-profile-setting-item">
              <div className="sign-up-profile-setting-item-title">별명</div>
              <div className="sign-up-profile-setting-input-box">
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  placeholder="별명을 입력하세요."
                  onChange={onChangeProfileInputs}
                />
              </div>
            </div>
            <div
              className="sign-up-profile-setting-warning-msg-user-name"
              style={{ visibility: isUserNameDuplicate ? "" : "hidden" }}
            >
              이미 사용중인 별명입니다.
            </div>
            {/* 나이 선택 */}
            <div
              className="sign-up-profile-setting-item"
              style={{ marginBottom: "49px" }}
            >
              <div className="sign-up-profile-setting-item-title">출생년도</div>
              <div className="sign-up-profile-setting-input-box">
                <select
                  name="userYearOfBirth"
                  onChange={onChangeProfileInputs}
                  key={userYearOfBirth}
                  defaultValue={userYearOfBirth ? userYearOfBirth : "default"}
                >
                  <option
                    value="default"
                    onChange={onChangeProfileInputs}
                    disabled
                  >
                    출생년도를 입력하세요
                  </option>
                  {this.yearList.map((item, idx) => (
                    <option
                      key={idx}
                      value={item.value}
                      onChange={onChangeProfileInputs}
                    >
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* 성별 선택 */}
            <div
              className="sign-up-profile-setting-item"
              style={{
                marginBottom: "49px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="sign-up-profile-setting-item-title">성별</div>
              <div className="sign-up-profile-setting-gender">
                <input
                  onChange={onChangeProfileInputs}
                  type="radio"
                  name="userGender"
                  value="man"
                  checked={userGender === "man"}
                />
                {"  남성"}
              </div>
              <div className="sign-up-profile-setting-gender">
                <input
                  onChange={onChangeProfileInputs}
                  type="radio"
                  name="userGender"
                  value="woman"
                  checked={userGender === "woman"}
                />
                {"  여성"}
              </div>
              <div> {/*blank div */}</div>
            </div>
            {/* 완료하기 */}
            <button
              className="sign-up-profile-setting-btn"
              style={{
                background: isEmptyProfileInputs ? "#C7C8CE" : "#4F0D92",
              }}
              disabled={isEmptyProfileInputs}
              onClick={
                type === "myPage" ? updateUserProfile : setUserRegionAndProfile
              }
            >
              완료하기
            </button>
          </div>
        )}
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
  return {
    login: (userData) => {
      dispatch(actions.login(userData));
    },
    updateUserRegion: (userRegionData) => {
      dispatch(actions.updateUserRegion(userRegionData));
    },
    updateUserProfile: (userProfileData) => {
      dispatch(actions.updateUserProfile(userProfileData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
