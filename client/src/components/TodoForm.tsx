import { useState } from "react"
import { Button, Flex, Input, Spinner } from "@chakra-ui/react"
import { IoMdAdd } from 'react-icons/io'

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("")	
	const [isPending, setIsPending] = useState(false)
	
	const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()		
		alert("Todo added!")
	}

	return (
		<form onSubmit={createTodo}>
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
					{isPending ? <Spinner /> : <IoMdAdd />}
				</Button>
			</Flex>
		</form>
	)
}

export default TodoForm