import type { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { ModalProvider } from '@/context/modalContextProvider';
import { AuthProvider } from '@/context/authContextProvider';
import { ToastProvider } from '@/context/toastContextProvider';

import Navbar from '@/components/UI/navigation/Navbar';
import NoInternet from '@/components/UI/notifications/NoInternet';

import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Authentique',
  description: 'Experience seamless and secure user management with Authentique. Our robust platform offers advanced features such as authentication, authorization, email OTP verification, and Google OAuth with OneTap. Enjoy the flexibility of switching between dark and light modes for your comfort. Stay updated with our catchy notifications, personalize your profile avatar, and manage your devices effortlessly. Join us at Authentique, where security meets convenience.',
}

export default function RootLayout({ children}: {children: React.ReactNode}){

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-slate-900`}>
        <ToastProvider>
          <NoInternet>
            <AuthProvider>
              <ModalProvider>
                <Navbar />
                {children}
              </ModalProvider>
            </AuthProvider>
          </NoInternet>
        </ToastProvider>
        
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      </body>
    </html>
  )
}