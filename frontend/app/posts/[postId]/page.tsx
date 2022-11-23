import Link from 'next/link';

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

const fetchSpring = async (id: string) => {
    const res = await fetch(`http://localhost:8080/post/${id}`, {
        method: 'GET'
    });
    const data: PostType = await res.json();
    console.log(data);
    return data;
}

const Post = async ({ params: { postId } }: PageProps) => {
    const post = await (fetchSpring(postId));
    return (
        <div className='flex flex-col items-center'>
        <div className='flex-1 bg-blue-400 w-1/2 h-32 my-2 mx-2 rounded-md' key={post.id}>
            <div className='text-center'>
                <Link href={`users/${post.username}`} className='font-bold text-center text-6xl text-blue-900 hover:text-blue-700'>{post.username}</Link>
            </div>
            <p className='border-b border-black text-center w-full text-2xl pt-2'>{post.title}</p>
            <p className='text-xl'>{post.text}</p>
        </div>
        </div>
    )
}

export default Post;