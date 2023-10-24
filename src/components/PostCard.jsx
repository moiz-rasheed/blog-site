import React from "react";
import appwriteService from "../appwrite/appwrite_config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full flex flex-col group">
        <div className="relative overflow-hidden w-full h-52">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover object-center absolute"
          />
        </div>
        <div className="p-1 pt-2 overflow-hidden flex justify-between">
          <h2 className="text-md font-bold line-clamp-3 group-hover:underline underline-offset-2">
            {title}
          </h2>
          <div className="text-xl -rotate-45 h-5">
            <ion-icon name="arrow-forward-sharp"></ion-icon>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
