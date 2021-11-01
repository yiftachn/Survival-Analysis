import React, { FC, useState } from "react";
import { SurgeryStep } from "../../model/surgeryStep";
import FeatureSelect from "../featureSelect/FeatureSelect";
import FormSelection from "../formSelection/FormSelection";
import Logo from "../logo/Logo";
import SubmitButton from "../submitButton/SubmitButton";
import styles from "./SurvivalAnalysis.module.scss";

const SurvivalAnalysis: FC = () => {
  const [isValid, setIsValid] = useState(true);
  const [selectedSurgeryStep, setSelectedSurgeryStep] = useState<SurgeryStep>();

  const onButtonClick = () => {
    setIsValid(true);
  };

  return (
    <div className={styles.app}>
      <div className={styles.innerMargin}>
        <Logo />
        <FormSelection onStepSelected={setSelectedSurgeryStep} />
        {selectedSurgeryStep && <FeatureSelect step={selectedSurgeryStep} />}
        <div className={styles.submitButton}>
          <SubmitButton disabled={!isValid} onClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default SurvivalAnalysis;
