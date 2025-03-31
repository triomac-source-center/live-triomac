import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import '@/styles/tailwind.css'
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { dark } from '@clerk/themes'


export const metadata = {
  title: {
    template: '%s - TaxPal',
    default: 'TaxPal - Accounting made simple for small businesses',
  },
  description:
    'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html
        lang="en"
        className={clsx(
          'h-full scroll-smooth bg-white antialiased',
          inter.variable,
          lexend.variable,
        )}
      >
        <body className="flex h-screen flex-col bg-gray-900">
          <ClerkLoading>
            <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center">
              <p className="text-2xl font-bold text-gray-800">Loading...</p>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  )
}
