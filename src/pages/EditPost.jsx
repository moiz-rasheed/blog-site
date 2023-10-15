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
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
