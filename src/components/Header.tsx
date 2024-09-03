import { Button } from "@/components/ui/button"

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
        <span>Activity</span>
        <span>Balances</span>
        <span>Block</span>
        <span>Suggested</span>
      </div>
      <Button>Connect Wallet</Button>
    </header>
  )
}
