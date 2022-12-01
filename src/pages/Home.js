
import { CreatePost, Loader } from '../components';
import styles from '../styles/home.module.css';
import { Comment,FriendsList } from '../components';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
 
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost/>
        {posts.data.map((post) => (
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
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://www.svgrepo.com/show/198175/like.svg"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://www.svgrepo.com/show/379126/comment.svg"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
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
