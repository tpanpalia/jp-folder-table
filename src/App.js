import "./index.css";
import React, { useState } from "react";
import Table from "./Table";
import Folder from "./Folder";
import data from "./data.json";

export default function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      {toggle ? <Table /> : <Folder root={data["root"]} />}
    </div>
  );
}
