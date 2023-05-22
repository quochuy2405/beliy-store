'use client'
import LogoSvg from '@/assets/LogoSvg'
import { RootState } from '@/redux/features/store'
import { Popover } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const navigation = {
  pages: [
    { name: 'Trang chủ', href: '/' },
    { name: 'Tất cả sản phẩm', href: '/product' },
    { name: 'Dành cho nữ', href: '/product' },
    { name: 'Dành cho nam', href: '/product' },
    { name: 'Bộ Phối', href: '/product' },
    { name: 'Về chúng tui', href: '/product' }
  ]
}

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart)
  return (
    <header className="sticky bg-white w-full z-40 top-0">
      <div className="flex h-10 items-center justify-start gap-4 bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        <div className="flex items-center">
          <FaTiktok />
        </div>
        <FaFacebook />
        <FaInstagram />
      </div>
      <div className="flex h-10 items-center justify-center bg-white px-4 mt-2 text-sm font-medium text-white sm:px-6 lg:px-8">
        <Link href="/" className="ml-4 flex-1 flex justify-center items-center lg:ml-0" passHref>
          <LogoSvg />
        </Link>
      </div>
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <button type="button" className="rounded-md bg-white p-2 text-gray-400 lg:hidden">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-xs font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </Popover.Group>
            {/* Logo */}
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  href="/login"
                  className="text-xs font-medium text-gray-700 hover:text-gray-800"
                >
                  Đăng nhập
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link
                  href="/register"
                  className="text-xs font-medium text-gray-700 hover:text-gray-800"
                >
                  Đăng ký thành viên
                </Link>
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <Link href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="/purchase/order" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-bold text-gray-700 group-hover:text-gray-800">
                    {cart?.length || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
