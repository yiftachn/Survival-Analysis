import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Layout from "./app/layout/Layout";
import SurvivalAnalysis from "./app/survivalAnalysis/SurvivalAnalysis";

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <SurvivalAnalysis />
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
