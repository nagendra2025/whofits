/**
 * Adds "NT" (Not tested) column to the Summary sheet and updates formulae.
 * Summary columns become: Category, Description, Total, Pass, Fail, NT, Pending.
 * Pending = Total - Pass - Fail - NT.
 * Close the Excel file before running.
 */

const ExcelJS = require('exceljs');
const path = require('path');

const OUT_DIR = 'C:\\Users\\rasna\\Documents\\cursor\\cursor-projects-1\\Testscenarios_whofits';
const OUT_PATH = path.join(OUT_DIR, 'Whofits_TestScenarios.xlsx');

const CATEGORY_META = [
  { id: 'A', count: 9 }, { id: 'B', count: 6 }, { id: 'C', count: 6 }, { id: 'D', count: 12 },
  { id: 'E', count: 3 }, { id: 'F', count: 3 }, { id: 'G', count: 3 }, { id: 'H', count: 2 },
  { id: 'I', count: 3 }, { id: 'J', count: 2 }, { id: 'K', count: 4 }, { id: 'L', count: 3 }, { id: 'M', count: 4 },
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(OUT_PATH);

  const summarySheet = wb.getWorksheet('Summary');
  if (!summarySheet) {
    console.error('Summary sheet not found.');
    process.exit(1);
  }

  // Headers: add NT (col 6), Pending (col 7)
  summarySheet.getCell(1, 6).value = 'NT';
  summarySheet.getCell(1, 7).value = 'Pending';
  summarySheet.getColumn(7).width = 10;

  // Data rows 2–14: col 6 = COUNTIF(...,"NT"), col 7 = Pending = C-D-E-F
  CATEGORY_META.forEach((meta, idx) => {
    const r = idx + 2;
    const dataStart = 2;
    const dataEnd = dataStart + meta.count - 1;
    summarySheet.getCell(r, 6).value = { formula: `COUNTIF(${meta.id}!E${dataStart}:E${dataEnd},"NT")` };
    summarySheet.getCell(r, 7).value = { formula: `C${r}-D${r}-E${r}-F${r}` };
  });

  // Total row (15)
  const totalRow = 15;
  const lastDataRow = 14;
  summarySheet.getCell(totalRow, 6).value = { formula: `SUM(F2:F${lastDataRow})` };
  summarySheet.getCell(totalRow, 7).value = { formula: `SUM(G2:G${lastDataRow})` };

  await wb.xlsx.writeFile(OUT_PATH);
  console.log('Added NT column and updated formulae. Saved:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
