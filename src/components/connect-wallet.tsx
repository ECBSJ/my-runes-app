"use client"

import { authenticate } from "@stacks/connect"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { UserSession } from "@stacks/connect"
import { useEffect, useState } from "react"
import { useSelectedLayoutSegment } from "next/navigation"

export const userSession = new UserSession()

type props = {
  buttonLabel: string
}

export default function ConnectWallet({ buttonLabel }: props) {
  const segment = useSelectedLayoutSegment()

  const [iseConnected, setIsConnected] = useState(false)

  const router = useRouter()

  function connectWallet() {
    authenticate({
      userSession,
      appDetails: {
        icon: "/HiroIcon-Rounded-Orange.png",
        name: "My Runes App"
      },
      onFinish(payload) {
        let userAddress = payload.userSession.loadUserData().profile.btcAddress.p2tr.mainnet
        router.push(`/dashboard?userAddress=${userAddress}`)
        setIsConnected(true)
      }
    })
  }

  function disconnectWallet() {
    userSession.signUserOut()
    setIsConnected(false)

    if (segment === null) {
      window.location.reload()
    } else {
      router.push("/")
    }
  }

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setIsConnected(true)
    }
  }, [])

  if (userSession.isUserSignedIn()) {
    return <Button onClick={disconnectWallet}>Disconnect</Button>
  } else {
    return <Button onClick={connectWallet}>{buttonLabel}</Button>
  }
}
