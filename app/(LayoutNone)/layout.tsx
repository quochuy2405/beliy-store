'use client'
import { Provider } from 'react-redux'
import '../../styles/global.css'
import { Inter } from 'next/font/google'
import store from '@/redux/features/store'
import 'metadata'
import { LoadingPopUp } from '@/components/organisms'

const inter = Inter({ subsets: ['latin'], preload: false })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          {children} <LoadingPopUp />
        </Provider>
      </body>
    </html>
  )
}
