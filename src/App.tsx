import axios from "axios";
import * as React from "react";

import "./App.scss";
import Table from "./components/Table/Table";
import DatabaseTreeView from "./components/DatabaseTreeView";

function App() {
  const [dsn, setDsn] = React.useState("");

  const [dbTree, setDbTree] = React.useState(null);
  const [data, setData] = React.useState(null);

  const onSubmitDSN = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      dsn: { value: string };
    };
    const dsn = target.dsn.value;
    setDsn(dsn);

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
      query: { value: string };
    };
    const query = target.query.value;

    axios
      .post("/", { dsn: dsn, query: query })
      .then((res) => setData(res.data))
      .catch((err: Error) => {
        console.error(err.message);
      });
  };

  return (
    <div className="App">
      {/* Display div for the INFORMATION_SCHEMA tree */}
      <div className="App-tree">
        <div className="App-dsnForm">
          <form onSubmit={onSubmitDSN}>
            <input
              name="dsn"
              id="dsnInput"
              placeholder="postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]"
              type={"url"}
              required
            />
          </form>
        </div>
        {dbTree !== null ? <DatabaseTreeView dbTree={dbTree} /> : null}
      </div>

      {/* Input div for the SQL query */}
      <div className="App-query">
        <form onSubmit={onSubmit}>
          <textarea
            name="query"
            id="queryInput"
            placeholder="SELECT column_name FROM table_name"
            required
          />
          <button type="submit">Fetch</button>
        </form>
      </div>

      {/* Output div for the resultant table */}
      <div className="App-data">
        {data !== null ? (
          <Table data={data} columns={Object.keys(data[0])} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
