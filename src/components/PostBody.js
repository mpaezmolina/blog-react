import { Link } from "react-router-dom";

function PostBody(props) {
  return (
    <div className="post">
      <hr />
      <h3 className="post-title">
        <Link to={"/post/" + props.title}>{props.title}</Link>
      </h3>
      <span className="date">{props.date}</span>
      <div dangerouslySetInnerHTML={{ __html: props.body }}></div>
    </div>
  );
}

export default PostBody;
