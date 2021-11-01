export interface Validator {
    validate: RegExp;
    errorMessage: string;
}

export const FloatValidator: Validator = {
    validate: /^[+-]?([0-9]*[.])?[0-9]+$/,
    errorMessage: 'Must be a number'
}

export const RequiredValidator: Validator = {
    validate: /.+/,
    errorMessage: 'Required'
}

export const GenderValidator: Validator = {
    validate: /^[MF]$/,
    errorMessage: 'Must be M or F'
};