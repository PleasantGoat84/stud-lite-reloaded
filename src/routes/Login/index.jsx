import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { SSOUrl } from "../../const";

import lhIcon from "../../assets/lh.svg";

const Login = ({ user, setUser, loggedIn, setLoggedIn }) => {
  const history = useHistory();

  useEffect(() => {
    if (loggedIn && user) {
      history.push("/home");
    }
  });

  const jumpToSSO = () => {
    window.location.href = SSOUrl;
  };

  return (
    <div className="login flex flex-col flex-grow items-center justify-center pb-16">
      <div className="login-card flex flex-col items-center w-72 bg-white p-4 rounded-md shadow">
        <h1 className="text-2xl font-medium mb-4">進入 StudLite</h1>
        <h2>使用以下方式</h2>
        <div className="login-btn-container flex flex-col flex-grow">
          <button onClick={jumpToSSO}>
            <img
              src={lhIcon}
              alt="login with louhau account"
              className="btn-icon"
              id="lh-icon"
            />
            勞校中學帳號
          </button>
          <button disabled>更多登入方式開發中</button>
        </div>
        <p className="muted-text">
          使用以上登入方式即表示閣下已同意
          <Link to="/">使用條款</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
