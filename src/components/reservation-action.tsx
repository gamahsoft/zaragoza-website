"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon } from "@/components/icons";

type ReservationActionProps = {
  bookingUrl: string | null;
  className?: string;
  children?: React.ReactNode;
};

export function ReservationAction({ bookingUrl, className = "button button-amber", children = "Reserve a Table" }: ReservationActionProps) {
  if (bookingUrl) {
    return (
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={className}>{children}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby="reservation-description">
          <Dialog.Close className="dialog-close" aria-label="Close reservation preview">
            <CloseIcon className="icon" />
          </Dialog.Close>
          <p className="eyebrow text-amber">Reservations</p>
          <Dialog.Title className="dialog-title">Booking is coming soon.</Dialog.Title>
          <Dialog.Description id="reservation-description" className="dialog-description">
            Online reservations are not available in this preview. Zaragoza’s verified OpenTable link will be connected here after restaurant approval.
          </Dialog.Description>
          <Dialog.Close className="button button-navy">Return to the preview</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
