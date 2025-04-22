import Comments from "./Comments"
import CommentSpace from "./CommentSpace"
import Details from "./Details"
import './style.css'

const Discussion = ({discussion}: {discussion: DiscussionDetailsArgs}) => {
  return (
    <div className="discussion-details">
      <h3>Discussion</h3>
      <Details discussion={discussion} />
      <h3>Comments</h3>
      <Comments comments={discussion.comments} />
      <CommentSpace discussionId={discussion.id} />
    </div>
  )
}

export default Discussion
