import { Container, Stack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'


function App() {  
  return (
    <Stack h="100vh">
      <Container maxW={"900px"}>
        <Navbar />
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  )
}

export default App
