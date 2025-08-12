import { useRef, useState } from 'react'

interface DialogHooksProps {
  onClick?: () => void
  onOpenChange?: (open: boolean) => void
}

function useDialog({
  onClick,
  onOpenChange,
}: DialogHooksProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const trigger = () => {
    setIsOpen(true)
  }

  const dismiss = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const toggle = () => {
    setIsOpen(open => !open)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      onOpenChange?.(true)
      trigger()
    } else {
      onOpenChange?.(false)
      dismiss()
    }
  }

  return {
    triggerProps: {
      ref: triggerRef,
      onClick: () => {
        trigger()
        onClick?.()
      },
    },
    dialogProps: {
      open: isOpen,
      onOpenChange: handleOpenChange,
    },
    trigger,
    dismiss,
    toggle,
    setIsOpen,
  }
}

type UseDialogReturn = ReturnType<typeof useDialog>
export { useDialog }
export type { DialogHooksProps, UseDialogReturn }
