import axios from "axios";
import { useEffect, useState } from "react";

export const useLoginValidate = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/signin").then((response) => {
        if (response.data.loggedIn === true) {
          setUserData(response.data.user);
          sessionStorage.setItem('user_id', response.data.user.user_id);
        } else {
          setUserData({});
        }
        setLoading(false);
    });
  }, []);

  return { loading, userData };
};
