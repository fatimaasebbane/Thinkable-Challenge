"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import '../../styles/create.css';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const Page = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content
            })
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        });

        setIsLoading(false);
        router.push('/');
    }

    return (
        <div>
            <div className='title_crt'>
                Create your post
            </div>
            <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Input your title' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className='w-full border p-2 rounded-md' 
                />
                <ReactQuill 
                    value={content} 
                    onChange={setContent} 
                    className='w-full border p-2 rounded-md' 
                />
                <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default Page;
