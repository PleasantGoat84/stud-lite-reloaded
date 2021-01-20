import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

function SSO({ setUsername }) {
  const history = useHistory();

  useEffect(() => {
    const mo = window.location.search.match(/t=([^&]+)/);

    if (mo && mo[1]) {
      const token = mo[1];
      localStorage.setItem("token", token);
      setUsername(jwt.decode(token).user);
      history.push("/home");
    } else {
      history.goBack();
    }
  }, [history, setUsername]);

  return <div></div>;
}

export default SSO;
