import Link from 'next/link';

const Header = () => {
    return (
        <header className='bg-blue-500 p-5 flex'>
            <div className='flex-1 space-x-2'>
                <Link href='/' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                    Home
                </Link>
                <Link href='/users' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                    Users
                </Link>
                <Link href='/posts' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                    Posts
                </Link>
            </div>
            <div className='space-x-2'>
                <Link href='/createaccount' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                    Make Account
                </Link>
                <Link href='/createpost' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                    Make Post
                </Link>
            </div>
        </header>
    )
}

export default Header;