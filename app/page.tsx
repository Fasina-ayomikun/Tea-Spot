"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import MiniLoader from "@/components/MiniLoader";
import useFetchPosts from "@/hooks/useFetchPosts";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: "", username: "" });
  const [token, setToken] = useState("");

  const router = useRouter();
  const { fetchPosts, posts, isLoading } = useFetchPosts();

  useEffect(() => {
    const user = localStorage.getItem("TEA_USER");
    const token = localStorage.getItem("TEA_TOKEN");

    if (user) setCurrentUser(JSON.parse(user));
    if (token) setToken(JSON.parse(token));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='relative'>
      <Navbar token={token} />
      <main className='mx-auto max-w-3xl w-full px-5'>
        <CreatePost
          fetchPosts={fetchPosts}
          token={token}
          currentUser={currentUser}
        />

        {isLoading ? (
          <div className='flex justify-center mt-10'>
            <MiniLoader />
          </div>
        ) : posts?.length < 1 ? (
          <p className='font-medium text-center text-lg mt-10 text-gray-600'>
            No tea here yet... Be the first to spill ☕
          </p>
        ) : (
          <div className='space-y-6 mt-6'>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                fetchPosts={fetchPosts}
                setOpenModal={setOpenModal}
                currentUser={currentUser}
                token={token}
              />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
