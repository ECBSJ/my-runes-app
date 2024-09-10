'use client'

import dynamic from 'next/dynamic';
import { UserSession } from '@stacks/connect';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const ConnectWallet = dynamic(() => import('@/app/utils/ConnectWallet'), {
  ssr: false
});

export default function Home() {
  const [walletSession, setWalletSession] = useState<any>()

  useEffect(() => {
    const userSession = new UserSession()
    setWalletSession(userSession)
  }, [])

  function loadUserData() {
    console.log(walletSession?.loadUserData())
  }

  if (walletSession?.isUserSignedIn()) {
    return (
      <main className="flex min-h-[800px] flex-col items-center justify-center p-10 gap-10 text-center">

      <div className='flex items-center justify-between gap-10 text-left'>
        <p>🚀 You're connected.</p>
        <Link
          href={"/dashboard"}
          className={buttonVariants({ variant: "default" })}
          prefetch={true}
        >
          View Dashboard
        </Link>
      </div>

    </main>
    )
  }

  return (
    <main className="flex min-h-[800px] flex-col items-center justify-center p-10 gap-10 text-center">

      <h1 className='text-7xl font-bold'>Your <span className='text-orange-500'>Runes</span> <br /> Your App</h1>
      <div className='flex items-center justify-between gap-10 text-left'>
        <p>Connect your Bitcoin Web3 wallet <br />to view your Runes dashboard.</p>
        <ConnectWallet />
      </div>

    </main>
  )
}
