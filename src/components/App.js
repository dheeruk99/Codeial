import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Navbar, Loader } from './';
import Home from '../pages/Home';
function App() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPosts();
      console.log('response', response);

      if (response.success) {
        setPost(response.data.posts);
      }
      setLoading(false);
    };
    fetchPost();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Home posts={posts} />
    </div>
  );
}

export default App;
