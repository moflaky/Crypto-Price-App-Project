import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState([""]);
  const [listOfUrl, setListOfUrl] = useState([]);

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name
      .toLowerCase()
      .includes(searchWord.toString().toLowerCase());
  });

  const coinUrl = listOfCoins.filter((coin) => {
    console.log(coin.exp[0]);
    return coin.exp[0];
  });

  return (
    <div className="App">
      {/* Crypto Header Bar */}
      <div className="cryptoHeader">
        <input
          className="queryBox"
          type="text"
          placeholder="Enter coin name..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>

      {/* Crypto Card */}
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
              exp={coin.exp[0]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
