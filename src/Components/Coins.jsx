import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { Container, HStack,  Button, Radio , RadioGroup } from '@chakra-ui/react';
import Loader from "./Loader";
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  
  const currencySymbol = currency === 'inr'?"₹" : currency ==="eur"?"€" : "$";
   
  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }

  const btn = new Array(132).fill(1);
   useEffect(() => {
    const fetchCoins = async () => {
      try {
      const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      console.log(data);
      setcoins(data);
      setLoading(false);  
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if(error) return <ErrorComponent />
  else{
    return <Container maxW={'container.xl'}>
    {Loading ?( <Loader />) :( <>
      <HStack>
      <RadioGroup value={currency} onChange={setCurrency} p={8} >
        <Radio value='inr'>INR</Radio>
        <Radio value='usd'>USD</Radio>
        <Radio value='eur'>EUR</Radio>
      </RadioGroup>
     </HStack>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {coins.map(i => (
          <CoinCard key={i.id} id={i.id} name={i.name} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} 
             price={i.current_price}/>
        ))}
      </HStack>
      <HStack width={"full"} overflowX={"auto"} p={8}>
       {btn.map((item,index)=>(
         <Button 
          key={index}
          bgColor={"blackAlpha.700"} 
          color={"white"} 
          onClick={()=> changePage(index+1)}>
          {index+1}
          </Button>
       ))}
      </HStack>
    </>
    ) }
  </Container>
  }
  
}



export default Coins