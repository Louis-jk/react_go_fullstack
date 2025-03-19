import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@/types/todo.types";
import { API_TODOS_URL } from '@/config/config';


const TodoList = () => {
	const { data: todos, isLoading } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: () => fetchTodos(),
	});
	
	return (
		<>
			<Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
				Today's Tasks
			</Text>

			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && todos?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 🤞
					</Text>
					<img src='/go.png' alt='Go logo' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{todos?.map((todo: Todo, index: number) => (
					<TodoItem key={index.toString()} todo={todo} />
				))}
			</Stack>
		</>
	);
};

export default TodoList;


const fetchTodos = async () => {
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
};