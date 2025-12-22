import ExcelJS from "exceljs";

function getTimestamp() {
    const now = new Date();

    const pad = (n) => String(n).padStart(2, "0");

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_` +
        `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

export async function downloadExcel({ columns = [], rows = [] }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // TODO: make it dynamic
    worksheet.columns = columns;

    // Header style
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };

    headerRow.eachCell((cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF00B050" } // Green
        };
    });

    rows.forEach(row => {
        worksheet.addRow(row)
    })
    
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
