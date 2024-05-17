"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import '../../../styles/create.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


const Page = ({ params }: { params: { id: string } }) => {

    const id = params.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)
        await fetch('/posts', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, content, id
            })
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        setIsLoading(false)

        router.push('/')
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch('/posts' + id)
        const json = await res.json()

        if (!json) {
            router.push('/404')
            return
        }

        setTitle(json.post.title)
        setContent(json.post.content)
    }

    return (
        <div>
            <div className='title_crt'>
                Update your post
            </div>
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <input type="text" placeholder='Input your title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full border p-2 rounded-md' />
        <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Input your content"
            className='w-full border p-2 rounded-md'/>
            
 <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Update'}</button>
        </form>
        </div>
    )
}

export default Page