import React from "react";
import appwriteService from '../appwrite/config'
import { Link } from "react-router-dom";

function PostCard({$id, title, featuredImage}){
    return(
        <Link
        to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl h-40 w-full"/>
                </div>
                <div className="flex justify-center flex-col items-center">
                <h2 className="text-xl text-center px-4 font-bold">{title}</h2>
                <div className="border-b-2 border-[#ffb28e] w-20"></div>
                </div>
                
            </div>
        </Link>
    )
}

export default PostCard