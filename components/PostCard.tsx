"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { MdComment, MdOutlineThumbUp } from "react-icons/md";
import MiniLoader from "./MiniLoader";
import { toast } from "react-toastify";
import { CommentProp, PostCardProps } from "@/lib/types";
import CommentModal from "./CommentModal";

const PostCard = ({
  fetchPosts,
  setOpenModal,
  post,
  token,
  currentUser,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(
    post.likes.some((user) => user._id === currentUser._id)
  );
  const [likeNum, setLikeNum] = useState<number>(post.likes.length);
  const [openCommentModal, setOpenCommentModal] = useState("");
  const [allComments, setAllComments] = useState<CommentProp[]>([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${post._id}/comment`);
      const data = await response.json();

      if (response.ok) {
        setAllComments(data.data || []);
      } else {
        toast.warn(data.message || "Couldn’t fetch the tea ☕");
      }
    } catch (error: any) {
      toast.warn(error?.message || "Something went wrong fetching comments");
    }
  };

  const handleToggleLike = async () => {
    const newStatus = !isLiked;
    setIsLiked(newStatus);
    setLikeNum((prev) => (newStatus ? prev + 1 : prev - 1));

    try {
      const response = await fetch(`/api/posts/${post._id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) throw new Error(json.message);
    } catch (error: any) {
      toast.warn(error?.message || "Like drama! Try again later 💔");
      setIsLiked(!newStatus);
      setLikeNum((prev) => (!newStatus ? prev + 1 : prev - 1));
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <article className='drop-shadow-xl rounded-md'>
      <div className='px-5 box_shadow2 w-full mx-auto my-10 py-3 rounded-md bg-white'>
        <div className='px-4 py-3 border-b border-purple-400'>
          <h4 className='text-sm font-semibold capitalize'>
            {post?.author?.username}
          </h4>
          <p className='text-gray-700 text-xs font-sans lowercase'>
            {moment(post?.createdAt).format("hh:mm a")}
          </p>
        </div>

        <p className='text-sm py-3 text-dark-gray my-3'>{post?.text}</p>

        <div className='py-4 pt-3 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2'>
            {isLiked ? (
              <FaThumbsUp
                onClick={handleToggleLike}
                className='cursor-pointer text-purple-700'
              />
            ) : (
              <MdOutlineThumbUp
                onClick={handleToggleLike}
                className='cursor-pointer text-gray-500'
              />
            )}

            {likeNum > 0 && (
              <p className='text-sm'>
                {isLiked
                  ? likeNum > 1
                    ? `You and ${likeNum - 1} others`
                    : "You like this"
                  : `${likeNum} ${likeNum > 1 ? "people" : "person"} like this`}
              </p>
            )}
          </div>

          <div
            className='cursor-pointer flex items-center gap-2'
            onClick={() =>
              setOpenCommentModal((prev) => (prev ? "" : post._id))
            }
          >
            <MdComment className='text-purple-700' />
            <p className='text-sm'>
              {allComments.length} comment{allComments.length !== 1 && "s"}
            </p>
          </div>
        </div>
      </div>

      {openCommentModal === post._id && (
        <CommentModal
          token={token}
          currentUser={currentUser}
          id={post._id}
          fetchComments={fetchComments}
          allComments={allComments}
        />
      )}
    </article>
  );
};

export default PostCard;
