import Link from 'next/link'

type PageProps = {
    params: {
        userId: string;
    }
}

type PostType = {
    id: string
    username: string;
    title: string;
    text: string;
}

const getPosts = async (username: string) => {
    const res = await fetch(`http://localhost:8080/post/account/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 1 }
    });
    let data: PostType[] = await res.json();
    if (data.length > 1) data = data.reverse(); // Newest posts first
    return data;  
}

const User = async ({ params: { userId } }: PageProps) => {
    let all = await getPosts(userId);
    
    return (
        <div className='flex flex-col items-center'>
            {all.map((post: PostType) => (
                <div className='flex-1 bg-blue-400 w-1/2 h-32 my-2 mx-2 rounded-md' key={post.id}>
                    <h2 className='font-bold text-center text-2xl'>{post.username}</h2>
                    <div className='text-center w-full text-lg'>
                        <Link href={`/posts/${post.id}`} className='border-b border-black hover:text-blue-900'>{post.title}</Link>
                    </div>
                    <p className='text-lg'>{post.text}</p>
                </div>
            ))}
        </div>
    )
}

export default User;