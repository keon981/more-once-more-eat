import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

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
        'text-popover-foreground flex size-full flex-col overflow-hidden rounded-md',
        'bg-white/10 border border-white/20 backdrop-blur bg-clip-padding backdrop-filter backdrop-saturate-100 backdrop-contrast-100',
        className,
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog.Root> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Header className="sr-only">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Content
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <CommandRoot className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </CommandRoot>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
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
      />
    </div>
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
        'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <KbdKey data-slot="command-kbd-key" {...props} />
  )
}

interface CommandProps extends React.ComponentProps<typeof CommandRoot> {
  title?: string
  empty?: string
  list?: { key: string, name: string, icon: React.ReactNode, shortcut?: string }[]
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
        {list.map(({ key, name, icon, shortcut }) => (
          <CommandItem key={key}>
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
