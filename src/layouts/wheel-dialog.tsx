import React from 'react'

import { LifeBuoy } from 'lucide-react'

import Turntable from '@/components/turntable'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { DockIcon } from '@/components/ui/dock/dock'
import { useDialog } from '@/hooks/useDialog'

interface Props extends React.ComponentProps<typeof Dialog> {}

function WheelDialog({ ...props }: Props) {
  const wheelDialog = useDialog()
  return (
    <>
      <Dialog title="wheel" description="wheel description" {...wheelDialog.dialogProps} {...props}>
        <Turntable />
      </Dialog>
      <Button variant="ghost" size="icon" color="accent" {...wheelDialog.triggerProps}>
        <DockIcon>
          <LifeBuoy />
        </DockIcon>
      </Button>
    </>
  )
}

export default WheelDialog
