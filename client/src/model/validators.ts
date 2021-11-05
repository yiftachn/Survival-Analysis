export interface Validator {
    validate: (value: string) => boolean;
    errorMessage: string;
}

export const FloatValidator: Validator = {
    validate: (value: string) => {
        return /^[0-9]+(\.[0-9]+)?$/.test(value);
    },
    errorMessage: 'Must be a decimal or whole number'
}

export const IntValidator: Validator = {
    validate: (value: string) => {
        return /^-?(0|[1-9]\d*)$/.test(value);
    },
    errorMessage: 'Must be a whole number'
}

export const AgeValidator: Validator = {
    validate: (value: string) => {
        const valueAsNum = parseFloat(value);
        return valueAsNum > 0 && valueAsNum <= 120;
    },
    errorMessage: 'Must be between 1-120'
};

export const WeightValidator: Validator = {
    validate: (value: string) => {
        const valueAsNum = parseFloat(value);
        return valueAsNum > 0 && valueAsNum <= 700;
    },
    errorMessage: 'Must be between 1-700'
};