import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Aos from "aos";
import { useEffect } from "react";

function App() {
  useEffect(() => {
  Aos.init({ duration: 1000 });
}, []);
  return <>
<Navbar></Navbar>
<Outlet></Outlet>
<Footer></Footer>
  </>;
}

export default App;
