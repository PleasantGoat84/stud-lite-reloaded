import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

function SSO({ setUser, setLoggedIn }) {
  const history = useHistory();

  useEffect(() => {
    const mo = window.location.search.match(/t=([^&]+)/);

    if (mo && mo[1]) {
      const token = mo[1];
      localStorage.setItem("token", token);

      const decoded = jwt.decode(token);
      console.debug(decoded);

      setLoggedIn(true);
      history.push("/home");
    } else {
      history.goBack();
    }
  }, [history, setUser, setLoggedIn]);

  return <div></div>;
}

export default SSO;
