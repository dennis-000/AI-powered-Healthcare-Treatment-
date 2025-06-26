import { IconChevronRight } from '@tabler/icons-react';
import React from 'react';

interface MetricsCardProps {
    title: string;
    subtitle: string;
    value: string | number;
    icon: React.ComponentType<any>;
    onClick: () => void;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
    title,
    subtitle,
    value,
    icon: Icon,
    onClick
}) => (
    <div className='relative'>
    {/* ==== Card Container ==== */}
    <div className='flex flex-col rounded-xl border bg-white shadow-sm
    dark:border-neutral-800 dark:bg-[#13131a]
    '>
        <div className='flex justify-between gap-x-3 p-4 md:p-5'>
            <div>
                <p className='text-xs uppercase tracking-wide text-neutral-500'>
                    {title}
                </p>
                {/* container to contain the value */}
                <div className='mt-1 flex items-center gap-x-2'>
                    <h3 className='text-xl font-medium text-neutral-200 sm:text-2xl'>
                        {value}
                    </h3>
                </div>
            </div>
        </div>
        <div className='flex size-[46px] h-11 w-11
        flex-shrink-0 items-center justify-center rounded-full bg-gray-500 text-blue-200 dark:bg-[#1c1c24]
        absolute top-4 right-4'>
            {/* ==== Icon Container ==== */}
            <Icon size={25} className='text-green-500' />
        </div>
    </div>
    <a href="#"
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
        className='inline-flex items-center justify-between rounded-b-xl border-t px-4 py-3 
        text-sm md:px-5 border-neutral-800 text-neutral-400 hover:bg-neutral-800 w-full'
        >
        {subtitle}
        {/* ==== Icon Container ==== */}
        <IconChevronRight/>
    </a>
</div> 
);

export default MetricsCard;