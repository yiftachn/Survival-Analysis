export interface Validator {
    validate: RegExp;
    errorMessage: string;
}

export const IntValidator: Validator = {
    validate: /^[0-9]+$/,
    errorMessage: 'Must be a number'
}

export const IsRequiredValidator: Validator = {
    validate: /.+/,
    errorMessage: 'Required'
}