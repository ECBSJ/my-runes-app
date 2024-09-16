'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { UserSession } from '@stacks/connect';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Bitcoin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ConnectWallet = dynamic(() => import('@/components/connect-wallet'), {
  ssr: false
});

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [userAddress, setUserAddress] = useState<string>("")

  useEffect(() => {
    let userSession = new UserSession()

    if (userSession.isUserSignedIn()) {
      setIsConnected(true)
      setUserAddress(userSession.loadUserData().profile.btcAddress.p2tr.mainnet)
    } else {
      setIsConnected(false)
      setUserAddress("")
    }
  }, [])

  return (
    <main className="flex min-h-[800px] flex-col items-center justify-center p-10 gap-10 text-center">
      <img src="/black-runestone.png" alt="black runestone" width="200" />
      <h1 className='text-7xl font-bold'>Your <span className='text-orange-500'>Runes</span> <br /> Your App</h1>
      <div className='flex items-center justify-between gap-10 text-left'>
        {isConnected ? (
          <>
            <p className='flex items-center justify-start gap-1'><Bitcoin />{userAddress.slice(0, 9) + "..." + userAddress.slice(-9)} </p>
            <Link
              href={{
                pathname: "/dashboard",
                query: {
                  userAddress
                }
              }}
              className={buttonVariants({ variant: "default" })}
              prefetch={true}
            >
              View Dashboard
            </Link>
          </>
        ) : (
          <>
            <p>Connect your Bitcoin Web3 wallet <br />to view your Runes dashboard.</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">View Dashboard</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>First connect your wallet in the top right corner.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
    </main>
  )
}
