import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats, getCurrentUser } from "./services/apiChatIO";
import { startLoading, stopLoading } from "./features/userSlice";
import AuthRoute from "./components/AuthRoute";
import { loginAndJoinSocket } from "./features/actions";
import { setChats } from "./features/chatsSlice";
import PageNotFound from "./components/PageNotFound";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) return; // Prevents loading state if no token

    const fetchUser = async () => {
      try {
        dispatch(startLoading());

        const data = await getCurrentUser(token);

        if (data.status === "success") {
          dispatch(loginAndJoinSocket(data.user));
          // dispatch(login(data.user));
        } else {
          // Optional: handle error status
          console.warn("Auto-login failed", data.message);
        }
      } catch (err) {
        console.error("Auto-login error:", err.message);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchUser();
  }, [token, dispatch]);

  useEffect(() => {
    (async function () {
      const data = await getChats();
      if (data.status === "success") {
        dispatch(setChats(data.chats));
      }
    })();
  }, [isAuthenticated, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/auth",
      element: (
        <AuthRoute>
          <AuthLayout />
        </AuthRoute>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
