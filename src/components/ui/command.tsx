import { useState } from 'react'

import { Command as CommandPrimitive } from 'cmdk'
import { Loader, SearchIcon } from 'lucide-react'

import Dialog from './dialog'
import { KbdKey } from './kbd'
import { cn } from '@/lib/utils'

function CommandRoot({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'relative text-popover-foreground flex size-full flex-col overflow-hidden rounded-md',
        'bg-white/10 border border-white/20 backdrop-blur bg-clip-padding backdrop-filter backdrop-saturate-100 backdrop-contrast-100',
        className,
      )}
      {...props}
    />
  )
}

function CommandDialog({
  children,
  className,
  dialogProps = {
    showCloseButton: true,
  },
  ...props
}: React.ComponentProps<typeof CommandRoot> & {
  dialogProps?: React.ComponentProps<typeof Dialog.Root> & {
    className?: string
    showCloseButton?: boolean
    classNames?: Partial<Record<'close' | 'overlay' | 'content', string>>
  }
}) {
  const { showCloseButton, ...dialogRootProps } = dialogProps
  return (
    <Dialog.Root {...dialogRootProps}>
      <Dialog.Header className="sr-only">
        <Dialog.Title>Command Palette</Dialog.Title>
        <Dialog.Description>Search for a command to run...</Dialog.Description>
      </Dialog.Header>
      <Dialog.Content
        className={cn('overflow-hidden p-0', dialogProps.classNames?.content)}
        classNames={dialogProps.classNames}
        showCloseButton={showCloseButton}
      >
        <CommandRoot
          className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          {...props}
        >
          {children}
        </CommandRoot>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function CommandInput({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  const [isComposing, setIsComposing] = useState(false)
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={(e) => {
          if (isComposing) return
          onKeyDown?.(e)
        }}
      />
    </div>
  )
}

function CommandLoading({
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <CommandPrimitive.Loading
      data-slot="command-loading"
      className="py-6 text-center text-sm"
      {...props}
    >
      {children ?? <Loader className="inline size-4 animate-spin" />}
    </CommandPrimitive.Loading>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className,
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'relative flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm outline outline-hidden outline-glass-border select-none cursor-default ',
        'data-[selected=true]:bg-glass-highlight data-[selected=true]:outline-solid data-[selected=true]:shadow-md data-[selected=true]:shadow-glass-shadow data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0 [&_svg:not([class*=\'text-\'])]:text-muted-foreground [&_svg]:pointer-events-none',
        className,
      )}
      style={{
        // boxShadow:
        // `0 12px 40px 0 rgba(0, 0, 0, 0.25),
        // 0 6px 12px 0 rgba(0, 0, 0, 0.15),
        // inset 1px 1px 0 0 rgba(255, 255, 255, 0.25),
        // inset -1px -1px 0 0 rgba(0, 0, 0, 0.1)`,
      }}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <KbdKey data-slot="command-kbd-key" className={cn('ml-auto px-1', className)} {...props} />
  )
}

interface CommandProps extends React.ComponentProps<typeof CommandRoot> {
  title?: string
  empty?: string
  list?: { name: string, icon?: React.ReactNode, shortcut?: string }[]
  description?: string
  className?: string
  showCloseButton?: boolean
}

function Command({
  empty = 'No results found.',
  list = [],
  ...props
}: CommandProps) {
  return (
    <CommandRoot className="rounded-lg border shadow-md md:min-w-[450px]" {...props}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>{empty}</CommandEmpty>
        {list.map(({ name, icon, shortcut }) => (
          <CommandItem key={name}>
            {icon}
            <span>{name}</span>
            {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
          </CommandItem>
        ))}
      </CommandList>
    </CommandRoot>
  )
}

Command.Root = CommandRoot
Command.Dialog = CommandDialog
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Input = CommandInput
Command.Item = CommandItem
Command.Loading = CommandLoading
Command.List = CommandList
Command.Separator = CommandSeparator
Command.Shortcut = CommandShortcut

interface CommandComponent extends React.FC<CommandProps> {
  Root: typeof CommandRoot
  Dialog: typeof CommandDialog
  Empty: typeof CommandEmpty
  Group: typeof CommandGroup
  Input: typeof CommandInput
  Item: typeof CommandItem
  Loading: typeof CommandLoading
  List: typeof CommandList
  Separator: typeof CommandSeparator
  Shortcut: typeof CommandShortcut
}

export default Command as CommandComponent
export {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  CommandSeparator,
  CommandShortcut,
}
