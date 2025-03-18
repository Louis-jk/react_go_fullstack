import { Box, Flex, Button, Text, Container } from "@chakra-ui/react";
import { useColorModeValue } from './ui/color-mode'
import { LuMoon, LuSun } from "react-icons/lu"
import { useColorMode } from "@/components/ui/color-mode"



const Navbar = () => {
	const { toggleColorMode, colorMode } = useColorMode()

  return (		
		<Box bg={useColorModeValue("blue.100", "blue.700")} px={4} py={2} my={4} borderRadius={"5"}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				{/* LEFT SIDE */}
				<Flex
					justifyContent={"center"}
					alignItems={"center"}
					gap={3}
					display={{ base: "none", sm: "flex" }}
				>
					<img src='/images/react.png' alt='logo' width={50} height={50} style={{ userSelect: "none", pointerEvents: "none" }} />
					<Text fontSize={"40"}>+</Text>
					<img src='/images/go-lang.png' alt='logo' width={40} height={40} style={{ userSelect: "none", pointerEvents: "none" }} />					
				</Flex>

				{/* RIGHT SIDE */}
				<Flex alignItems={"center"} gap={3}>
					<Text fontSize={"lg"} fontWeight={500}>
						Daily Tasks
					</Text>
					{/* Toggle Color Mode */}
					<Button type='button' onClick={toggleColorMode}>
					{colorMode === "light" ? <LuMoon /> : <LuSun />}
					</Button>
				</Flex>
			</Flex>
		</Box>	
  )
}

export default Navbar