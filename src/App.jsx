import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';
import ProtectedPage from './pages/ProtectedPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected-page" element={<ProtectedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;