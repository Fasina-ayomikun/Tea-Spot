"use client";

import Image from "next/image";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      console.log(data);

      setPosts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className=''>
      <div className='col-span-6 mx-auto px-10 sm:px-20 lg:px-3 w-full'>
        <section className='flex items-center gap-5 px-5 box_shadow2 w-full mx-auto my-10 py-2 bg-white'>
          <div className='bg-transparent h-12 border-gray-300 rounded-full w-full flex justify-between px-3 my-4 border-[1px] relative'>
            <input
              type='text'
              className='text-sm w-full focus:outline-none h-full border-0 px-3 py-1 bg-transparent'
              placeholder='Share your thoughts...'
            />
          </div>
        </section>

        <section>
          {posts?.length < 1 ? (
            <p className='font-medium text-xl text-center mt-10'>No post</p>
          ) : (
            posts?.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                fetchPosts={fetchPosts}
                setOpenModal={setOpenModal}
              />
            ))
          )}
        </section>
      </div>
    </section>
  );
}
