import { API_TODOS_URL } from '@/config/config';
import type { Todo } from '@/types/todo.types';


export const getTodos = async (): Promise<Todo[]> => {
	try {
		const response = await fetch(API_TODOS_URL);
		const data = await response.json();

		if(!response.ok) {
			throw new Error(data.error || "Failed to fetch todos");
		}
		return data || [];
	} catch (error) {
		console.error("Error fetching todos:", error);
		throw error;
	}
}

export const createTodo = async (body: string): Promise<Todo> => {
	try {
		const response = await fetch(API_TODOS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				body,
			}),
		})
		const data = await response.json();

		if(!response.ok) {
			throw new Error(data.error || "Failed to create todo");
		}
		return data;
	} catch(error) {
		console.error("Error creating todo:", error);
		throw new Error(error as string);
	}
}

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
	try {
		const response = await fetch(`${API_TODOS_URL}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				completed,
			}),
		})

		const data = await response.json();
		
		if(!response.ok) {
			throw new Error("Failed to update todo");
		}
		
		return data;
	} catch(error) {
		console.error("Error updating todo:", error);		
		throw new Error("Failed to update todo");
	}
}

export const deleteTodo = async (id: string): Promise<Todo> => {
	try {
		const response = await fetch(`${API_TODOS_URL}/${id}`, {
			method: "DELETE",
		})
		const text = await response.text();
		const data = text ? JSON.parse(text) : null;

		if(!response.ok) {
			throw new Error(data.error || "Failed to delete todo");
		}
		return data;
	} catch(error) {
		console.error("Error deleting todo:", error);		
		throw new Error("Failed to delete todo");
	}
}