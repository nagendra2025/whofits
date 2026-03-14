/**
 * Puts each step on its own line in the Steps column (column C) for all
 * category sheets (A–M). Converts "1. ... 2. ... 3. ..." to:
 *   1.
 *   2.
 *   3.
 * Also sets wrap text on the Steps column so line breaks display.
 *
 * Run: node scripts/fix-steps-column-formatting.js
 * Close the Excel file before running.
 */

const ExcelJS = require('exceljs');
const path = require('path');

const OUT_DIR = 'C:\\Users\\rasna\\Documents\\cursor\\cursor-projects-1\\Testscenarios_whofits';
const OUT_PATH = path.join(OUT_DIR, 'Whofits_TestScenarios.xlsx');

const CATEGORY_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const CATEGORY_ROW_COUNT = { A: 9, B: 6, C: 6, D: 12, E: 3, F: 3, G: 3, H: 2, I: 3, J: 2, K: 4, L: 3, M: 4 };

const STEPS_COL = 3;

/** Puts each step on a new line: "1. a 2. b 3. c" -> "1. a\n2. b\n3. c" */
function formatStepsWithNewlines(steps) {
  if (steps == null) return steps;
  const s = String(steps).trim();
  if (!s) return s;
  // After a period and space, digit(s) and period = start of next step -> newline before it
  return s.replace(/\. (\d+\.)/g, '.\n$1');
}

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(OUT_PATH);

  for (const id of CATEGORY_IDS) {
    const sheet = wb.getWorksheet(id);
    if (!sheet) continue;

    const dataRowCount = CATEGORY_ROW_COUNT[id] || 1;
    const lastRow = 1 + dataRowCount;

    for (let r = 2; r <= lastRow; r++) {
      const cell = sheet.getCell(r, STEPS_COL);
      const current = cell.value;
      cell.value = formatStepsWithNewlines(current);
      cell.alignment = cell.alignment || {};
      cell.alignment.wrapText = true;
    }

    console.log('Fixed Steps column for sheet', id);
  }

  await wb.xlsx.writeFile(OUT_PATH);
  console.log('Saved:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
