import { useState } from 'react';
import api from "../../services/api";
import bcrypt from "bcryptjs";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await api.post("/auth/signup", { username, password: hashedPassword });
      toast.success(response.data.message);
      setTimeout(() => setRedirecting(true), 1500);

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    }
  }

  if (redirecting) {
    navigate("/login");
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
}