import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useRxSubscription from '../../hooks/useRxSubscription';
import FormStore from '../../store/FormStore';
import FeatureSelect from '../featureSelect/FeatureSelect';
import FormSelection from '../formSelection/FormSelection';
import SubmitButton from '../submitButton/SubmitButton';
import styles from './SurvivalAnalysisForm.module.scss';

const SurvivalAnalysisForm: FC = () => {
    const [areFeaturesValid, setAreFeaturesValid] = useState(false);
    const [isFormSelectionValid, setIsFormSelectionValid] = useState(false);
    const [selectedSurgeryStep] = useRxSubscription(FormStore.surgeryStep);
    const history = useHistory();

    const formValid = areFeaturesValid && isFormSelectionValid;

    const onSubmitClick = () => {
        history.push('/loading');
    };

    const handleFeaturesValidity = (isValid: boolean) => {
        setAreFeaturesValid(isValid);
    };

    const handleFormSelectionValidity = (isValid: boolean) => {
        setIsFormSelectionValid(isValid);
    };

    return (
        <>
            <FormSelection onValidityChanged={handleFormSelectionValidity} />
            {selectedSurgeryStep && <FeatureSelect step={selectedSurgeryStep} onValidityChanged={handleFeaturesValidity} />}
            <div className={styles.submitButton}>
                <SubmitButton disabled={!formValid} onClick={onSubmitClick} />
            </div>
        </>
    );
}

export default SurvivalAnalysisForm;