import "./App.css";
import NameInput from "./Components/NameInput/NameInput";
import BracketInfo from "./Components/BracketInfo/BracketInfo";
function App() {
  return (
    <div className="App">
      <header className="App-header">Badminton Bracket</header>
      <div className="container">
        <NameInput></NameInput>
        <BracketInfo></BracketInfo>
        <div className="matchInfo">
          <div className="currentMatch"></div>
          <div className="playerTable"></div>
        </div>
        <div className="nextMatchButton"></div>
      </div>
    </div>
  );
}

export default App;
