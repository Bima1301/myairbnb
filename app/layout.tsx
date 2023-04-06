import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';


const font = Nunito({
  subsets: ['latin'],
})


export const metadata = {
  title: 'Air Bnb',
  description: 'Air Bnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal/>
          <LoginModal/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
