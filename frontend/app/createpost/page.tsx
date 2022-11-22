'use client'
import { useState, FormEvent } from 'react';



const CreatePost = () => {
    const [username, setUsername] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');

    const attemptCreatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username == '') return 'You need to fill in all fields!'
        if (title == '') return 'You need to fill in all fields!'
        if (text == '') return 'You need to fill in all fields!'

        const res = await fetch('http://localhost:8080/post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({'username': username, 'title': title, 'text': text}),
        });
    }

    return (
        <div className='block fixed w-full h-full overflow-auto bg-black/50'>
            <div className='mx-auto my-12 text-center w-1/2 h-1/4 bg-slate-400 rounded-lg'>
                <form onSubmit={attemptCreatePost} className='space-y-2'>
                    <input type='text' value={username} placeholder='Enter username...'
                        onChange={(e) => setUsername(e.target.value)}>
                        
                    </input> <br />
                    <input type='text' value={title} placeholder='Enter post title...' 
                        onChange={(e) => setTitle(e.target.value)}>

                    </input> <br />
                    <input type='text' value={text} placeholder='Enter text...' 
                        onChange={(e) => setText(e.target.value)}>

                    </input> < br />
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                        Create Post!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;