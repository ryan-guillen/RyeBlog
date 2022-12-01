'use client'
import React from 'react';
import { useState, useEffect, FormEvent } from 'react';
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

const EditPage = ({ params: { postId }}: PageProps) => {
    const [post, setPost] = useState<PostType>({id: 'loading..', username: 'loading..', title: 'loading..', text: 'loading..'});
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [postStatus, setPostStatus] = useState<string>('');
    const router = useRouter();

    const attemptUpdatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title == '') return setPostStatus('You need to fill in all fields!')
        if (text == '') return setPostStatus('You need to fill in all fields!')

        await fetch('http://localhost:8080/post/edit', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({'id': postId, 'username': post.username, 'title': title, 'text': text}),
            next: { revalidate: 1 },
        }).then((res) => {
            if (res.status == 201) {
                router.push(`users/${post.username}`)
                router.refresh();
            }
            else if (res.status == 200) setPostStatus('Error. Was your username entered correctly?');
        })
    }

    useEffect(() => {
        fetch(`http://localhost:8080/post/${postId}`, {
                method: 'GET'
            }).then((res) => res.json())
            .then((data) => {
                setPost(data)
                setTitle(data.title);
                setText(data.text);
            })
    }, [])

    return (
        <div className='block fixed w-full h-full overflow-auto bg-black/50'>
            <div className='mx-auto my-12 text-center w-1/2 h-1/2 bg-slate-400 rounded-lg'>
                <form onSubmit={attemptUpdatePost} className='space-y-2'>
                    <p>{post.username}</p>
                    <input type='text' value={title} placeholder='Enter post title...' maxLength={24}
                        onChange={(e) => setTitle(e.target.value)}>
                        
                    </input> <br />
                    <textarea value={text} placeholder='Enter text...' className='w-11/12' maxLength={1500}
                        onChange={(e) => setText(e.target.value)}>

                    </textarea> <br />
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                        Update Post!
                    </button>
                </form>
                {postStatus}
            </div>
        </div>
    )
}

export default EditPage;