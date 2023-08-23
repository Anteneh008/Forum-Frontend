import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import SignUp from "./pages/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SharedLayOut from "./pages/SharedLayout/SharedLayout";
import AskQuestion from "./AskQuestion/AskQuestion";
import QuestionPage from "./QuestionPage/QuestionPage";
import ResetPassword from "./ResetPassword/ResetPassword";
import ResetByNewPassword from "./ResetByNewPassword/ResetByNewPassword";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    try {
      let token = localStorage.getItem("auth-token");
      // check if token already exists in localStorage
      if (token === null) {
        //token not in localStorage then set auth token empty
        localStorage.setItem("auth-token", "");
        token = "";
      } else {
        // if token exists in localStorage then use auth to verify token and get user info
        const userRes = await axios.get("http://localhost:4001/api/users", {
          headers: { "x-token-auth": token },
        });

        // set global state with user info
        setUserData({
          token: token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      }
    } catch (error) {
      console.error("Error while checking login status:", error.message);
      // You can also set state here to handle the error, if needed
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayOut />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/reset" element={<ResetByNewPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
