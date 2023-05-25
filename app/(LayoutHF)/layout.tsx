'use client'
import { Footer, Header, LoadingPopUp } from '@/components/organisms'
import '../../styles/global.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/redux/features/store'
import { SnackbarProvider } from 'notistack'
import 'metadata'

const inter = Inter({
  subsets: ['latin'],
  preload: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <SnackbarProvider>
            <LoadingPopUp />
            <Header />
            {children}
            <Footer />
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  )
}
