import { useState } from 'react';
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        return toast.error("Por favor, preencha todos os campos.");
      }

      const response = await api.post("/auth/login", { username, password });
      if (response.data.token) {
        localStorage.setItem('jwt-token', response.data.token);
        toast.success("Login bem sucedido!");

        setTimeout(() => setRedirecting(true), 1500);
      } else {
        toast.error("Ocorreu um erro ao efetuar o login.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    }
  }

  if (redirecting) {
    navigate("/protected-page");
  }

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Logar</button>
      </form>
      <ToastContainer />
    </div>
  );
}
