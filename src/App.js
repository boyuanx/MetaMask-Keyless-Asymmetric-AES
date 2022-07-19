import logo from "./logo.svg";
import "./App.css";
import AES_TEST from "./AES_TEST";
import ARSEED_TEST from "./ARSEED_TEST";
import SIGN_TEST from "./SIGN_TEST";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SIGN_TEST />
    </div>
  );
}

export default App;
