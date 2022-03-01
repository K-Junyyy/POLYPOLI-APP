import "./App.css";
import Routers from "./Router";
import Login from "./components/Login";

import { connect } from "react-redux";
import * as actions from "./redux/actions";

function App(userData) {
  console.log(userData);
  return (
    <div
      className="App"
      // vh = viewport height
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <Routers />
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
