import { Post, PostCardProps } from "@/lib/types";
import React, { useEffect, useState } from "react";

const useFetchPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts");
      const { data } = await response.json();
      console.log(data, "fetching posts");

      setPosts([...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchPosts, isLoading, posts };
};

export default useFetchPosts;
