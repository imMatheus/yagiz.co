'use client'

import Link from 'next/link'
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react"
import type { HeaderItem } from '@/ui/components/layout-header'
import { MenuIcon, XIcon } from 'lucide-react'
import clsx from "clsx"

const MobileNavigationContext = createContext<[
  boolean,
  Dispatch<SetStateAction<boolean>>
] | undefined>(undefined)

export function MobileNavigationContextProvider({ children }: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <MobileNavigationContext.Provider value={[open, setOpen]}>
      {children}
    </MobileNavigationContext.Provider>
  )
}

export function useMobileNavigationToggle() {
  const context = useContext(MobileNavigationContext)
  if (context === undefined) {
    throw new Error('useMobileNavigationToggle must be used within a MobileNavigationContextProvider')
  }
  return context
}

export function MobileNavigationToggle({ items }: { items: HeaderItem[] }) {
  const [open, setOpen] = useMobileNavigationToggle()

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      <div className={clsx(
        'bg-white h-mobile-overlay left-0 pt-12 absolute top-navigation-bar w-full z-navigation-bar z-[90] overflow-y-auto',
        { hidden: !open }
      )}>
        <div className='mx-auto max-w-[calc(1130px+8vw)] px-[4vw] w-full'>
          <nav className='flex flex-col gap-[1.5rem]'>
            {items.map(item => (
              <Link
                href={item.href}
                key={item.href}
                className='text-3xl text-right font-bold'
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
