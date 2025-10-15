import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useParams } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setStudents(res.data))
      .catch(() => alert("Lỗi tải danh sách sinh viên!"));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{  backgroundColor:"#afceeeff", width:"60%", padding:"30px", margin:"0 auto" , marginTop:"80px", borderRadius:"5px" }}>
            <h1 style={{ textAlign: "center" }}>Danh sách sinh viên</h1>
            <div style={{  backgroundColor:"#ffffffff", width:"90%", padding:"30px", margin:"0 auto" , borderRadius:"5px" }}>
              <ul>
                {students.map((s) => (
                  <li key={s.id}>
                    <Link to={`/students/${s.id}`}>{s.name}</Link> ({s.email})
                  </li>
                ))}
              </ul>
            </div>

          </div>
        }
      />
      <Route path=":id" element={<StudentDetail />} />
    </Routes>
  );
}

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setStudent(res.data))
      .catch(() => alert("Không tải được chi tiết sinh viên!"));
  }, [id]);

  if (!student) return <p>Đang tải...</p>;

  return (
    <div style={{ backgroundColor:"#afceeeff", width:"80%", padding:"30px", margin:"0 auto" , marginTop:"80px", borderRadius:"5px" }}>
      <h2>Chi tiết sinh viên</h2>
      <div style={{  backgroundColor:"#ffffffff", width:"95%", padding:"30px", margin:"0 auto" , borderRadius:"5px" }}>
            <p>Họ tên: {student.name}</p>
        <p>Email: {student.email}</p>
        <p>Điện thoại: {student.phone}</p>
        <p>Website: {student.website}</p>
      </div>
      
      <Link to="/students">← Quay lại danh sách</Link>
    </div>
  );
}
