'use client'
import { useState, FormEvent } from 'react';

const CreateAccount = () => {
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    const attemptCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username == '') return 'You need to fill in all fields!'
        if (bio == '') return 'You need to fill in all fields!'

        const res = await fetch('http://localhost:8080/account', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({'username': username, 'bio': bio}),
        });
    }

    return (
        <div className='block fixed w-full h-full overflow-auto bg-black/50'>
            <div className='mx-auto my-12 text-center w-1/2 h-1/4 bg-slate-400 rounded-lg'>
                <form onSubmit={attemptCreateAccount} className='space-y-2'>
                    <input type='text' value={username} placeholder='Enter username...' maxLength={20}
                        onChange={(e) => setUsername(e.target.value)}>         
                    </input> <br />
                    <input type='text' value={bio} placeholder='Enter bio...' maxLength={60}
                        onChange={(e) => setBio(e.target.value)}>
                    </input> <br />
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                        Create Account!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateAccount;