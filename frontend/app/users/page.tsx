import Link from 'next/link';

type Account = {
    username: string;
    bio: string;
}

const fetchUsers = async () => {
    const res = await fetch(`http://localhost:8080/account`, {
        next: { revalidate: 20 },
    });
    const data: Account[] = await res.json();
    console.log(data);
    return data;
}

const Page = async () => {
    let all = await fetchUsers();
    console.log(all);
    return (
        <div>
            <div className='flex'>
                {all.map((user: Account) => (
                    <div className='bg-blue-400 w-56 h-56 my-2 mx-2 overflow-auto rounded-md text-center'>
                        <Link href={`/users/${user.username}`}>{user.username}</Link>
                        <p>{user.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page;