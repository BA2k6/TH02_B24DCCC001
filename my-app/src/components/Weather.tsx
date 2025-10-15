import { useState } from "react";
import axios from "axios";

interface WeatherData {
  current_condition: {
    temp_C: string;
    weatherDesc: { value: string }[];
  }[];
}

export default function WeatherApp() {
    const [city, setCity] = useState("");
    const [data, setData] = useState<WeatherData | null>(null);
      const [error, setError] = useState("");


  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://wttr.in/${city}?format=j1`);
      if (!res.data.current_condition) {
        setError("Không tìm thấy thành phố!");
        setData(null);
      } else {
        setData(res.data);
        setError("");
      }
    } catch {
      setError("Không tìm thấy thành phố!");
      setData(null);
    }
  };


  return (
    <div style={{  backgroundColor:"#cfe5fcff", width:"50%", padding:"30px", margin:"0 auto", marginTop:"80px", borderRadius:"5px" }}>
      <h1>Thời tiết</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Nhập tên thành phố..."
        style ={{ borderRadius:"5px", padding: "8px", }}
      />
        <button
        onClick={handleSearch}
        style={{
            borderRadius: "5px",
            padding: "8px",
            backgroundColor: "#3392f0ff",
            cursor: "pointer", 
        }}
        >
        Xem
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && !error && (
            <div style={{ marginTop: "10px" }}>
            <p>Nhiệt độ: {data.current_condition[0].temp_C}°C</p>
            <p>Tình trạng: {data.current_condition[0].weatherDesc[0].value}</p>
            </div>
        )}
        
    </div>
  );
}
