"use client"

import { showConnect, authenticate } from "@stacks/connect"
import { UserSession } from "@stacks/connect"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export const userSession = new UserSession()

export default function ConnectWallet() {

  const router = useRouter()

  function connectWallet() {
    showConnect({
      userSession,
      appDetails: {
        icon: "/HiroIcon-Rounded-Orange.png",
        name: "My Runes App"
      },
      onFinish(payload) {
        window.location.reload()
      }
    })
  }

  function disconnectWallet() {
    userSession.signUserOut()
    router.push("/")
  }

  if (userSession.isUserSignedIn()) {
    return <Button onClick={disconnectWallet}>Disconnect</Button>
  }

  return <Button onClick={connectWallet}>Connect</Button>
}
