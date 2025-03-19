import { useState } from "react"
import { Button, Flex, Input, Spinner } from "@chakra-ui/react"
import { IoMdAdd } from 'react-icons/io'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo } from '@/services/todoService'

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("")	

	const queryClient = useQueryClient();

	const {mutate: createTodoMutation, isPending: isCreating} = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const result = await createTodo(newTodo);
			setNewTodo("");
			return result;		
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error) => {
			alert(error.message);
		}
	})

	return (
		<form onSubmit={(e) => createTodoMutation(e)}>
			<Flex gap={2}>
				<Input
					type="text" 
					value={newTodo}
					placeholder="Add a new task" 
					onChange={(e) => setNewTodo(e.target.value)}
					ref={input => input?.focus()}
				/>
				<Button 
					type="submit"
					mx={2}
					_active={{ 
						transform: "scale(0.97)"
					}}
				>
					{isCreating ? <Spinner /> : <IoMdAdd />}
				</Button>
			</Flex>
		</form>
	)
}

export default TodoForm