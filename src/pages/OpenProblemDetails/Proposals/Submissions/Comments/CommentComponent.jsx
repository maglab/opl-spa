import setDate from "../../../../../utils/functions/setDate";

function CommentComponent(props) {
  const {
    comment_id: id,
    full_text: text,
    alias,
    created_at: createdAt,
  } = props.comment;
  const date = setDate(createdAt);

  return (
    <li className="comment py-2 w-full" key={id}>
      <div className="comment-box bg-gray-100 p-4">
        <p>{text}</p>
      </div>
      <div className="comment-data flex flex-row justify-between">
        <p className="text-sm"> Submitted by: {alias || "Anonymous"}</p>
        <p className="text-sm"> Submitted: {date} </p>
      </div>
    </li>
  );
}

export default CommentComponent;
