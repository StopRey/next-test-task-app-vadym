"use client";

import { Task } from "@/types/task";
import { format } from "date-fns";
import { Clock, MoreVertical } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isCompleted = task.status === "completed";
  const dateColor = isCompleted ? "text-gray-400" : "text-green-600";

  const formattedDate = format(new Date(task.createdAt), "d MMMM");

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-3 hover:shadow-md transition-shadow relative">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <h3 className={`font-semibold text-gray-800 text-sm sm:text-base flex-1 pr-2 ${isCompleted ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </h3>
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <p className={`text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 ${isCompleted ? "line-through text-gray-400" : ""}`}>
        {task.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className={`flex items-center gap-1 ${dateColor}`}>
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{formattedDate}</span>
        </div>

        <div className="flex -space-x-1 sm:-space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full border-2 border-white"
            ></div>
          ))}
        </div>
      </div>

      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
}
