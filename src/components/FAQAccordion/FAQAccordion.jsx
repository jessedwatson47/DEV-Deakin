import React from 'react'
import { Accordion } from 'radix-ui'
import { ChevronDownIcon } from '@radix-ui/react-icons';

function FAQAccordion() {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="w-[300px] rounded-md border border-zinc-200 bg-white shadow"
      defaultValue="item-1"
    >
      <Accordion.Item value="item-1" className="border-b border-zinc-200">
        <Accordion.Trigger className="font-semibold text-zinc-800 text-sm group flex w-full items-center justify-between px-4 py-3 text-left">
          Is DEV@Deakin only for students?
          <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
        <Accordion.Content className="text-zinc-600 text-sm px-4 pb-4 pt-0">
          Yes. DEV@Deakin is primarily designed for students and teachers to share resources and ideas, promoting collaboration and enhancing their development journey.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2" className="border-b border-zinc-200">
        <Accordion.Trigger className="font-semibold text-zinc-800 text-sm group flex w-full items-center justify-between px-4 py-3 text-left">
          Is it free?
          <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
        <Accordion.Content className="text-zinc-600 text-sm px-4 pb-4 pt-0">
          Viewing content and signing up is free, however, DEV@Deakin requires a Pro subscription to post and communicate with fellow users.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-3">
        <Accordion.Trigger className="font-semibold text-zinc-800 text-sm group flex w-full items-center justify-between px-4 py-3 text-left">
          Lorem Ipsum
          <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
        <Accordion.Content className="text-zinc-600 text-sm px-4 pb-4 pt-0">
          Lorem Ipsum
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default FAQAccordion;