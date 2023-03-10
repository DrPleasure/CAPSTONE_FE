import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import Avatar from "react-avatar";
import axios from "axios";
import { MDBCardImage } from "mdb-react-ui-kit";

export default function CommentSection({ eventId, comments, setEvent }) {
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");
  const [parentComment, setParentComment] = useState("");

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

  const renderComment = (comment) => {
    const childComments = comments.filter(
      (c) => c.parentComment === comment._id
    );
    return (
      <div key={comment._id}>
        <div className="d-flex flex-start">
        <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src={comment.user.avatar}
                        alt="avatar"
                        width="65"
                        height="65"
                      />
          <div className="flex-grow-1 flex-shrink-1">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1">
                  {comment.user.firstName} {comment.user.lastName}{" "}
                 
                </p>
                <a href="#!" onClick={() => setParentComment(comment._id)}>
                  <FaPaperPlane className="me-2" />
                  <span className="small">Reply</span>
                </a>
              </div>
              <p className="small mb-0">{comment.text}</p>
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
                <Button type="submit">
                  <FaPaperPlane className="me-2" />
                  Reply
                </Button>
              </Form>
            )}
            {childComments.map((childComment) => renderComment(childComment))}
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
        { comment: reply, parentCommentId },
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
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Write a comment..."
        value={newComment}
        onChange={handleCommentChange}
      />
    </Form.Group>
    <Button type="submit">
      <FaPaperPlane /> Comment
    </Button>
  </Form>
</div>
);
}