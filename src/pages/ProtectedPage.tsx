import React from 'react';
import { useAuth } from '../contexts/authProvider';

export default function ProtectedPage() {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Bem-vindo à página protegida! Somente usuários autenticados podem acessar esta página.</p>
      <button onClick={handleLogOut}>Sair</button>
    </div>
  );
}
