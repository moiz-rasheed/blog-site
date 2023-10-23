import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Container, PostCard } from "../components/index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8 font-poppins text-[#1c1d20]">
      <Container>
        <div className="max-w-5xl mx-auto">
          <p className="font-bold text-lg mb-4">All Blog Posts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
