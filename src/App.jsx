import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function App() {
  return <>
<Navbar></Navbar>
<Outlet></Outlet>
<Footer></Footer>
  </>;
}

export default App;
