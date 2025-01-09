import { useCallback } from 'react';
import { useAsync } from '@/shared/hooks/use-async';
import * as tasksApi from '../api/tasks';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

export function useTasks() {
  const {
    data: tasks,
    loading,
    error,
    execute: fetchTasks,
  } = useAsync<Task[], []>(tasksApi.getTasks);

  const createTask = useCallback(async (taskData: CreateTaskDto) => {
    const newTask = await tasksApi.createTask(taskData);
    fetchTasks();
    return newTask;
  }, [fetchTasks]);

  const updateTask = useCallback(async (id: string, taskData: UpdateTaskDto) => {
    const updatedTask = await tasksApi.updateTask(id, taskData);
    fetchTasks();
    return updatedTask;
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id: string) => {
    await tasksApi.deleteTask(id);
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
}
