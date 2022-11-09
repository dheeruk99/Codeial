import { Navbar, Loader } from './';
import { Home, Login } from '../pages';
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
          <Route exact path="/" element={<Home posts={[]} />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <NotificationContainer />
    </div>
  );
}

export default App;
