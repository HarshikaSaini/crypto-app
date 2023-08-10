import React from 'react'
import { Link } from 'react-router-dom';
import { Heading, Text, VStack, Image } from '@chakra-ui/react';

const CoinCard = ({ name, symbol, img, price, id , currencySymbol="₹" }) => (
    <Link to={`/coin/${id}`}>
        <VStack w={52} p={"8"} shadow={'lg'} borderRadius={"lg"} transition={"all 0.3s"} m={4}
         bgColor={'white.900'} css={{"&:hover": {transform: "scale(1.3)"}}} >
            <Image
                src={img}
                h={"10"}
                w={"10"}
                objectFit={"contain"}
                alt={"coin"}
            />
            <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
            <Text noOfLines={1} >{name}</Text>
            <Text noOfLines={1} >{price? `${currencySymbol}${price}` : "N/A"}</Text>

        </VStack>
    </Link>
);
export default CoinCard