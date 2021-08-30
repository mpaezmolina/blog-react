import "./Comment.css";
function Comment(props) {
  return (
    <div>
      <div className="comment even">
        <div className="comment-info">
          <span className="name">{props.name}</span>
          <span className="date">{props.date}</span>
          <div className="text">{props.text}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Comment;
