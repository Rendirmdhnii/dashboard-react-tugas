import { useState } from 'react';
import { TaskList } from './TaskList';
import { motion } from 'framer-motion';
import type { Project, TaskStatus } from './data';

export function ProjectCard({ project }: { project: Project }) {
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "Semua">("Semua");
  const completedTasks = project.tasks.filter((t) => t.status === "Selesai").length;
  const progressPercent = project.tasks.length === 0 ? 0 : Math.round((completedTasks / project.tasks.length) * 100);

  const filteredTasks = filterStatus === "Semua"
    ? project.tasks
    : project.tasks.filter((task) => task.status === filterStatus);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
       className="bg-white/80 backdrop-blur-xl p-8 rounded-4xl border border-white/40 shadow-[0_20px_50px_-12px_rgb(0,0,0,0.05)] relative overflow-hidden"
    >
      <div className="pb-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {project.projectName}
          </h2>
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            {project.deadline}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Progress</span>
            <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-violet-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl w-max border border-slate-100">
        {["Semua", "To Do", "In Progress", "Selesai"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as TaskStatus | "Semua")}
            className={`relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${
              filterStatus === status ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {filterStatus === status && (
              <motion.div
                layoutId={`activeFilterLight-${project.id}`}
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-100 -z-10"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            {status}
          </button>
        ))}
      </div>

      <TaskList tasks={filteredTasks} />
    </motion.div>
  );
}
