export const required = value => {
    return value ? undefined : 'Required';
};

export const isNumberOnly = value => {
    return /^[0-9]+$/.test(value) ? undefined : 'Not a number';
};