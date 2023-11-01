import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Container, PostCard, Button, Loader } from "../components/index";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full py-8 mb-8 font-poppins text-[#1c1d20]">
      {loading ? (
        <div className="flex items-center justify-center flex-col h-[75vh] px-8">
          <Loader />
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            <Container>
              <div className="text-center mb-6 sm:mb-10 px-3 sm:px-10 md:px-20 lg:px-32">
                <p className="font-bold text-3xl mb-2">
                  Unlock Your Potential with Expert Insights
                </p>
                <p>
                  Welcome to our blog, where we empower you with valuable
                  knowledge, expert advice, and inspirational stories. Discover
                  the keys to personal growth, success, and a fulfilling life as
                  you embark on this journey with us.
                </p>
              </div>
              <div className="max-w-5xl mx-auto">
                <p className="font-bold text-lg text-center sm:text-start mb-6 sm:mb-4">
                  Recent Blog Posts
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {posts.map((post) => (
                    <div key={post.$id}>
                      <PostCard {...post} />
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          ) : (
            <div className="flex items-center justify-center flex-col h-[75vh] px-8">
              <p className="text-center text-lg pb-2">
                There are no posts at the moment.
              </p>
              <Link to="/add-post">
                <Button>Add Post</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
