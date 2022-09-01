import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPages from "./pages/LandingPages";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/useContext";
import { API } from "./config/api";
import { setAuthToken } from "./config/api";
import DetailProduct from "./pages/DetailProduct";
import Profile from "./pages/Profile";

//init token on axios evry time the app refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/transaction");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/detail-product/:id" element={<DetailProduct />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
