import React from 'react'
import { Dialog } from 'radix-ui'
import { Cross2Icon } from '@radix-ui/react-icons'

function Modal({trigger, triggerClass, title, titleClass, desc, descClass, open, onOpenChange}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
		<Dialog.Trigger asChild>
			<button className={triggerClass}>{trigger}</button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 transparent"/>
			<Dialog.Content className="ring-1 ring-zinc-200 bg-white rounded shadow-2xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90dvw] max-w-[500px] max-h-[85dvh] p-[25px]">
				<Dialog.Title className={titleClass}>{title}
                    <Dialog.Close asChild>
                        <button className="hover:bg-zinc-200 rounded p-2 float-right cursor-pointer" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Title>
                
				<Dialog.Description className={descClass}>
					{desc}
				</Dialog.Description>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
  )
}

export default Modal