import { Container, Box, VStack, RadioGroup, Radio, Text, Image, 
Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, HStack, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { server } from '../index';
import Chartss from './Chartss';


const CoinDetail = () => {
  const [coin, setcoin] = useState({});
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState("24h");
  const [ChartArray, setChartArray] = useState([]);
  const params = useParams()
  const currencySymbol = currency === 'inr' ? "₹" : currency === "eur" ? "€" : "$";
  const btns = ["24h", "7d", "15d", "30d", "60d", "200d", "1y", "max"];

  const swithChartStat = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "15d":
        setDays("15d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1yr":
        setDays("1yr");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setcoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id , currency , days]);

  if (error) return <ErrorComponent />

  else {
    return (
      <Container maxW={'container.xl'}>
        {Loading ? (<Loader />) : (
          <>
            <Box width={"full"} borderWidth={1}>
              <Chartss currency={currencySymbol} arr={ChartArray} days={days} />
            </Box>

            <HStack p="4" wrap={"wrap"}>
              {
                btns.map((i) => (
                  <Button key={i} onClick={() => swithChartStat(i)}>{i}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={8} >
              <Radio value='inr'>INR</Radio>
              <Radio value='usd'>USD</Radio>
              <Radio value='eur'>EUR</Radio>
            </RadioGroup>

            <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
              <Text fontSize="small" alignSelf="center" opacity={0.7}>
                Last Updated on {" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}
                  />
                  {coin.market_data.price_change_percentage_24h}%

                </StatHelpText>
              </Stat>

              <Badge fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >
                {`#${coin.market_cap_rank}`}
              </Badge>

              <CustomBar
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />

              <Box w={'full'} p="4">
                <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    );
  }
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={'full'} my={"4"}>
    <Text fontFamily="'Bebas Neue', sans-serif" letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);
const CustomBar = ({ high, low }) => (
  <VStack>
    <Progress value={50} colorScheme={"teal"} w={'full'} />
    <HStack justifyContent={"space-between"} w={'full'}>
      <Badge children={low} colorScheme='red' />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
)
export default CoinDetail