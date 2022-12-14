'use client'
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

const CreatePost = () => {
    const [username, setUsername] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [postStatus, setPostStatus] = useState<string>('');
    const router = useRouter();

    const attemptCreatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username == '') return setPostStatus('You need to fill in all fields!');
        if (title == '') return setPostStatus('You need to fill in all fields!');
        if (text == '') return setPostStatus('You need to fill in all fields!');

        await fetch('http://localhost:8080/post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({'username': username, 'title': title, 'text': text}),
        }).then((res) => {
            if (res.status == 201) setPostStatus('Post successfully made');
            else if (res.status == 200) setPostStatus('Error. Was your username entered correctly?');
        })
    }

    return (
        <div className='block fixed w-full h-full overflow-auto bg-black/50'>
            <div className='mx-auto my-12 text-center w-1/2 h-1/2 bg-slate-400 rounded-lg'>
                <form onSubmit={attemptCreatePost} className='space-y-2'>
                    <input type='text' value={username} placeholder='Enter username...'
                        onChange={(e) => setUsername(e.target.value)}>
                        
                    </input> <br />
                    <input type='text' value={title} placeholder='Enter post title...' maxLength={24}
                        onChange={(e) => setTitle(e.target.value)}>

                    </input> <br />
                    <textarea value={text} placeholder='Enter text...' className='w-11/12' maxLength={1500}
                        onChange={(e) => setText(e.target.value)}>

                    </textarea> <br />
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                        Create Post!
                    </button>
                </form>
                {postStatus}
            </div>
        </div>
    )
}

export default CreatePost;