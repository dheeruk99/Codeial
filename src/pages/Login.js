import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import { NotificationManager } from 'react-notifications';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      setLoggingIn(false);
      return NotificationManager.success(
        'Please Enter both email and password',
        'Authentication failed',
        2000
      );
    }

    const response = await auth.login(email, password);

    if (response.success) {
      setLoggingIn(false);
      navigate('/');
      NotificationManager.success(
        'Successfully Logged in',
        'Authorization success',
        2000
      );
    } else {
      setLoggingIn(false);
      NotificationManager.error(response.message, 'Authorization failed', 2000);
    }
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>
        <div className={styles.field}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <button disabled={loggingIn}>
            {loggingIn ? 'logging in...' : 'log in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
