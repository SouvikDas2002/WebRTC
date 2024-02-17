import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Auth from "./pages/authenticate/Auth";
import Activate from "./pages/activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
  
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Auth />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtected>
              <Activate />
            </SemiProtected>
          }
        />
        <Route
          path="/rooms"
          element={
            <Protected>
              <Rooms />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
const GuestRoute = ({ children }) => {
  const {isAuth}=useSelector((state)=>state.auth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};
const SemiProtected = ({ children }) => {
  const {user,isAuth}=useSelector((state)=>state.auth);
  return !isAuth ? (
    <navigate to="/" />
    ) : isAuth && !user.activated ? (
      children
      ) : (
        <Navigate to="/rooms" />
        );
      };
      const Protected = ({ children }) => {
  const {user,isAuth}=useSelector((state)=>state.auth);
  return !isAuth ? (
    <navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
};
// const GuestRoute=({children,...rest})=>{
//   console.log(rest);
//   return (
//     <Route {...rest}
//       render={({location})=>{
//        return isAuth?
//         (<Navigate to={
//           {
//             pathname:'/rooms',
//             state:{from:location}
//         }
//         }/>
//         ):(children)
//       }}>
//     </Route>
//   )
// }

export default App;
