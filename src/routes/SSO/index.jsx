import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

import api from "../../api";

function SSO({ setUser, setLoggedIn }) {
  const history = useHistory();

  useEffect(() => {
    const mo = window.location.search.match(/t=([^&]+)/);

    if (mo && mo[1]) {
      const token = mo[1];
      localStorage.setItem("token", token);

      const decoded = jwt.decode(token);
      console.debug(decoded);

      const fetchUser = async () => {
        const res = await api.get("user");
        setUser(res.data);
        setLoggedIn(true);
        history.push("/home");
      };

      fetchUser();
    } else {
      history.goBack();
    }
  }, [history, setUser, setLoggedIn]);

  return <div></div>;
}

export default SSO;
