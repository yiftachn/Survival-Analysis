import React, { FC, useState } from 'react';
import { SurgeryStep } from '../../model/surgeryStep';
import FeatureSelect from '../featureSelect/FeatureSelect';
import FormSelection from '../formSelection/FormSelection';
import SubmitButton from '../submitButton/SubmitButton';
import styles from './SurvivalAnalysisForm.module.scss';

const SurvivalAnalysisForm: FC = () => {
    const [isValid, setIsValid] = useState(false);
    const [selectedSurgeryStep, setSelectedSurgeryStep] = useState<SurgeryStep>();

    const onButtonClick = () => {
        setIsValid(true);
    };

    return (
        <>
            <FormSelection onStepSelected={setSelectedSurgeryStep} />
            {selectedSurgeryStep && <FeatureSelect step={selectedSurgeryStep} />}
            <div className={styles.submitButton}>
                <SubmitButton disabled={!isValid} onClick={onButtonClick} />
            </div>
        </>
    );
}

export default SurvivalAnalysisForm;