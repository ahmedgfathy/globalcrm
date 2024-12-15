'use client'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { useTranslation } from '@/app/context/TranslationContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoMdClose } from 'react-icons/io'
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { lists } from './data.js'
import { Button } from '@/components/ui/button'
import { signOut } from '../../../actions/auth'
import { UserContext } from '@/app/context/UserContext'
import Link from 'next/link'

function Menu() {
  const [showDrawer, setShowDrawer] = useState(false)
  const { t, locale } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const [state, setState] = useContext(UserContext)
  const drawerRef = useRef(null)

  const toggleDrawer = () => setShowDrawer((prev) => !prev)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShowDrawer(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setState({ userData: {} }) // Clear user data in context
      toast({
        variant: 'success',
        title: 'Signed Out',
        description: 'You have been signed out successfully.',
        status: 'success',
      })
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        variant: 'destructive',
        title: 'Error Signing Out',
        description: error.message || 'There was an issue signing out.',
        status: 'error',
      })
    }
  }

  return (
    <div className='drawer' dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className='container mx-auto relative flex items-center'>
        <button onClick={toggleDrawer} className=' '>
          <img
            class='w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
            src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
            alt='Bordered avatar'
          />
        </button>

        <div
          ref={drawerRef}
          className={`fixed top-0 left-0
           z-40 h-screen p-4  menu-drawer flex flex-col justify-between shadow-xl w-80 transition-transform duration-500 ${
             showDrawer ? 'translate-x-0' : '-translate-x-full'
           }`}
          aria-labelledby='drawer-label'
        >
          <div className='header border-b border-gray-200 pb-4 flex flex-col justify-center items-center'>
            <button onClick={toggleDrawer} className='w-full text-start'>
              <IoMdClose />
            </button>
            <Avatar className='border border-red-600 w-24 h-24'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='text-center'>
              <h1 className='text-lg font-bold'>Admin</h1>
              <h3 className='text-lg font-bold'>email@email.com</h3>
            </div>
          </div>

          <ul className='flex flex-col gap-2 mb-4'>
            {lists.map((list) => (
              <li
                key={list.id}
                className='hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer py-2 flex gap-3 items-center rounded-md text-gray-900 dark:text-gray-200  dark:hover:text-dark'
              >
                <Link
                  href={`/user/${list.link}`}
                  className='w-full flex items-center gap-2'
                >
                  <span>{list.icon()}</span>
                  <span className='text-lg'>{t(list.name)}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Button
            className='w-full text-red-800 bg-red-400 hover:bg-red-500 text-xl font-bold'
            onClick={handleSignOut}
          >
            {t('log_out')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Menu
