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
        <h2 className="text-md font-bold line-clamp-2 p-3 uppercase">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
