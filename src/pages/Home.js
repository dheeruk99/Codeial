import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Loader } from '../components';
import styles from '../styles/home.module.css';
import { Comment } from '../components';
import { Link } from 'react-router-dom';
import FriendsList from '../components/FriendList';
import { useAuth } from '../hooks';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const fetchposts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchposts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {posts.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://www.svgrepo.com/show/130468/user-picture.svg"
                  alt="user-pic"
                />
                <div>
                  <Link
                    to={`user/${post.user._id}`}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago </span>
                </div>
              </div>
              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://www.svgrepo.com/show/198175/like.svg"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://www.svgrepo.com/show/379126/comment.svg"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}></div>
              {post.comments.map((comment) => (
                <Comment comment={comment} key={`Comment-${comment._id}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {auth.user && <FriendsList/>}
    </div>
  );
};

export default Home;
