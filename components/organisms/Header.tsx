'use client'
import { RootState } from '@/redux/features/store'
import { Popover } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const navigation = {
  pages: [
    { name: 'Cửa hàng', href: '/product' },
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
          <svg
            width="208"
            height="50"
            viewBox="0 0 208 83"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.587 64.648C24.377 64.648 19.976 61.921 17.384 56.467V64H0.212V10.621L17.384 8.11V31.033C18.734 28.171 20.489 26.092 22.649 24.796C24.809 23.5 27.428 22.852 30.506 22.852C34.124 22.852 37.445 23.77 40.469 25.606C43.547 27.388 45.95 29.872 47.678 33.058C49.46 36.244 50.351 39.808 50.351 43.75C50.351 47.638 49.433 51.175 47.597 54.361C45.815 57.547 43.385 60.058 40.307 61.894C37.283 63.73 34.043 64.648 30.587 64.648ZM25.403 51.85C27.617 51.85 29.507 51.04 31.073 49.42C32.639 47.8 33.422 45.91 33.422 43.75C33.422 41.482 32.612 39.565 30.992 37.999C29.426 36.433 27.563 35.65 25.403 35.65C23.189 35.65 21.299 36.433 19.733 37.999C18.167 39.511 17.384 41.32 17.384 43.426V43.75C17.384 46.018 18.167 47.935 19.733 49.501C21.353 51.067 23.243 51.85 25.403 51.85ZM77.5075 64.648C73.0255 64.648 69.0295 63.757 65.5195 61.975C62.0635 60.139 59.3635 57.655 57.4195 54.523C55.4755 51.337 54.5035 47.746 54.5035 43.75C54.5035 39.646 55.5025 36.001 57.5005 32.815C59.4985 29.629 62.1985 27.172 65.6005 25.444C69.0025 23.716 72.7825 22.852 76.9405 22.852C80.9365 22.852 84.3385 23.743 87.1465 25.525C90.0085 27.253 92.1415 29.629 93.5455 32.653C94.9495 35.623 95.6515 38.971 95.6515 42.697C95.6515 43.669 95.5975 44.371 95.4895 44.803L71.1895 47.962C71.8375 49.852 72.8905 51.229 74.3485 52.093C75.8065 52.903 77.7235 53.308 80.0995 53.308C83.7715 53.308 87.7405 52.363 92.0065 50.473L94.0315 61.327C89.0095 63.541 83.5015 64.648 77.5075 64.648ZM83.0965 37.756C82.2325 34.354 80.1805 32.653 76.9405 32.653C74.9965 32.653 73.4575 33.382 72.3235 34.84C71.1895 36.298 70.5955 38.188 70.5415 40.51L83.0965 37.756ZM115.793 64.648C111.203 64.648 107.639 63.217 105.101 60.355C102.617 57.439 101.375 53.47 101.375 48.448V10.621L118.466 8.11V47.233C118.466 48.745 118.817 49.852 119.519 50.554C120.275 51.202 121.571 51.526 123.407 51.526C124.757 51.526 126.08 51.202 127.376 50.554L127.943 61.894C124.325 63.73 120.275 64.648 115.793 64.648ZM146.406 64.648C141.87 64.648 138.333 63.19 135.795 60.274C133.257 57.358 131.988 53.389 131.988 48.367V23.419H149.16V47.638C149.16 48.88 149.484 49.852 150.132 50.554C150.834 51.202 151.725 51.526 152.805 51.526C153.885 51.526 154.992 51.202 156.126 50.554L157.017 61.813C155.829 62.731 154.263 63.433 152.319 63.919C150.429 64.405 148.458 64.648 146.406 64.648ZM140.574 17.344C138.036 17.344 135.876 16.561 134.094 14.995C132.366 13.375 131.502 11.404 131.502 9.082C131.502 6.76 132.42 4.816 134.256 3.25C136.092 1.684 138.198 0.900996 140.574 0.900996C143.058 0.900996 145.191 1.711 146.973 3.331C148.809 4.951 149.727 6.868 149.727 9.082C149.727 11.458 148.809 13.429 146.973 14.995C145.137 16.561 143.004 17.344 140.574 17.344ZM182.963 82.549C179.993 82.549 177.158 82.252 174.458 81.658L175.754 69.67C177.86 69.994 179.804 70.156 181.586 70.156C184.772 70.156 187.202 69.184 188.876 67.24C190.55 65.35 191.414 61.759 191.468 56.467C188.66 61.867 184.151 64.567 177.941 64.567C172.703 64.567 168.599 62.731 165.629 59.059C162.713 55.333 161.255 50.203 161.255 43.669V23.419H178.265V46.18C178.265 48.016 178.778 49.555 179.804 50.797C180.83 51.985 182.234 52.579 184.016 52.579C185.852 52.579 187.337 51.796 188.471 50.23C189.659 48.664 190.253 46.612 190.253 44.074V23.419H207.344V53.713C207.344 63.109 205.238 70.264 201.026 75.178C196.814 80.092 190.793 82.549 182.963 82.549Z"
              fill="black"
            />
          </svg>
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
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cart?.length || 0}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
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
