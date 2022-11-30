'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type PageProps = {
    params: {
        postId: string;
    }
}

type PostType = {
    id: string;
    username: string;
    title: string;
    text: string;
}

const Post = ({ params: { postId } }: PageProps) => {
    const [post, setPost] = useState<PostType>({id: 'loading..', username: 'loading..', title: 'loading..', text: 'loading..'});
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:8080/post/${postId}`, {
                method: 'GET'
            }).then((res) => res.json())
            .then((data) => {
                setPost(data)
            })
    }, [])

    const deletePost = async(id: string, username: string) => {
        await fetch(`http://localhost:8080/post/${id}`, {
            method: 'DELETE'
        }).then(() => {
            router.push(`/users/${username}`)
            router.refresh();
            setPost({id: postId, username: username, title: '', text: 'The post has been deleted.'})
        }); 
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='flex-1 bg-blue-400 w-1/2 h-32 my-2 mx-2 rounded-md' key={post.id}>
                <div className='text-center'>
                    <Link href={`users/${post.username}`} className='font-bold text-center text-6xl text-blue-900 hover:text-blue-700'>{post.username}</Link>
                </div>
                <p className='border-b border-black text-center w-full text-2xl pt-2'>{post.title}</p>
                <p className='text-xl'>{post.text}</p>
                <button onClick={() => deletePost(postId, post.username)} className='bg-red-400 px-5 py-1 rounded-lg'>Delete</button>
            </div>
        </div>
    )
}

export default Post;