import React, { FC, useState } from "react";
import { SurgeryStep } from "../../model/surgeryStep";
import FeatureSelect from "../featureSelect/FeatureSelect";
import FormSelection from "../formSelection/FormSelection";
import Logo from "../logo/Logo";
import styles from "./SurvivalAnalysis.module.scss";

const SurvivalAnalysis: FC = () => {
  const [selectedSurgeryStep, setSelectedSurgeryStep] = useState<SurgeryStep>();

  return (
    <div className={styles.app}>
      <div className={styles.innerMargin}>
        <Logo />
        <FormSelection onStepSelected={setSelectedSurgeryStep} />
        {selectedSurgeryStep && <FeatureSelect step={selectedSurgeryStep} />}
      </div>
    </div>
  );
};

export default SurvivalAnalysis;
