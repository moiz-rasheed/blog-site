import React from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full flex flex-col border border-gray-400 rounded-md overflow-hidden group">
        <div className="relative overflow-hidden w-full h-52">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover object-center absolute group-hover:scale-105  duration-100"
          />
        </div>
        <div className="p-3 overflow-hidden">
          <h2 className="text-md font-bold line-clamp-3">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
