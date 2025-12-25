import { get } from "lodash";
import { dateFormat } from "../../utils/format";

export const renderValue = (col, row) => {
    const key = get(col, 'key');
    const def = get(col, 'default');
    const type = get(col, 'type');
    let value = get(row, key, def);

    if ([null, '', undefined].includes(value) && def) value = def;

    if (type === "date") {
        value = dateFormat(value);
    }
    if (type === "length") {
        value = (value || []).length;
    }

    return value;
}