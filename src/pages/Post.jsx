import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/appwrite_config";
import parse from "html-react-parser";
import { Container, Button } from "../components/index";
import { Link, useNavigate, useParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          window.scrollTo(0, 0);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="pt-4 pb-8 font-poppins text-[#1c1d20] max-w-4xl mx-auto">
      <Container>
        <div className="flex justify-between flex-col sm:flex-row mb-4">
          <h1 className="text-2xl font-semibold mb-2 sm:mb-0">{post.title}</h1>
          {isAuthor && (
            <div className="flex gap-1 justify-end">
              <Link to={`/edit-post/${post.$id}`}>
                <div className="border-2 border-[#1c1d20] text-2xl p-3 rounded-full h-[3.2rem] w-[3.2rem] hover:bg-[#1c1d20] hover:text-white duration-200">
                  <ion-icon name="create-outline"></ion-icon>
                </div>
              </Link>
              <div
                className="border-2 border-[#1c1d20] text-2xl p-3 rounded-full h-[3.2rem] w-[3.2rem] hover:bg-[#1c1d20] hover:text-white duration-200"
                onClick={deletePost}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className=""
          />
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
