import { Navbar, Loader } from './';
import { Home, Login, Settings, Signup, UserProfile } from '../pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { useAuth } from '../hooks';
import 'react-notifications/lib/notifications.css';

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  function PrivateRoute({ children }) {
    return auth.user ? children : <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <NotificationContainer />
    </div>
  );
}

export default App;
