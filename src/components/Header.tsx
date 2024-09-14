import { Button, buttonVariants } from "@/components/ui/button"
import ModeToggle from "./dark-mode-toggle"
import dynamic from 'next/dynamic';
import Link from "next/link";

const ConnectWallet = dynamic(() => import('@/components/connect-wallet'), {
  ssr: false
});

export default function Header() {

  return (
    <header className="flex items-center justify-between px-10 pt-10">
      <div className="flex items-center justify-between gap-x-8">
        <Link href={"/"}>
          <img
            src="/Runes-Logo.png"
            alt="Runes logo"
            width="40"
            height="40"
          />        
        </Link>
        <Link
          href={"/dashboard/activity"}
          className={buttonVariants({ variant: "link" })}
          prefetch={true}
        >
          Activity
        </Link>
        <Link
          href={"/dashboard/balances"}
          className={buttonVariants({ variant: "link" })}
          prefetch={true}
        >
          Balances
        </Link>
        <Link
          href={"/dashboard/recent-block-activity"}
          className={buttonVariants({ variant: "link" })}
          prefetch={true}
        >
          Block
        </Link>
        <Link
          href={"/dashboard"}
          className={buttonVariants({ variant: "link" })}
          prefetch={true}
        >
          Suggested
        </Link>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <ModeToggle />
        <ConnectWallet />
      </div>
    </header>
  )
}
