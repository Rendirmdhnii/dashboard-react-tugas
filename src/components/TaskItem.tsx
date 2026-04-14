import { motion, type Variants } from 'framer-motion';
import type { Task } from './data';

interface TaskProps {
  task: Task;
}

export function TaskItem({ task }: TaskProps) {
  const getBadgeStyle = () => {
    if (task.status === "Selesai") return "bg-teal-50 text-teal-600 border-teal-100";
    if (task.status === "In Progress") return "bg-indigo-50 text-indigo-600 border-indigo-100";
    if (task.status === "To Do" && task.priority === "High") return "bg-rose-50 text-rose-600 border-rose-100";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  } satisfies Variants;

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.01, y: -2, transition: { duration: 0.2 } }}
      className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 mb-3 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.status === 'Selesai'
              ? 'bg-linear-to-tr from-teal-400 to-emerald-400 border-transparent shadow-md shadow-teal-200'
              : 'bg-slate-50 border-slate-200 group-hover:border-indigo-300'
          }`}
        >
          {task.status === 'Selesai' && <span className="text-white text-xs font-bold">✓</span>}
        </motion.div>

        <div>
          <p
            className={`font-bold text-sm sm:text-base transition-colors duration-300 ${
              task.status === 'Selesai'
                ? 'text-slate-400 line-through decoration-slate-300'
                : 'text-slate-800 group-hover:text-indigo-600'
            }`}
          >
            {task.title}
          </p>
          <div className="flex gap-2 text-xs text-slate-500 mt-1 font-medium">
            <span className="flex items-center gap-1">
              <span className="text-indigo-400">●</span> {task.assignee}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-0 ml-10 sm:ml-0 flex items-center gap-2">
        <span className={`px-3 py-1 text-[11px] font-bold tracking-wide rounded-full border ${getBadgeStyle()}`}>
          {task.status === 'Selesai' ? 'COMPLETED' : task.priority.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
}
