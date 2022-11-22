import Link from 'next/link';

const Header = () => {
    return (
        <header className='bg-blue-500 p-5 space-x-2'>
            <Link href='/' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                Home
            </Link>
            <Link href='/users' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                Users
            </Link>
            <Link href='/posts' className='px-2 py-1 bg-white text-blue-500 rounded-md'>
                Posts
            </Link>
        </header>
    )
}

export default Header;