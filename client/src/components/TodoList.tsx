import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@/types/todo.types";
import { getTodos } from '@/services/todoService';

const TodoList = () => {
	const { data: todos, isLoading, error } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: getTodos,
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		retry: 2,
	});

	if(error) {
		return (
			<Stack alignItems="center" spaceY={4}>
				<Text color="red.500">Failed to load tasks</Text>
				<Text fontSize="sm" color="gray.500">Error: {error.message}</Text>
			</Stack>
		)
	}
	
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
				{todos?.map((todo: Todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</Stack>
		</>
	);
};

export default TodoList;