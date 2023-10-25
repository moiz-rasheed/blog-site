import React from "react";
import { Container, PostForm } from "../components/index";

function AddPost() {
  return (
    <div className="py-8 font-poppins text-[#1c1d20] max-w-5xl mx-auto">
      <Container>
        <h1 className="font-poppins font-bold text-center text-3xl mb-10">
          New Blog Post
        </h1>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
