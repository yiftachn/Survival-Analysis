import React, { FC } from "react";
import FormSelection from "../formSelection/FormSelection";
import Logo from "../logo/Logo";
import styles from "./SurvivalAnalysis.module.scss";

const SurvivalAnalysis: FC = () => {
  return (
    <div className={styles.app}>
      <Logo />
      <FormSelection />
    </div>
  );
};

export default SurvivalAnalysis;
