type PageProps = {
    params: {
        userId: string;
    }
}

const User = async ({ params: { userId } }: PageProps) => {
    return (
        <div>
            <p>In User {userId}</p>
        </div>
    )
}

export default User;