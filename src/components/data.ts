export type TaskStatus = "Selesai" | "In Progress" | "To Do";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
}

export interface Project {
  id: number;
  projectName: string;
  deadline: string;
  team: Array<{ name: string }>;
  tasks: Task[];
}

export const projectData: Project[] = [
  {
    id: 1,
    projectName: "Sistem Analisis Data",
    deadline: "15 Mei 2026",
    team: [{ name: "Rendy" }, { name: "Krisna" }, { name: "Sofyan" }],
    tasks: [
      { id: 101, title: "Desain UI/UX Dashboard", status: "Selesai", assignee: "Rendy", priority: "High" },
      { id: 102, title: "Integrasi Regresi Linier", status: "In Progress", assignee: "Krisna", priority: "High" },
      { id: 103, title: "Implementasi Form PBO", status: "To Do", assignee: "Sofyan", priority: "Medium" },
      { id: 104, title: "Testing & Bug Fixing", status: "To Do", assignee: "Rendy", priority: "Low" },
    ],
  },
  {
    id: 2,
    projectName: "Mobile App Dashboard",
    deadline: "30 Juni 2026",
    team: [{ name: "Desbelion" }, { name: "Rendy" }],
    tasks: [
      { id: 201, title: "Setup Navigation & Routing", status: "Selesai", assignee: "Desbelion", priority: "High" },
      { id: 202, title: "Integrasi REST API", status: "In Progress", assignee: "Rendy", priority: "High" },
      { id: 203, title: "Offline Mode & Storage", status: "To Do", assignee: "Desbelion", priority: "Low" },
    ],
  },
];
