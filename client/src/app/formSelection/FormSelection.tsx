import { InputLabel, TextField, ButtonGroup, Button } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";
import useRxSubscription from "../../hooks/useRxSubscription";
import { stepToDisplayName, SurgeryStep } from "../../model/surgeryStep";
import FormStore from "../../store/FormStore";
import styles from "./FormSelection.module.scss";

interface FormSelectionProps {
    onValidityChanged: (isValid: boolean) => void;
}

const FormSelection: FC<FormSelectionProps> = ({ onValidityChanged }) => {
    const [step, setStep] = useRxSubscription(FormStore.surgeryStep)
    const [patientId, setPatientId] = useRxSubscription(FormStore.patientId);

    const isValid = useMemo(() => patientId !== "" && step !== undefined, [patientId, step]);

    useEffect(() => {
        onValidityChanged(isValid);
    }, [isValid]);

    const onPatientIdChanged = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(value);
    };

    return (
        <div>
            <TextField
                className={styles.row}
                value={patientId}
                onChange={onPatientIdChanged}
                label="Patient ID"
                fullWidth
                color="primary"
                variant="filled"
                error={!patientId}
                helperText={!patientId ? "Required" : ""}
            />
            <InputLabel>Surgery Step</InputLabel>
            <ButtonGroup fullWidth className={styles.row}>
                {Object.keys(stepToDisplayName).map((stepName: string) => (
                    <Button
                        key={stepName}
                        value={stepName}
                        onClick={() => setStep(stepName as SurgeryStep)}
                        variant={step === stepName ? "contained" : "outlined"}
                        color="primary"
                    >
                        {stepToDisplayName[stepName as SurgeryStep]}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default FormSelection;
