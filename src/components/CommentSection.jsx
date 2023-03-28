import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import Avatar from "react-avatar";
import axios from "axios";
import { MDBCardImage } from "mdb-react-ui-kit";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

import "./CommentSection.css"; 


export default function CommentSection({ eventId, comments, setEvent }) {
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");
  const [parentComment, setParentComment] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const loggedInUserId = decodedToken._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `http://localhost:3001/events/${eventId}/comments`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setEvent((prevEvent) => ({ ...prevEvent, comments: data }));
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const renderComment = (comment, level = 0) => {
    const childComments = comment.childComments;

    const isCurrentUser = comment.user._id === loggedInUserId;
    const commentClass = isCurrentUser ? "current-user-comment" : "";

    return (
      <div key={comment._id} style={{ marginLeft: level * 20 }} >
        <div className="d-flex flex-start">
        <Link to={`/profile/${comment.user._id}`}>
  <MDBCardImage
    className="rounded-circle shadow-1-strong me-3"
    src={comment.user.avatar}
    alt="avatar"
    width="65"
    height="65"
  />
</Link>
          <div className="flex-grow-1 flex-shrink-1">
            <div>
              <div className="d-flex justify-content-between align-items-center mt-2 fw-bold" id="singlecommentuser">
                <p className={commentClass}>
                  {comment.user.firstName} {" "}
                </p>
                {level === 0 && (
                <a href="#!" onClick={() => setParentComment(comment._id)}>
                  <Button className="small replybutton">Reply</Button>
                </a>
              )}
              </div>
              <p className="small mb-1" id="comment-text">{comment.text}</p>
            </div>
            {parentComment === comment._id && (
              <Form onSubmit={(event) => handleReply(event, comment._id)}>
                <Form.Group controlId="new-comment">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write a reply..."
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="replybutton">
                  <FaPaperPlane className="me-2" />
                  Reply
                </Button>
              </Form>
            )}
            {childComments.map((childComment) =>
              renderComment(childComment, level + 1)
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleReply = async (event, parentCommentId) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `http://localhost:3001/events/${eventId}/comments`,
        { comment: reply, parentCommentId }, // Add parentCommentId here
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setEvent((prevEvent) => ({ ...prevEvent, comments: data }));
      setReply("");
      setParentComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      {comments
        .filter((comment) => !comment.parentComment)
        .map((comment) => renderComment(comment))}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="new-comment">
          <Form.Control className="mt-4"
            as="textarea"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleCommentChange}
          />
        </Form.Group>
        <Button type="submit" id="commentbutton" className="mt-3">
          <FaPaperPlane /> Comment
        </Button>
      </Form>
    </div>
  );
}
