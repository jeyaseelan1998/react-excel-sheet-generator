export const categoryOptions = [
    { value: 'SPARE', label: 'SPARE' },
    { value: 'ACC', label: 'ACC' },
    { value: 'IC', label: 'IC' },
    { value: 'GAS CHARGING', label: 'GAS CHARGING' },
    { value: 'CONTRACT', label: 'CONTRACT' }
];

export const COLUMNS = [
    { header: "Date", key: "date", width: 30 },
    { header: "ENGINEER NAME", key: "engineer_name", width: 45 },
    { header: "BILL NO", key: "bill_no", width: 15 },
    { header: "DESCRIPTION", key: "description", width: 45 },
    { header: "CATEGORY", key: "category", width: 45 },
    { header: "QTY", key: "qty", width: 15 },
    { header: "AMOUNT", key: "amount", width: 25, default: 'NIL' },
    { header: "AMC", key: "amc", width: 25 },
    { header: "CUSTOMER NAME", key: "customer_name", width: 45 },
    { header: "PHONE NUMBER", key: "phone_number", width: 45 },
    { header: "CALL TYPE", key: "call_type", width: 45 },
    { header: "NOTES", key: "notes", width: 45 },
];