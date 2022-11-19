import { useState } from 'react';
import { useAuth } from '../hooks';
import { useNavigate ,Navigate} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    if (!name || !email || !password || !confirmPassword) {
      setSigningUp(false);
      return NotificationManager.warning(
        'Please fill all the fields',
        'Empty field',
        2000
      );
    }
    if (password !== confirmPassword) {
      setSigningUp(false);
      return NotificationManager.error(
        'Make sure password and confirm password matches',
        'Password mismatch',
        2000
      );
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      navigate('/login');
      setSigningUp(false);

      return NotificationManager.success(
        'user registered successfully, please login now',
        'Registered successfully',
        2000
      );
    } else {
      setSigningUp(false);
      return NotificationManager.error(
        response.message,
        'Registration Failed',
        2000
      );
    }
  };

  if(auth.user){
    return <Navigate to='/'/>;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          placeholder="Email"
          type="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          values={password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
