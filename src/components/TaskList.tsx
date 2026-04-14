import { TaskItem } from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from './data';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="mt-6 min-h-37.5">
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200"
          >
            <span className="text-4xl mb-3">✨</span>
            <p className="text-slate-500 font-medium">Semua tugas di kategori ini sudah beres!</p>
          </motion.div>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </AnimatePresence>
    </div>
  );
}
