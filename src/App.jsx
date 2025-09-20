import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premiun from "./components/Premiun";
import Chat from "./components/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

function App() {
  return (
    <Provider store={appStore}>
      <Loader/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route  element={<ProtectedRoute><Body/></ProtectedRoute>}>
          {/* <Route path="/" element={<Body/>}> */}
            <Route path="/" element={<Feed/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/premium" element={<Premiun/>}/>
            <Route path="/chat/:targetUserId" element={<Chat/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
