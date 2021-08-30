import { listPosts } from "../firestoreHelper.js";
import PostBody from "../components/PostBody";
import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    listPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div>
      {posts.map((post, idx) => {
        return (
          <PostBody
            key={idx}
            title={post.title}
            date={post.date}
            body={post.body}
          />
        );
      })}
    </div>
  );
}

export default Home;
