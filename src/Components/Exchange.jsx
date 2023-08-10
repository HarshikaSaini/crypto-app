import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { Container, HStack, Heading, VStack, Text , Image } from '@chakra-ui/react';
import Loader from "./Loader";
import ErrorComponent from './ErrorComponent'
const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
   useEffect(() => {
    const fetchExchange = async () => {
      try {
      const { data } = await axios.get(`${server}/exchanges`);
      // console.log(data);
      setExchanges(data);
      setLoading(false);  
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchange();
  }, [])

  if(error) return <ErrorComponent />

  return <Container maxW={'container.xl'} >
    {Loading ?( <Loader />) :( <>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {exchanges.map(i => (
          <ExcahngeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank
          } url={i.url}/>
        ))}
      </HStack>
    </>
    ) }
  </Container>
}
 const ExcahngeCard=({name,url,img,rank})=>(
 <a href={url} target={"blank"}>
<VStack w={52} p={"8"} shadow={'lg'} borderRadius={"lg"} transition={"all 0.3s"} m={4} bgColor={'white.900'}
  css={{"&:hover":{
  transform: "scale(1.3)"
}}}>
  <Image
   src={img}
   h={"10"}
   w={"10"}
   objectFit={"contain"}
   alt={"exchange"}
  />
  <Heading size={"md"} noOfLines={1}>{rank}</Heading>
  <Text noOfLines={1} >{name}</Text>

</VStack>
 </a>
 )

export default Exchange