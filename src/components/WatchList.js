import React from "react";

function Watchlist({ watchlist }) {
  return (
    <div>
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Add some stocks from the Stocks page!</p>
      ) : (
        <ul>
          {watchlist.map((stock) => (
            <li key={stock.symbol}>
              {stock.company} ({stock.symbol}) - ${stock.initial_price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;
