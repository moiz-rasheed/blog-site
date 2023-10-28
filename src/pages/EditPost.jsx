import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (post && userData) {
      setIsAuthor(post.userId === userData.$id);
    } else {
      setIsAuthor(false);
    }
  }, [post, userData]);

  return post ? (
    <>
      {isAuthor ? (
        <div className="py-8 font-poppins text-[#1c1d20] max-w-5xl mx-auto">
          <Container>
            <h1 className="font-poppins font-bold text-center text-3xl mb-10">
              Update Blog Post
            </h1>
            <PostForm post={post} />
          </Container>
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg text-red-500 font-medium h-[75vh] px-8">
          You are not authorized to edit this post.
        </div>
      )}
    </>
  ) : null;
}

export default EditPost;
