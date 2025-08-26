import React, { useState } from 'react'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from 'radix-ui';

function SearchBar({ divClassName, inputClassName, buttonClassName, dropDown, dropDown1, dropDown2, dropDown3, dropDown4, filterOption, handleQuery, handleFilterOption, handleChange, query  }) {

  return (
    <>
    {dropDown
        ? 
            <div className={`flex ${divClassName}`}>
                <div className="p-1 ring-zinc-300 text-center ring-1 text-zinc-500 flex items-center gap-1">
                    {filterOption}
                    {/* Drop Down */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="hover:bg-zinc-100 p-2 cursor-pointer" aria-label="User Menu">
                            <MixerHorizontalIcon className="text-zinc-500 w-full h-full"/>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="flex flex-col gap-2 bg-gray-100 p-4 shadow-md" sideOffset={5}>
                        {/* Dropdown Menu Items */}

                        <DropdownMenu.Item className="text-black self-center">
                        <button className="px-2 py-1 cursor-pointer hover:bg-zinc-200" onClick={handleFilterOption}>{dropDown1}</button>
                        </DropdownMenu.Item>

                        
                        <DropdownMenu.Item className="text-black self-center">
                        <button className="px-2 py-1 cursor-pointer hover:bg-zinc-200" onClick={handleFilterOption}>{dropDown2}</button>
                        </DropdownMenu.Item>

                        <DropdownMenu.Item className="text-black self-center">
                        <button className="px-2 py-1 cursor-pointer hover:bg-zinc-200" onClick={handleFilterOption}>{dropDown3}</button>
                        </DropdownMenu.Item>
                        

                        <DropdownMenu.Item className="text-black self-center">
                        <button className="px-2 py-1 cursor-pointer hover:bg-zinc-200" onClick={handleFilterOption}>{dropDown4}</button>
                        </DropdownMenu.Item>

                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
                </div>
                <input className={inputClassName} type="text" name="query" value={query} onChange={handleChange}/>
                
                
                <button className={buttonClassName} onClick={handleQuery}><MagnifyingGlassIcon className="w-6 h-6 text-zinc-500 hover:text-zinc-700"/></button>
            </div>
        :
            <div className={`flex ${divClassName}`}>
                <input className={inputClassName} type="text" name="query" value={query} onChange={handleChange}/>
                <button className={buttonClassName} onClick={handleQuery}><MagnifyingGlassIcon className="w-6 h-6 text-zinc-500 hover:text-zinc-700"/></button>
            </div>
    }
    </>
  )
}

export default SearchBar