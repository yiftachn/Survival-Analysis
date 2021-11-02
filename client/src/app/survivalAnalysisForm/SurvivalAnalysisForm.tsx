import React, { FC, useState } from 'react';
import { SurgeryStep } from '../../model/surgeryStep';
import FeatureSelect from '../featureSelect/FeatureSelect';
import FormSelection from '../formSelection/FormSelection';
import SubmitButton from '../submitButton/SubmitButton';
import styles from './SurvivalAnalysisForm.module.scss';

const SurvivalAnalysisForm: FC = () => {
    const [areFeaturesValid, setAreFeaturesValid] = useState(false);
    const [isFormSelectionValid, setIsFormSelectionValid] = useState(false);
    const [selectedSurgeryStep, setSelectedSurgeryStep] = useState<SurgeryStep>();

    const formValid = areFeaturesValid && isFormSelectionValid;

    const onButtonClick = () => {
        setAreFeaturesValid(true);
    };

    const handleFeaturesValidity = (isValid: boolean) => {
        setAreFeaturesValid(isValid);
    };

    const handleFormSelectionValidity = (isValid: boolean) => {
        setIsFormSelectionValid(isValid);
    };

    return (
        <>
            <FormSelection onStepSelected={setSelectedSurgeryStep} onValidityChanged={handleFormSelectionValidity} />
            {selectedSurgeryStep && <FeatureSelect step={selectedSurgeryStep} onValidityChanged={handleFeaturesValidity} />}
            <div className={styles.submitButton}>
                <SubmitButton disabled={!formValid} onClick={onButtonClick} />
            </div>
        </>
    );
}

export default SurvivalAnalysisForm;