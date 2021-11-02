import React, { FC } from "react";
import Point from "../../common/Point";
import StringDictionary from "../../common/stringDictionary";
import Logo from "../logo/Logo";
import SurvivalAnalysisRouter from "../survivalAnalysisRouter/SurvivalAnalysisRouter";
import styles from "./SurvivalAnalysis.module.scss";

const SurvivalAnalysis: FC = () => {

  const linePoints: Point[] = [
        {x: 3, y: 5},
        {x: 6, y: 7},
        {x: 14, y: 8},
        {x: 16, y: 10},
        {x: 18, y: 5},
        {x: 20, y: 2},
        {x: 29, y: 12}
    ];

    const scatterPoints: Point[] = [
        {x: 1, y: 1},
        {x: 12, y: 8},
        {x: 14, y: 16},
        {x: 20, y: 5}
    ];

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
