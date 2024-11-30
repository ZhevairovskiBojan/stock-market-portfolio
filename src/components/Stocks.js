import React, { useState, useEffect } from "react";
import { fetchStocks } from "../services/api"; 


function Stocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const getStocks = async () => {
      const data = await fetchStocks();
      setStocks(data);
    };
    getStocks();
  }, []);

  return (
    <div>
      <h2>Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.company} ({stock.symbol}) - ${stock.initial_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stocks;
