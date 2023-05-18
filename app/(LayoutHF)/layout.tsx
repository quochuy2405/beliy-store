'use client'
import { Footer, Header } from '@/components/organisms'
import '../../styles/global.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/redux/features/store'
import { SnackbarProvider } from 'notistack'
import 'metadata'

const inter = Inter({ subsets: ['latin'], preload: false })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <SnackbarProvider>
            <Header />
            {children}
            <Footer />
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  )
}
