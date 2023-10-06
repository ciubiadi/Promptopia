import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                width="30"
                height="30"
                alt="Promptopia Logo"
                className='object-contain'
                src="/assets/images/logo.svg"
            />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Mobile Navigation */}
    </nav>
  )
}

export default Nav