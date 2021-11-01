
import { useEffect, useState } from 'react';
import { Validator } from "../model/validators";

const useErrorValidation = (validators: Validator[], textToValidate: string) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string>("");

    useEffect(() => {
        let error = "";

        const allValid = validators.every((validator) => {
            const isRegexValid = validator.validate.test(textToValidate);
            if (!isRegexValid) {
                error = validator.errorMessage;
            }

            return isRegexValid;
        });

        setIsValid(allValid);
        setErrorText(error);
    }, [validators, textToValidate]);

    return [isValid, errorText];
}

export default useErrorValidation;