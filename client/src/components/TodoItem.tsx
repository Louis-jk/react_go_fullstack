import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { Todo } from "../types/todo.types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, updateTodo } from '@/services/todoService';

const TodoItem = ({ todo }: { todo: Todo }) => {

	const queryClient = useQueryClient();
	const isLoading = queryClient.isMutating() > 0;

	const {mutate: updateTodoMutation, isPending: isUpdating} = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: async () => {
			if(isLoading) return alert("Please wait for the current operation to complete");
			
			const result = await updateTodo(todo.id, !todo.completed);
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error) => {
			alert(error.message);
		}
	});

	const {mutate: deleteTodoMutation, isPending: isDeleting} = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: async () => {
			if(isLoading) return alert("Please wait for the current operation to complete");

			const result = await deleteTodo(todo.id);
			return result;
		},
		onSuccess: () => {
			queryClient.setQueryData(["todos"], (oldData: Todo[]) => oldData.filter((t) => t.id !== todo.id));
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error) => {
			alert(error.message);
		}
	})

	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={todo.completed ? "grey.200" : "black.100"}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' bg="black.100" color="yellow.600">
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' bg="black.100" color="green.500">
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={todo.completed ? "green.500" : "gray.400"} cursor={"pointer"} onClick={() => updateTodoMutation()}>
					{!isUpdating ? <FaCheckCircle size={20} /> : <Spinner size='sm' />}					
				</Box>
				<Box color={"gray.300"} cursor={"pointer"} onClick={() => deleteTodoMutation()}>
					{!isDeleting ? <MdDelete size={25} /> : <Spinner size='sm' />}					
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;