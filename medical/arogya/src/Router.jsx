import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Chatbot from "./pages/Chatbot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // wrapper with Header + Outlet
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/chatbot", element: <Chatbot /> },
    ],
  },
]);

export default router;
