"use client";
import { CommentProp, UserInterface } from "@/lib/types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MiniLoader from "./MiniLoader";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";

const CommentModal = ({
  currentUser,
  token,
  fetchComments,
  id,
  allComments,
}: {
  fetchComments: ({ id }: { id: string }) => Promise<void>;
  allComments: CommentProp[];
  currentUser: UserInterface;
  token: string;
  id: string;
}) => {
  const [postComment, setPostComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const createComment = async () => {
    if (!currentUser._id) {
      toast.warning(
        "Log in first, bestie 💅 You gotta be signed in to spill tea"
      );
      return;
    }

    setIsCommenting(true);
    try {
      const response = await fetch(`/api/posts/${id}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: postComment }),
      });

      const json = await response.json();

      if (response.ok) {
        fetchComments({ id });
        setPostComment("");
      } else {
        throw new Error(json.message);
      }
    } catch (error: unknown) {
      toast.warn(
        error instanceof Error ? error.message : "Oops... Something snapped 😬"
      );
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createComment();
        }}
        className='bg-transparent border-purple-400 rounded-sm w-full flex items-end gap-5 justify-between px-3 py-2 my-4 border-[1px] relative'
      >
        <textarea
          name='text'
          value={postComment}
          rows={3}
          required
          onChange={(e) => setPostComment(e.target.value)}
          placeholder='Drop your hot take...'
          className='custom-scrollbar text-sm w-full focus:outline-none py-1 bg-transparent placeholder:text-purple-400'
        />
        <button type='submit' disabled={isCommenting}>
          {isCommenting ? (
            <MiniLoader />
          ) : (
            <FaPaperPlane className='text-purple-900 text-lg' />
          )}
        </button>
      </form>

      {allComments.length < 1 ? (
        <p className='text-sm ml-3 text-dark-gray mt-5'>
          No comments yet. Start the convo ✨
        </p>
      ) : (
        <div className='mt-5 max-h-[500px] overflow-y-auto'>
          {allComments.map((comment) => (
            <div
              key={comment._id}
              className='w-full bg-white my-2 py-3 px-4 rounded-md'
            >
              <h4 className='text-sm font-semibold'>
                @{comment?.author?.username}
              </h4>
              <p className='text-sm mt-3 px-3 text-gray-800'>{comment?.text}</p>
              <span className='text-xs text-gray-500 flex justify-end'>
                {moment(comment?.createdAt).format("hh:mm a")}
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default CommentModal;
