import { useEffect } from "react";
import axios from "axios";
import config from "./assets/config";
import { gql, useQuery } from "@apollo/client";
import "./styles.scss";

function App() {
  const AGENT = gql`
    query {
      agent {
        id
        first_name
        last_name
      }
    }
  `;
  const { loading, error, data } = useQuery(AGENT);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) console.log(data);

  return <div className="grid-container"></div>;
}

export default App;
