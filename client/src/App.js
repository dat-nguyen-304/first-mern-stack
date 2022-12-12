import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './routing/ProtectedRoute';

function App () {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={ <Landing /> } />
          <Route exact path="/login" element={ <Auth authRoute='login' /> } />
          <Route exact path="/register" element={ <Auth authRoute='register' /> } />
          {/* <ProtectedRoute exact path="/dashboard" element={ <Dashboard /> } /> */ }
          <Route exact path="/dashboard" element={
            <ProtectedRoute element={ <Dashboard /> } />
          } />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
