import { Button } from "@/components/ui/button"
import ModeToggle from "./dark-mode-toggle"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 pt-10">
      <div className="flex items-center justify-between gap-x-8">
        <img
          src="/HiroIcon-Rounded-Orange.png"
          alt="Hiro logo"
          width="40"
          height="40"
        />
        <Button variant="link">Activity</Button>
        <Button variant="link">Balances</Button>
        <Button variant="link">Block</Button>
        <Button variant="link">Suggested</Button>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <ModeToggle />
        <Button>Connect Wallet</Button>
      </div>
    </header>
  )
}
