import React from "react";
import { Link } from "react-router-dom";

import getIndex from "../pages/index";

const contents = getIndex();

export default function Home() {
  return (
    <div className="home">
      <h1>Talking about music with Paino</h1>
      <ul className="index">
        {contents.map((x) => (
          <li key={x.id}>
            <Link to={`/pages/${x.id}`}>{x.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
