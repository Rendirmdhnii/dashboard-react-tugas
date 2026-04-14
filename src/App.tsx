import { projectData } from './components/data';
import { ProjectCard } from './components/ProjectCard';
import { motion, type Variants } from 'framer-motion';

export default function App() {
  const allTasks = projectData.flatMap((p) => p.tasks);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300 } },
  } satisfies Variants;

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans p-4 sm:p-8 relative overflow-hidden text-slate-800">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center md:text-left mb-16 pt-8">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
            Project Kelompok 1<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-pink-500">.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl">
            Tinggalkan cara lama. Kelola proyek tim Anda dengan visualisasi data yang elegan, cepat, dan intuitif.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total", count: allTasks.length, icon: "📦", color: "from-slate-100 to-slate-50" },
            { label: "Selesai", count: allTasks.filter((t) => t.status === "Selesai").length, icon: "🎉", color: "from-teal-50 to-emerald-50" },
            { label: "Proses", count: allTasks.filter((t) => t.status === "In Progress").length, icon: "⚡", color: "from-indigo-50 to-blue-50" },
            { label: "Tertunda", count: allTasks.filter((t) => t.status === "To Do").length, icon: "🎯", color: "from-rose-50 to-pink-50" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-linear-to-br ${stat.color} border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-4xl p-6 flex flex-col justify-between h-40`}
            >
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-4xl font-black text-slate-800 tracking-tighter">{stat.count}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pb-20">
          {projectData.map((projectItem) => (
            <ProjectCard key={projectItem.id} project={projectItem} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
