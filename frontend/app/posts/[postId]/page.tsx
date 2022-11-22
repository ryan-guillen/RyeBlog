type PageProps = {
    params: {
        postId: string;
    }
}

type Spring = {
    id: number;
    content: string;
}

const fetchSpring = async (name: string) => {
    const res = await fetch(`http://localhost:8080/greeting?name=${name}`);
    const data: Spring = await res.json();
    console.log(data);
    return data;
}

const Post = async ({ params: { postId } }: PageProps) => {
    const r = await (fetchSpring('ryan'));

    return (
        <div>
            In post {postId} {r.id} {r.content}
        </div>
    )
}

export default Post;