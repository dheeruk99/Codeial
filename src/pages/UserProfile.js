import styles from '../styles/settings.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useState, useEffect } from 'react';
import { addFriend, fetchUserProfile,removeFriend } from '../api';
import { NotificationManager } from 'react-notifications';
import { Loader } from '../components';

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        NotificationManager.error(
          response.message,
          'Error in fetching user',
          2000
        );
        return navigate('/');
      }
      setLoading(false);
    };

    getUser();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = async() => {
      setRequestInProgress(true);
      const response = await removeFriend(userId);
      
      if (response.success) {
        const friendship = auth.user.friends.filter(
          (friend) => friend.to_user._id === userId
        );
  
        auth.updateUserFriends(false, friendship[0]);
       NotificationManager.success('Friend removed successfully! ','Friends Updated',2000);
        
      } else {
        NotificationManager.error(response.message,'Failed',2000);
      }
      setRequestInProgress(false);

  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;
      
      
      auth.updateUserFriends(true, friendship);
      NotificationManager.success('Friend added successfully', 2000);
    } else {
      NotificationManager.error(response.message, 'Error', 2000);
    }
    setRequestInProgress(false);
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
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick}>{requestInProgress ? 'Removing friend...' : 'Remove friend'}</button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
