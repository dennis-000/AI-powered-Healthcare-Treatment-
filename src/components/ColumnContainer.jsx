import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { SortableContext } from "@dnd-kit/sortable";
import { IconGripVertical, IconTrash, IconPlus, IconEdit } from "@tabler/icons-react";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Extract task IDs for sortable context
  const tasksIds = tasks.map((task) => task.id);

  // Enable drag-and-drop functionality for columns
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  // Style for draggable column
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // Display a placeholder while dragging
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[300px] h-[500px] max-h-[500px] rounded-md bg-gray-700 opacity-40 border-2 border-blue-500"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Column Header - Contains title, edit option, and delete button */}
      <div
        {...attributes}
        {...listeners}
        className="bg-gray-800 text-gray-200 rounded-t-md p-3 font-bold flex items-center justify-between border-b border-gray-700"
      >
        <div className="flex items-center gap-2">
          {/* Drag handle icon */}
          <IconGripVertical className="text-gray-500 cursor-grab" />
          
          {/* Editable column title */}
          {editMode ? (
            <input
              className="bg-gray-700 px-2 py-1 rounded w-full outline-none focus:border-blue-500 border border-gray-600"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditMode(false);
              }}
            />
          ) : (
            <div
              onClick={() => setEditMode(true)}
              className="flex gap-2 items-center"
            >
              {column.title}
              {isHovered && (
                <IconEdit className="w-4 h-4 text-gray-500 cursor-pointer" />
              )}
            </div>
          )}
        </div>
        
        {/* Delete column button */}
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <IconTrash className="w-5 h-5" />
        </button>
      </div>

      {/* Column Task Counter - Shows number of tasks */}
      <div className="px-3 py-2 text-sm text-gray-400 border-b border-gray-700 flex justify-between items-center">
        <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
        {tasks.length > 0 && (
          <div className="h-2 w-24 bg-gray-700 rounded overflow-hidden">
            {/* Progress bar indicating task count */}
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${(tasks.length / 10) * 100}%` }} 
              title={`${tasks.length}/10 tasks`}
            ></div>
          </div>
        )}
      </div>

      {/* Column Content - List of Tasks */}
      <div className="flex-grow flex flex-col gap-2 p-2 overflow-y-auto custom-scrollbar">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Column Footer - Add Task Button */}
      <button
        className="flex justify-center items-center gap-2 p-2 border-t border-gray-700 hover:bg-gray-700 transition-colors rounded-b-md text-gray-300"
        onClick={() => createTask(column.id)}
      >
        <IconPlus className="w-4 h-4" />
        <span>Add Task</span>
      </button>
    </div>
  );
}

export default ColumnContainer;
