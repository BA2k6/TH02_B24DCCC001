import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  image_url: string;
  summary: string;
  url: string;
  published_at: string;
}

export default function NewsApp() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v4/articles?limit=10")
      .then((res) => setArticles(res.data.results))
      .catch(() => alert("Không thể tải dữ liệu tin tức!"));
  }, []);

  return (
    <div style={{  backgroundColor:"#d2e7fbff", width:"80%", padding:"30px", margin:"0 auto", marginTop:"80px" , borderRadius:"5px" }}>
      <h1>📰 Tin tức</h1>
      {articles.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
            backgroundColor:"#fff"
          }}
        >
          <img src={a.image_url} alt={a.title} width={300} />
          <h3>{a.title}</h3>
          <p>{a.summary}</p>
          <p>
            <a href={a.url} target="_blank" rel="noreferrer">
              🔗 Xem tin gốc
            </a>
          </p>
          <small>Ngày đăng: {new Date(a.published_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}


