"use client";

import { UserInterface } from "@/lib/types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MiniLoader from "./MiniLoader";
import { FaPaperPlane } from "react-icons/fa";

const CreatePost = ({
  currentUser,
  token,
  fetchPosts,
}: {
  token: string;
  currentUser: UserInterface;
  fetchPosts: () => Promise<void>;
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [postText, setPostText] = useState("");

  const createPost = async () => {
    if (!postText.trim()) {
      toast.warn("Drop some actual gist, bestie 💅");
      return;
    }

    if (!currentUser?._id) {
      toast.warning("Hold up! You need to log in to spill some tea ☕");
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: postText }),
      });

      const json = await response.json();

      if (response.ok) {
        fetchPosts();
        setPostText("");
        toast.success(json.message || "Hot tea successfully spilled! 🔥");
      } else {
        throw new Error(json.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.warn(error.message);
      } else {
        toast.warn("Something went wrong. Try again, boo 💔");
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost();
      }}
      className='bg-transparent h-12 border-purple-400 rounded-full w-full flex items-center gap-5 justify-between px-6 my-4 border-[1px] relative'
    >
      <input
        type='text'
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        className='text-sm w-full focus:outline-none h-full border-0 py-1 bg-transparent placeholder:text-purple-400'
        placeholder='Share your thoughts...'
      />
      <button type='submit' disabled={isCreating}>
        {isCreating ? (
          <MiniLoader />
        ) : (
          <FaPaperPlane className='text-purple-900 text-lg' />
        )}
      </button>
    </form>
  );
};

export default CreatePost;
