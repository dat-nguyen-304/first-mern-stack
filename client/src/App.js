import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import About from './components/About';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './routing/ProtectedRoute';

function App () {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={ <Landing /> } />
            <Route exact path="/login" element={ <Auth authRoute='login' /> } />
            <Route exact path="/register" element={ <Auth authRoute='register' /> } />
            <Route exact path="/dashboard" element={
              <ProtectedRoute component={ Dashboard } />
            } />
            <Route exact path="/about" element={
              <ProtectedRoute component={ About } />
            } />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
