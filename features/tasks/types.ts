import { Timestamp } from "firebase/firestore";

export type TaskStatus = "todo" | "in-progress" | "done";

export type UrgencyLevel = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  color: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  urgency?: UrgencyLevel;
  createdAt: Timestamp;
}

export interface TaskFormData {
  title: string;
  status: TaskStatus;
  color: string;
  notes: string;
  startDate: string;
  endDate: string;
  location: string;
  urgency: UrgencyLevel | "";
}
