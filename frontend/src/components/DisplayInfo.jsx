import React, { useState } from 'react'
import MetricsCard from './MetricsCard';
import { IconCircleDashedCheck, IconFolder, IconHourglassHigh, IconUserScan } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { MdFitScreen, MdPendingActions } from "react-icons/md";

const DisplayInfo = () => {

    const navigate = useNavigate();
    const [metrics, setMetrics] = useState ({
        totalFolders: 0,
        aiPersonalizedTreatment: 0,
        totalScreening: 0,
        completedScreenings: 0,
        pendingScreenings: 0,
        overdueScreening: 0,
    })

    // Have to define the data in the MetricsCard, put everything into an array
    // Create a data for each metric card and render to the metric card component - for cleaner code
    // So creating an array of objects
    const metricsData = [
        {
            title: 'Specialist Appointment Pending',
            subtleTitle: 'View',
            value: metrics.pendingScreenings,
            icon: IconHourglassHigh,
            onClick: () => navigate('/appointments/pending')
        },
        {
            title: 'Treatment Progress Update',
            subtleTitle: 'View',
            value: `${metrics.completedScreenings} of ${metrics.totalScreening}`,
            icon: IconCircleDashedCheck,
            onClick: () => navigate('/appointments/progress'),
        },
        {
            title: 'Total Folders',
            subtleTitle: 'View',
            value: metrics.totalFolders,
            icon: IconFolder,
            onClick: () => navigate('/folders'),
        },
        {
            title: 'Total Screenings',
            subtleTitle: 'View',
            value: metrics.totalScreenings,
            icon: IconUserScan,
            onClick: () => navigate('/screenings'),
        },
        {
            title: 'Completed Screenings',
            subtleTitle: 'View',
            value: metrics.completedScreenings,
            icon: MdFitScreen,
            onClick: () => navigate('/screenings/completed'),
        },

        {
            title: 'Pending Screenings',
            subtleTitle: 'View',
            value: metrics.pendingScreenings,
            icon: MdPendingActions,
            onClick: () => navigate('/screenings/pending'),
        },
        {
            title: 'Overdue Screenings',
            subtleTitle: 'View',
            value: metrics.overdueScreenings,
            icon: MdPendingActions,
            onClick: () => navigate('/screenings/overdue'),
        },
        
    ];
  return (
    // Two DIVS Upper and lower one with different number of elements
    <div className='flex flex-wrap gap-[26px]'>
        {/* Upper div */}
        <div className='lg:mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2'>
            {/* slice the first 2 data and loop through them  */}
            {metricsData.slice(0,2).map((metric)=> (
                <MetricsCard
                    key={metric.title} {...metric}
                />
            ))}
        </div>
            {/* Lower div */}
        <div className='mt-[9px] grid w-full gap-4 sm:grid-cols sm:gap-6 lg:grid-cols-4'>
            {metricsData.slice(2).map((metric)=> (
                <MetricsCard
                    key={metric.title} {...metric}
                />
            ))}
        </div>
            
    </div>
  )
}

export default DisplayInfo