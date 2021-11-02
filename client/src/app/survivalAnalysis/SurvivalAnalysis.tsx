import React, { FC } from "react";
import Logo from "../logo/Logo";
import SurvivalAnalysisRouter from "../survivalAnalysisRouter/SurvivalAnalysisRouter";
import styles from "./SurvivalAnalysis.module.scss";

const SurvivalAnalysis: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.innerMargin}>
        <Logo />
        <SurvivalAnalysisRouter />
      </div>
    </div>
  );
};

export default SurvivalAnalysis;
