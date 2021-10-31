import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { FC, useState } from "react";
import { stepToDisplayName, SurgeryStep } from "../../model/surgeryStep";
import styles from "./FormSelection.module.scss";

const FormSelection: FC = () => {
    const [step, setStep] = useState<SurgeryStep>();

    return (
        <div className={styles.container}>
            <InputLabel>Surgery Step</InputLabel>
            <ButtonGroup className={styles.select} fullWidth>
                {Object.keys(stepToDisplayName).map((stepName: string) => (
                    <Button
                        key={stepName}
                        value={stepName}
                        onClick={() => setStep(stepName as SurgeryStep)}
                        variant={step === stepName ? "contained" : "outlined"}
                    >
                        {stepToDisplayName[stepName as SurgeryStep]}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default FormSelection;
