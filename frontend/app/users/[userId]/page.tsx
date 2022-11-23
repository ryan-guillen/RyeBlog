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
        next: { revalidate: 5 }
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
                    <h2 className='font-bold text-center'>{post.username}</h2>
                    <div className='text-center w-full'>
                        <Link href={`/posts/${post.id}`} className='border-b border-black hover:text-blue-900'>{post.title}</Link>
                    </div>
                    {post.text} < br/>
                </div>
            ))}
        </div>
    )
}

export default User;