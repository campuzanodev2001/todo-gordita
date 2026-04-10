"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task, TaskFormData } from "../types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tasksQuery = query(
      collection(db, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as Task[];
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function addTask(data: TaskFormData) {
    await addDoc(collection(db, "tasks"), {
      title: data.title,
      status: data.status,
      color: data.color,
      notes: data.notes || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      location: data.location || null,
      urgency: data.urgency || null,
      createdAt: serverTimestamp(),
    });
  }

  async function updateTask(id: string, data: Partial<TaskFormData>) {
    await updateDoc(doc(db, "tasks", id), {
      ...data,
      notes: data.notes || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      location: data.location || null,
      urgency: data.urgency || null,
    });
  }

  async function deleteTask(id: string) {
    await deleteDoc(doc(db, "tasks", id));
  }

  return { tasks, loading, addTask, updateTask, deleteTask };
}
