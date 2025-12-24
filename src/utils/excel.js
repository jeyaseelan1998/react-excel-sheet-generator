import ExcelJS from "exceljs";
import moment from "moment";

/* ------------------ helpers ------------------ */

function getTimestamp() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_` +
        `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

function formatValue(value, column) {
    const { type, default: defaultValue } = column;

    if (value === undefined || value === null || value === "") {
        return defaultValue ?? "";
    }

    switch (type) {
        case "date":
            return moment(value).format("DD/MM/YYYY");

        case "number":
            return Number(value) || defaultValue || 0;

        default:
            return value;
    }
}

function normalizeRow(row, columns) {
    const formatted = {};
    columns.forEach(col => {
        formatted[col.key] = formatValue(row[col.key], col);
    });
    return formatted;
}

/* ------------------ main ------------------ */

export async function downloadExcel({ columns = [], rows = [] }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report", {
        views: [{ state: "frozen", ySplit: 1 }] // freeze header
    });

    worksheet.columns = columns;

    /* -------- header style -------- */
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };

    headerRow.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF00B050" }
        };
    });

    /* -------- data rows -------- */
    rows.forEach(row => {
        worksheet.addRow(normalizeRow(row, columns));
    });

    /* -------- column formatting -------- */
    worksheet.columns.forEach(col => {
        col.alignment = { vertical: "middle", horizontal: "center" };

        // if (col.key === "date") {
        //     col.numFmt = "dd/mm/yyyy";
        // }

        // if (col.key === "amount") {
        //     col.numFmt = '₹#,##0.00';
        // }
    });

    /* -------- download -------- */
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${getTimestamp()}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
}
