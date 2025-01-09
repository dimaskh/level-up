import { fetchApi } from '@/shared/utils/api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

export async function getTasks(): Promise<Task[]> {
  return fetchApi<Task[]>('/api/tasks');
}

export async function getTask(id: string): Promise<Task> {
  return fetchApi<Task>(`/api/tasks/${id}`);
}

export async function createTask(task: CreateTaskDto): Promise<Task> {
  return fetchApi<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export async function updateTask(id: string, task: UpdateTaskDto): Promise<Task> {
  return fetchApi<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id: string): Promise<void> {
  await fetchApi(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
