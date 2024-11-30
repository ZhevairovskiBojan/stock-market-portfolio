import React, { useState, useEffect } from "react";
import { fetchStocks } from "../services/api";

function Stocks({ watchlist, setWatchlist }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const getStocks = async () => {
      const data = await fetchStocks();
      setStocks(data);
    };
    getStocks();
  }, []);

  const addToWatchlist = (stock) => {
    if (!watchlist.some((item) => item.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
      alert(`${stock.company} has been added to your watchlist!`);
    } else {
      alert(`${stock.company} is already in your watchlist.`);
    }
  };

  return (
    <div>
      <h2>Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.company} ({stock.symbol}) - ${stock.initial_price}
            <button onClick={() => addToWatchlist(stock)}>Add to Watchlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stocks;
