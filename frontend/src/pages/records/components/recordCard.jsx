import { IconChevronRight, IconFolder } from '@tabler/icons-react'
import React from 'react'

const RecordCard = ({record, onNavigate}) => {
  return (
    <div className='flex flex-col rounded-xl border shadow-sm border-neutral-800 bg-[#13131a]'>
        <div className='flex gap-x-3 justify-between p-4 md:p-5'>
            <div className='flex gap-x-3 h-11 w-11 flex-shrink-0 items-center rounded-full text-blue-200'>
                <IconFolder size={70} className='text-green-500'/>
            </div>
        </div>
        <a
        href="#"
        onClick={(e) => {
            e.preventDefault()
            onNavigate(record.recordName || record.name)
        }}
        className='inline-flex cursor-pointer justify-between rounded-b-xl border-neutral-800 px-4 py-3 text-sm
        text-neutral-400 md:px-5 hover:bg-neutral-800'
    >
        {record.recordName || record.name}
        <IconChevronRight/>
    </a>
    </div>
  )
}

export default RecordCard