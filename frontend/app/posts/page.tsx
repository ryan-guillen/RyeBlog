type Post = {
    username: string;
    title: string;
    text: string
}

const getPosts = async () => {
    const res = await fetch(`http://localhost:8080/post`, { // add
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 5 }
    });
    const data: Post[] = await res.json();
    console.log(data);
    return data;
    
}

const Posts = async () => {
    const posts = await getPosts();

    return (
        <div>
            <div className='flex'>
                {posts.map((post: Post) => (
                    <div className='bg-blue-400 w-56 h-56 my-2 mx-2 rounded-md text-center'>
                        <p>{post.username}</p>
                        <p>{post.title}</p>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts;