"use client";

import Sidebar from "@/components/Sidebar";
import KanbanBoard from "@/components/KanbanBoard";
import Modal from "@/components/Modal";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const deleteTask = useDeleteTask();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = format(new Date(), "EEEE, d MMMM yyyy");

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <p className="text-gray-600">Failed to load tasks. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
            <p className="text-green-600 font-medium text-sm sm:text-base">{currentDate}</p>
          </div>

          <KanbanBoard
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      {editingTask && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Edit Task"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editingTask.title}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editingTask.description}
                readOnly
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={handleCloseModal}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
