import React, { FC } from "react";
import Logo from "../logo/Logo";
import SurvivalAnalysisForm from "../survivalAnalysisForm/SurvivalAnalysisForm";
import styles from "./SurvivalAnalysis.module.scss";

const SurvivalAnalysis: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.innerMargin}>
        <Logo />
        <SurvivalAnalysisForm />
      </div>
    </div>
  );
};

export default SurvivalAnalysis;
