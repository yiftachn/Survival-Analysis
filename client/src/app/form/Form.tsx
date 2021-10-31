import React, { FC } from "react";
import { SurgeryStep } from "../../model/surgeryStep";

interface FormProps {
    step: SurgeryStep;
}

const Form: FC<FormProps> = ({ step }) => {
    return (
        <div>
            {step} FORM
        </div>
    )
};

export default Form;
