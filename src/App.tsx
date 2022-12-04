import axios from "axios";
import * as React from "react";

import "./App.css";
import logo from "./assets/logo.svg";
import Table from "./components/Table/Table";
import DatabaseTreeView from "./components/DatabaseTreeView";

function App() {
  const [dsn, setDsn] = React.useState(false);
  const dsnInput = document.getElementsByName("dsn");

  const [dbTree, setDbTree] = React.useState(null);
  const [data, setData] = React.useState(null);

  const onSubmitDSN = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      dsn: { value: string };
      query: { value: string };
    };
    const dsn = target.dsn.value;

    axios
      .post("/schema", { dsn: dsn })
      .then((res) => setDbTree(res.data))
      .catch((err: Error) => {
        console.error(err.message);
      });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      dsn: { value: string };
      query: { value: string };
    };
    const dsn = target.dsn.value;
    const query = target.query.value;

    axios
      .post("/", { dsn: dsn, query: query })
      .then((res) => setData(res.data))
      .catch((err: Error) => {
        console.error(err.message);
      });

    setDsn(true);
    dsnInput.forEach((value) => {
      value.style.display = "none";
    });
  };

  return (
    <div className="App">
      <section className="App-sidebar">
        <div className="App-dsnForm">
          <form onSubmit={onSubmitDSN}>
            <input
              name="dsn"
              placeholder="postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]"
              type={"url"}
              required
            />
            <button type="submit">Enter</button>
          </form>
        </div>
        {dbTree !== null ? <DatabaseTreeView dbTree={dbTree} /> : null}
      </section>

      <div className="App-header">
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
        <div className="App-data">
          {data !== null ? (
            <Table data={data} columns={Object.keys(data[0])} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
