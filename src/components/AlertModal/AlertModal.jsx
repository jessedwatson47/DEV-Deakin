import { AlertDialog } from "radix-ui";

import React from 'react'

function AlertModal({trigger, title, descText, descInput, action, onClick}) {
  return (
    <AlertDialog.Root>
		<AlertDialog.Trigger asChild>
			<button className="cursor-pointer text-zinc-400 hover:text-zinc-600" type="button">{trigger}</button>
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
			<AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-xl min-w-[20dvw]">
				<AlertDialog.Title className="font-semibold">
					{title}
				</AlertDialog.Title>
				<AlertDialog.Description className="mt-4 mb-4 text-sm text-zinc-600 flex flex-col gap-2">
					{descText}
					{descInput}
				</AlertDialog.Description>
				<div className="flex justify-end gap-6">
					<AlertDialog.Cancel asChild>
						<button className="text-zinc-600 cursor-pointer" type="button">Cancel</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className="bg-teal-600 rounded p-2 text-white cursor-pointer hover:bg-teal-500" type="button" onClick={onClick}>{action}</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
  )
}

export default AlertModal