"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "@/components/icons";
import type { NavigationItem } from "@/types/content";
import { ReservationAction } from "@/components/reservation-action";
import { Wordmark } from "@/components/wordmark";
import { HomeLink } from "@/components/home-link";

export function MobileNavigation({ items, bookingUrl }: { items: NavigationItem[]; bookingUrl: string | null }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="mobile-menu-trigger" aria-label="Open navigation">
        <MenuIcon className="icon" />
        <span>Menu</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-nav-overlay" />
        <Dialog.Content className="mobile-nav" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <div className="mobile-nav-top">
            <Wordmark placement="navigation" />
            <Dialog.Close className="mobile-nav-close" aria-label="Close navigation">
              <CloseIcon className="icon" />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile navigation" className="mobile-nav-links">
            {items.map((item, index) => (
              <Dialog.Close key={item.href} asChild>
                {item.href === "/#top" ? (
                  <HomeLink><span>0{index + 1}</span>{item.label}</HomeLink>
                ) : (
                  <Link href={item.href}><span>0{index + 1}</span>{item.label}</Link>
                )}
              </Dialog.Close>
            ))}
          </nav>
          <div className="mobile-nav-action">
            <ReservationAction bookingUrl={bookingUrl} className="button button-amber button-wide" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
