import { useEthPrice } from "@components/hooks/useEthPrice";
import { useState, useEffect } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, []);

  return count;
};

const SimpleComponent = () => {
  //   const count = useCounter();

  const { eth } = useEthPrice();

  return <h1>Simple components - {eth.data}</h1>;
};

export default function HooksPage() {
  const count = useCounter();
  const { eth } = useEthPrice();
  return (
    <>
      <h1>Hello World - {eth.data} </h1>
      <SimpleComponent />
    </>
  );
}
