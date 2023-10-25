import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

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

  return post ? (
    <div className="py-8 font-poppins text-[#1c1d20] max-w-5xl mx-auto">
      <Container>
        <h1 className="font-poppins font-bold text-center text-3xl mb-10">
          Update Blog Post
        </h1>
        <PostForm />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
