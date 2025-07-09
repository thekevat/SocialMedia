import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/chat";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isTokenValid } from "./utils/auth";
import { io } from "socket.io-client";
import { SocketContext } from "./context/SocketContext";
import { OnlineUsersContext } from "./context/onlineUsersContext";

function App() {
  const socket = useRef(null);
  const [socketReady, setSocketReady] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.authReducer.authData);
  const user = authData?.user;
  const token = authData?.token;
  const isAuthenticated = token && isTokenValid(token);

  // Connect to socket
  useEffect(() => {
    if (isAuthenticated && !socket.current) {
      socket.current = io("https://socialmedia-socket-vza5.onrender.com");

      socket.current.on("connect", () => {
        console.log("✅ Socket connected:", socket.current.id);
        setSocketReady(true);
      });

      socket.current.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        setSocketReady(false);
        console.log("🔌 Socket disconnected");
      }
    };
  }, [isAuthenticated]);

  // Add user & get online users
  useEffect(() => {
    if (!socket.current || !socketReady || !user?._id) return;

    socket.current.emit("add-new-user", user._id);
    socket.current.emit("get-online-users");

    const handleGetUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.current.on("get-users", handleGetUsers);

    return () => {
      if (socket.current) {
        socket.current.off("get-users", handleGetUsers);
      }
    };
  }, [socketReady, user]);

  // Follow/unfollow updates
  useEffect(() => {
    if (!socket.current || !user?._id) return;

    const handleUpdateFollowers = ({ type, userId }) => {
      try {
        if (type === "follow") {
          dispatch({ type: "RECEIVED_FOLLOW", data: userId });
        } else if (type === "unfollow") {
          dispatch({ type: "RECEIVED_UNFOLLOW", data: userId });
        } else {
          console.warn("⚠️ Unknown follow event type:", type);
        }
      } catch (err) {
        console.error("❌ Error in handleUpdateFollowers:", err);
      }
    };

    socket.current.on("update-followers", handleUpdateFollowers);

    return () => {
      if (socket.current) {
        socket.current.off("update-followers", handleUpdateFollowers);
      }
    };
  }, [user, dispatch]);

  // New post received
  useEffect(() => {
    if (!socket.current || !user?._id) return;

    const handleReceivePost = (post) => {
      try {
        if (!post || !post.userId) {
          console.warn("⚠️ Invalid post received via socket:", post);
          return;
        }

        if (post.userId === user._id) return; // skip own posts

        if (user.following?.includes(post.userId)) {
          console.log("📥 New post from followed user:", post);
          dispatch({ type: "ADD_NEW_POST_TO_TIMELINE", payload: post });
        }
      } catch (err) {
        console.error("❌ Error in handleReceivePost:", err);
      }
    };

    socket.current.on("receive-post", handleReceivePost);

    return () => {
      if (socket.current) {
        socket.current.off("receive-post", handleReceivePost);
      }
    };
  }, [user, dispatch]);

  if (isAuthenticated && !socketReady) {
    return <div>Loading socket...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>
      <OnlineUsersContext.Provider value={onlineUsers}>
        <div className="App">
          <div className="blur" style={{ top: "-18%", right: "0" }}></div>
          <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to="/home" /> : <Auth />}
            />
            <Route
              path="/profile/:id"
              element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat /> : <Navigate to="/auth" />}
            />
          </Routes>
        </div>
      </OnlineUsersContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
