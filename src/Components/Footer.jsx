import React from 'react'
import { Box, VStack , Stack, Avatar , Text } from '@chakra-ui/react'
import avtarsrc from '../assets/avtarsrc.jpg'
const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.900"} minH={"48"} px={"16"} py={["16" , "8"]}>
          <Stack direction={["column" , "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
        <Text fontWeight={"bold"}>About Us</Text>
        <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center" , "left"]}> We are the best crypto trading app in India. We provide our guidance at a very nominal price.</Text>
        </VStack>
        <VStack>
        <Avatar boxSize={"28"} mt={["4", "0"]} src= { avtarsrc}/>
        <Text>Our Founder</Text>
        </VStack>
        </Stack>
    </Box>
   
  )
}

export default Footer