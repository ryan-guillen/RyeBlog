type PageProps = {
    params: {
        userId: string;
    }
}

type Post = {
    username: string;
    title: string;
    text: string;
}

const fetchPosts = async (username: string) => {
    const res = await fetch(`http://localhost:8080/post/account/${username}`, {
        next: { revalidate: 20 },
    });
    const data: Post[] = await res.json();
    console.log(data);
    return data;
}


const User = async ({ params: { userId } }: PageProps) => {
    let all = await fetchPosts(userId);
    return (
        <div>
            <div className='flex'>
                {all.map((post: Post) => (
                    <div className='bg-blue-400 w-56 h-56 my-2 mx-2 overflow-ellipsis rounded-md text-center'>
                        <p>{post.username}</p>
                        <p>{post.title}</p>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default User;