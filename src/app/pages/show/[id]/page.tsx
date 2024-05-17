'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { Post } from '@prisma/client/wasm';
import '../../../styles/show.css'

const ShowPost: React.FC = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`/posts/${id}`);
                    const data = await response.json();
                    setPost(data.post);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching post:", error);
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
        <a href='https://fonts.googleapis.com/css?family=Roboto:400,500,300,700' rel='stylesheet' type='text/css'></a>
        <div className="wrapper">
          <div className="top">
            <div className="title"><h1> </h1></div></div>
          <div className="content">
            <div className="card first">
              <h1 className="title_post">{post.title}</h1>
              <p className="date">{post.createdAt}</p>
              <p className="text">
                {post.content}
                </p>
              </div>
          </div>
        </div>
        </div>
    );
};

export default ShowPost;
