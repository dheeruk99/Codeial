import { Navbar, Loader } from './';
import { Home, Login, Settings, Signup } from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { useAuth } from '../hooks';
import 'react-notifications/lib/notifications.css';

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/" element={<Home posts={[]} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <NotificationContainer />
    </div>
  );
}

export default App;
