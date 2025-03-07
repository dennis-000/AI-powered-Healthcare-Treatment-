import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical, IconTrash, IconEdit } from "@tabler/icons-react";

function TaskCard({ task, deleteTask, updateTask }) {
  // State to track whether the mouse is over the task card
  const [mouseIsOver, setMouseIsOver] = useState(false);
  // State to determine if the task is in edit mode
  const [editMode, setEditMode] = useState(false);
  
  // Hook to enable drag-and-drop functionality for the task card
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  // Style object for handling drag animations
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // Display a placeholder while the task is being dragged
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-700 p-3 h-[100px] min-h-[100px] rounded-md opacity-50 border-2 border-blue-500"
      ></div>
    );
  }

  // Render the edit mode UI when enabled
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-gray-700 p-2 h-auto min-h-[100px] rounded-md shadow hover:ring-1 hover:ring-inset hover:ring-blue-500 transition-all flex flex-col"
      >
        <textarea
          className="w-full resize-none bg-gray-700 text-white p-1 outline-none rounded focus:ring-1 focus:ring-blue-500 flex-grow"
          value={task.content}
          autoFocus
          placeholder="Task content here..."
          onBlur={() => setEditMode(false)} // Exit edit mode when clicking outside
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              setEditMode(false); // Save and exit edit mode on Shift+Enter
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>Press Shift+Enter to save</span>
          <button 
            onClick={() => setEditMode(false)}
            className="px-2 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setEditMode(true)} // Enter edit mode on click
      className="bg-gray-700 p-3 h-auto min-h-[100px] rounded-md shadow hover:shadow-md hover:bg-gray-650 cursor-pointer flex items-start gap-2 group"
      onMouseEnter={() => setMouseIsOver(true)} // Show edit/delete buttons when hovered
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {/* Drag handle icon */}
      <IconGripVertical className="text-gray-500 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Task content display */}
      <div className="flex-grow text-gray-200 break-words">
        {task.content || <span className="text-gray-400 italic">Click to add content</span>}
      </div>

      {/* Show edit and delete buttons when hovered */}
      {mouseIsOver && (
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering edit mode when clicking the button
              setEditMode(true);
            }}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <IconEdit className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent unintended click propagation
              deleteTask(task.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <IconTrash className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
