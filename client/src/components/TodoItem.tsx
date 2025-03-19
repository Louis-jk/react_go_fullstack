import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { Todo } from "../types/todo.types";
import { useMutation } from '@tanstack/react-query';
import { API_TODOS_URL } from '@/config/config';

const TodoItem = ({ todo }: { todo: Todo }) => {

	console.log(todo);

	const {mutate: updateTodo, isPending: isUpdating} = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: async () => {
			if(todo.completed) return alert("Todo already completed");
		
			try {
				const response = await fetch(`${API_TODOS_URL}/${todo.id}`, {
					method: "PATCH",
				});
				const data = await response.json();

				if(!response.ok) {
					throw new Error(data.error || "Failed to update todo");
				}
				return data;
			} catch (error) {
				console.error("Error updating todo:", error);
			}
		},
	});


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
					color={todo.completed ? "green.200" : "yellow.100"}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorScheme='green'>
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorScheme='yellow'>
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
					{!isUpdating && <FaCheckCircle size={20} />}
					{isUpdating && <Spinner size='sm' />}
				</Box>
				<Box color={"red.500"} cursor={"pointer"}>
					<MdDelete size={25} />
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;