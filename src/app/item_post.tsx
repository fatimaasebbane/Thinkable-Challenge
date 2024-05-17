'use client';

import React from 'react';
import { Post } from '@prisma/client/wasm';
import { useRouter } from 'next/navigation';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import './styles/item.css';

interface Props {
    post: Post;
}

const Item: React.FC<Props> = ({ post }) => {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        await fetch('/posts?id=' + id, {
            method: 'DELETE'
        });

        router.refresh();
    };

    return (
        <div className="blog_post">
            <div className="img_pod">
                <img src="https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg" alt="random image" />
            </div>
            <div className="container_copy">
                <h3>{post.createdAt}</h3>
                <h1>{post.title}</h1>
                <div style={{fontSize:"20px"}}
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <br></br>
                <a className="btn_primary" onClick={() => router.push(`/pages/show/${post.id}`)}>Read More</a>
                <div className='flex justify-end mt-4'>
                    <button
                        className='bg-transparent border-none cursor-pointer outline-none'
                        onClick={() => router.push(`/pages/update/${post.id}`)}
                    >
                        <AiOutlineEdit size={30} className='text-green-500 hover:text-blue-900 transition duration-200' />
                    </button>
                    <button
                        className='bg-transparent border-none cursor-pointer outline-none ml-3'
                        onClick={() => handleDelete(post.id)}
                    >
                        <AiOutlineDelete size={30} className='text-red-500 hover:text-red-600 transition duration-200' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Item;
