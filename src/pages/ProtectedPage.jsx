import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Bem-vindo à página protegida! Somente usuários autenticados podem acessar esta página.</p>
    </div>
  );
}