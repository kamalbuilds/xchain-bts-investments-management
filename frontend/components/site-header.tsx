"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectButton } from "thirdweb/react"
import { createWallet, inAppWallet } from "thirdweb/wallets"
import { createThirdwebClient } from "thirdweb"
import { sepolia, polygonAmoy } from 'thirdweb/chains';

export function SiteHeader() {

  const client = createThirdwebClient({ clientId: '427a3ada4b06147ce28a0d8de71e4688' });

  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];


  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">

            <Link href="/" className="text-primary text-[20px] font-[500]">
              Explore Investment Strategies
            </Link>
            <Link href="/mybots" className="text-primary text-[20px] font-[500]">
              My Investment Bots
            </Link>

            <ConnectButton client={client} wallets={wallets} chains={[sepolia, polygonAmoy]} />

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
