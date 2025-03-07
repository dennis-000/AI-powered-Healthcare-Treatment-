import React from "react";
import KanbanBoard from "../components/KanbanBoard";
import { useLocation } from "react-router-dom";

const ScreeningSchedule = () => {
  const location = useLocation();
  const state = location.state;

  return (
    <div className="w-full overflow-scroll">
      <KanbanBoard state={state} />
    </div>
  );
};

export default ScreeningSchedule;
