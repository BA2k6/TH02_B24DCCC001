import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WeatherApp from "./components/Weather";
import StudentList from "./components/StudentList";
import NewsApp from "./components/News";

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          position: "fixed",     
          top: 0,              
          left: 0,
          width: "100%",         
          backgroundColor: "#add7f7ff",
          padding: "10px",
          display: "flex",
          gap: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)", 
          zIndex: 1000,       
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#000" }}><strong>Weather</strong></Link>
        <Link to="/students" style={{ textDecoration: "none", color: "#000" }}><strong>Students</strong></Link>
        <Link to="/news" style={{ textDecoration: "none", color: "#000" }}><strong>News</strong></Link>
      </nav>

      <Routes>
        <Route path="/" element={<WeatherApp />}  />
        <Route path="/students/*" element={<StudentList />} />
        <Route path="/news" element={<NewsApp />} />
      </Routes>
    </BrowserRouter>
  );
}
