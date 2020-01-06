export const required = (value, item_name) => {
    if (!value.toString().trim().length) {
        return false;
    }

    return true;
};

export const isEmail = (value) => {
    if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        return true;
    }

    return false;
};

export const isNumber = (value) => {
    if (isNaN(Number(value))) {
        return false;
    }

    return true;
};

export const isDecimal = (value) => {
    var res = value.toString().match(/^[0-9][\.\d]*(,\d+)?$/i)
    if (res) {
        return false;
    }
    return true;
};

export const maxLength = (value, max_length) => {
    if (value && !value.toString().trim().length > max_length) {
        return false;
    }
    return true;
};