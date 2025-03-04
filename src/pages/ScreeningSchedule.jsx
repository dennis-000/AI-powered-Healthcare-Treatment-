import React from 'react'
import { useLocation } from 'react-router-dom'

const ScreeningSchedule = () => {
    const { state } = useLocation();
    // console.log(state);
  return (
    <div className='w-full overflow-scroll'>
        <p>Kanban</p>
    </div>
  )
}

export default ScreeningSchedule