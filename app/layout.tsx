import {Nunito} from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';


const font = Nunito({
  subsets : ['latin'],
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
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
