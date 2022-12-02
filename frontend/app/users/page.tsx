import Link from 'next/link';

type Account = {
    username: string;
    bio: string;
}

const fetchUsers = async () => {
    const res = await fetch('http://localhost:8080/account', {
        next: { revalidate: 20 },
    });
    const data: Account[] = await res.json();
    return data;
}

const Page = async () => {
    let all = await fetchUsers();
    console.log(all);
    return (
        <div>
            <div className='flex overflow-auto'>
                {all.map((user: Account) => (
                    <div className='bg-blue-400 w-56 h-56 my-2 mx-2 rounded-md text-center' key={user.username}>
                        <Link href={`/users/${user.username}`} className='font-bold text-center text-xl text-blue-900 hover:text-blue-700'>{user.username}</Link>
                        <p className='text-ellipsis overflow-hidden'>{user.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page;