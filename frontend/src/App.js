import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Auth from "./pages/authenticate/Auth";
import Activate from "./pages/activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import Loader from "./components/shared/Loader/Loader";
import {useLoadingWithRefresh} from "./Hooks/useLoading.js";
import Room from "./pages/singleRoom/Room.jsx";

function App() {
  const {loading}=useLoadingWithRefresh();
  return loading?(<Loader message={"Loading, please wait..."}/>):(
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<GuestRoute><Home /></GuestRoute>} />
        <Route path="/authenticate" element={<GuestRoute><Auth /></GuestRoute>} />
        <Route path="/activate" element={<SemiProtected><Activate /></SemiProtected>} />
        <Route path="/rooms" element={<Protected><Rooms /></Protected>} />
        <Route path="/room/:id" element={<Protected><Room /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtected = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? <Navigate to="/" /> : (!user.activated ? children : <Navigate to="/rooms" />);
};

const Protected = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? <Navigate to="/" /> : (user.activated ? children:<Navigate to="/activate" /> );
};

export default App;
