import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import e from 'cors';
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState('');

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    if (!name || !password || !confirmPassword) {
      setSavingForm(false);
      return NotificationManager.error(
        'Please fill all the fields',
        'Empty Fields',
        2000
      );
    }

    if (password !== confirmPassword) {
      setSavingForm(false);
      return NotificationManager.error(
        'Password and confirm password does not match',
        'Password mismatch',
        2000
      );
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    console.log('Settings Response', response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return NotificationManager.success(
        'User updated successfully',
        'Profile Update',
        2000
      );
    } else {
      setSavingForm(false);
      return NotificationManager.error(
        response.message,
        'Profile updation failed',
        2000
      );
    }
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://www.svgrepo.com/show/130468/user-picture.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.filedValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.filedValue}>{auth.user.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.filedLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btngrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
            >
              {savingForm ? 'Saving profile..' : 'Save profile'}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={(e) => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button className={styles.editBtn} onClick={(e) => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
