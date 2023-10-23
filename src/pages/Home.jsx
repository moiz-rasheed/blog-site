import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Container, PostCard } from "../components/index";

function Home() {
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
        <div className="text-center mb-10 px-3 sm:px-10 md:px-20 lg:px-32">
          <p className="font-bold text-3xl mb-2">
            Unlock Your Potential with Expert Insights
          </p>
          <p>
            Welcome to our blog, where we empower you with valuable knowledge,
            expert advice, and inspirational stories. Discover the keys to
            personal growth, success, and a fulfilling life as you embark on
            this journey with us.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <p className="font-bold text-lg mb-4">Recent Blog Posts</p>
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

export default Home;
