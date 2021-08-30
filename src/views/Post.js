import { postByTitle, listComments } from "../firestoreHelper.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostBody from "../components/PostBody";
import Comment from "../components/Comment";

function Post() {
  let { title } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    const noDashesTitle = title.replaceAll("-", " ");

    postByTitle(noDashesTitle).then((aPost) => {
      setPost(aPost);

      listComments(aPost.name).then((comments) => {
        setPost((prevPost) => {
          return { ...prevPost, comments: comments };
        });
      });
    });
  }, []);

  return (
    <div>
      <PostBody title={post.title} date={post.date} body={post.body} />
      {post.comments && post.comments.length > 0
        ? post.comments.map((comment, idx) => {
            return (
              <Comment
                key={idx}
                name={comment.name}
                date={comment.date}
                text={comment.text}
              />
            );
          })
        : ""}
    </div>
  );
}

export default Post;
