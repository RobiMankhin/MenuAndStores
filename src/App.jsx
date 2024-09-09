import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Notfound from "./Components/Notfound";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import ItemDetail from "./Components/ItemDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Notfound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/menu/:id", element: <ItemDetail /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
