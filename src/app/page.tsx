import Link from 'next/link'
import React from 'react'
import Item from './item_post'
import './styles/home.css'
const getPosts = async () => {
   
    const res = await fetch(process.env.BASE_URL + '/posts', { next: { revalidate: 0 } })
    const json = await res.json()
    return json
}

const Page = async () => {

    const posts = await getPosts()

    return (
        <div className='w-[1200px] mx-auto py-20'>
            
            <Link href={"/pages/create"} className='btn_danger'>Create new post</Link>
            <br></br>
            <br></br><br>
            </br><br></br>
            <div className='grid grid-cols-3 gap-5 mt-8'>
                {posts?.posts?.map((post: any, i: number) => (
                    <Item key={i} post={post} />
                )).sort().reverse()}
            </div>
        </div>
    )
}

export default Page