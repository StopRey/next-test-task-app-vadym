"use client";

import { Task, TaskStatus } from "@/types/task";
import TaskCard from "./TaskCard";
import { useUpdateTask } from "@/hooks/useTasks";

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  "to-do": { label: "To do", color: "bg-blue-50" },
  "in-progress": { label: "In progress", color: "bg-yellow-50" },
  review: { label: "Review", color: "bg-purple-50" },
  completed: { label: "Completed", color: "bg-green-50" },
};

export default function KanbanBoard({ tasks, onEditTask, onDeleteTask }: KanbanBoardProps) {
  const updateTask = useUpdateTask();

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t.id === taskId);
    
    if (task && task.status !== targetStatus) {
      updateTask.mutate({ id: taskId, task: { status: targetStatus } });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {Object.entries(statusConfig).map(([status, config]) => {
        const statusTasks = getTasksByStatus(status as TaskStatus);
        const isEmpty = statusTasks.length === 0;

        return (
          <div
            key={status}
            className="flex flex-col"
            onDrop={(e) => handleDrop(e, status as TaskStatus)}
            onDragOver={handleDragOver}
          >
            <div className={`${config.color} rounded-t-lg px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4`}>
              <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                {config.label} ({statusTasks.length})
              </h2>
            </div>

            <div className="flex-1 min-h-[200px]">
              {statusTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-move"
                >
                  <TaskCard
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                </div>
              ))}

              {isEmpty && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
                  <p className="text-gray-400 text-sm">No tasks</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
