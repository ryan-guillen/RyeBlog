import Link from 'next/link';

type Post = {
    id: string;
    username: string;
    title: string;
    text: string
}

const getPosts = async () => {
    const res = await fetch(`http://localhost:8080/post`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 5 }
    });
    let data: Post[] = await res.json();
    data = data.reverse(); // Newest posts first
    return data;  
}

const Posts = async () => {
    const posts = await getPosts();
    return (
        <div className='flex flex-col items-center'>
            {posts.map((post: Post) => (
                <div className='bg-blue-400 w-1/2 h-56 my-2 mx-2 rounded-md' key={post.id}>
                    <div className='text-center'>
                        <Link href={`users/${post.username}`} className='font-bold text-center text-3xl text-blue-900 hover:text-blue-700'>{post.username}</Link>
                    </div>
                    <div className='text-center w-full'>
                        <Link href={`/posts/${post.id}`} className='border-b text-xl border-black hover:text-blue-900'>{post.title}</Link>
                    </div>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    )
}

export default Posts;