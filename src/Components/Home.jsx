import React from 'react'
import { Box, Text, Image } from "@chakra-ui/react"
import bitcoin  from "../assets/bitcoin.png"

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
     
     <Image w={"full"}
        h={"full"}
        objectFit={"contain"}
        src={bitcoin}
        filter={"grayscale(1)"}
      />
    
      <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.700"} mt={"-20"}>
        Xcrypto
      </Text>
    </Box>
  )
}

export default Home