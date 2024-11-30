import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css"; 
import Stocks from "./components/Stocks";
import Watchlist from "./components/WatchList";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  return (
    <Router>
      <div className="container">
        <nav className="nav-bar">
          <NavLink
            to="/stocks"
            className="nav-link"
            activeClassName="active-link"
          >
            Stocks
          </NavLink>
          <NavLink
            to="/watchlist"
            className="nav-link"
            activeClassName="active-link"
          >
            Watchlist
          </NavLink>
        </nav>
        <Routes>
          <Route
            path="/stocks"
            element={<Stocks watchlist={watchlist} setWatchlist={setWatchlist} />}
          />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
