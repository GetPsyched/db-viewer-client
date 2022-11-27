import React from "react";

import "./App.css"
import logo from "./assets/logo.svg";

function App() {
  const [dsn, setDsn] = React.useState(false);
  const dsnInput = document.getElementsByName("dsn");

  const [data, setData] = React.useState(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      dsn: { value: string };
      query: { value: string };
    };
    const dsn = target.dsn.value;
    const query = target.query.value;

    setDsn(true);
    dsnInput.forEach((value) => {
      value.style.display = "none";
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {dsn ? null : <img src={logo} className="App-logo" alt="logo" />}
        <form onSubmit={onSubmit}>
          <input
            name="dsn"
            placeholder="postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]"
            type={"url"}
            required
          />
          <input
            name="query"
            placeholder="SELECT col FROM table_name"
            type={"text"}
            required
          />
          <button type="submit">Fetch</button>
        </form>
      </header>
    </div>
  );
}

export default App;
