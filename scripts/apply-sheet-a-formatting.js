/**
 * Applies the same formatting and look & feel from sheet "A" to all other
 * category sheets (B, C, D, ... M) in Whofits_TestScenarios.xlsx.
 * Run after you have edited sheet A in Excel.
 *
 * Run: node scripts/apply-sheet-a-formatting.js
 * Note: Close the Excel file before running, or you may get EBUSY when saving.
 */

const ExcelJS = require('exceljs');
const path = require('path');

const OUT_DIR = 'C:\\Users\\rasna\\Documents\\cursor\\cursor-projects-1\\Testscenarios_whofits';
const OUT_PATH = path.join(OUT_DIR, 'Whofits_TestScenarios.xlsx');

const CATEGORY_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const CATEGORY_ROW_COUNT = { A: 9, B: 6, C: 6, D: 12, E: 3, F: 3, G: 3, H: 2, I: 3, J: 2, K: 4, L: 3, M: 4 };

function deepCloneStyle(style) {
  if (!style || typeof style !== 'object') return undefined;
  try {
    return JSON.parse(JSON.stringify(style));
  } catch (_) {
    return undefined;
  }
}

function cloneObject(obj) {
  if (obj == null || typeof obj !== 'object') return obj;
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (_) {
    return obj;
  }
}

function getCellStyle(cell) {
  const s = cell.style || {};
  const out = {};
  if (s.font) out.font = cloneObject(s.font);
  if (s.fill) out.fill = cloneObject(s.fill);
  if (s.alignment) out.alignment = cloneObject(s.alignment);
  if (s.border) out.border = cloneObject(s.border);
  if (s.numFmt) out.numFmt = s.numFmt;
  return Object.keys(out).length ? out : undefined;
}

function applyStyle(cell, style) {
  if (!style) return;
  if (style.font) cell.font = style.font;
  if (style.fill) cell.fill = style.fill;
  if (style.alignment) cell.alignment = style.alignment;
  if (style.border) cell.border = style.border;
  if (style.numFmt !== undefined) cell.numFmt = style.numFmt;
}

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(OUT_PATH);

  const sheetA = wb.getWorksheet('A');
  if (!sheetA) {
    console.error('Sheet "A" not found.');
    process.exit(1);
  }

  // Capture from sheet A: column widths, header row styles, first data row styles
  const colWidths = [];
  for (let c = 1; c <= 5; c++) {
    const col = sheetA.getColumn(c);
    colWidths[c - 1] = col.width != null ? col.width : undefined;
  }

  const headerStyles = [];
  const dataRowStyles = [];
  for (let c = 1; c <= 5; c++) {
    const headerCell = sheetA.getCell(1, c);
    const dataCell = sheetA.getCell(2, c);
    headerStyles[c - 1] = getCellStyle(headerCell);
    dataRowStyles[c - 1] = getCellStyle(dataCell);
  }

  // Optional: capture row height for row 1 and row 2 from A
  const row1 = sheetA.getRow(1);
  const row2 = sheetA.getRow(2);
  const headerRowHeight = row1.height;
  const dataRowHeight = row2.height;

  // Apply to sheets B through M
  for (const id of CATEGORY_IDS) {
    if (id === 'A') continue;
    const sheet = wb.getWorksheet(id);
    if (!sheet) continue;

    // Column widths
    for (let c = 1; c <= 5; c++) {
      if (colWidths[c - 1] != null) {
        sheet.getColumn(c).width = colWidths[c - 1];
      }
    }

    // Header row (row 1)
    if (headerRowHeight != null) sheet.getRow(1).height = headerRowHeight;
    for (let c = 1; c <= 5; c++) {
      const style = headerStyles[c - 1];
      if (style) applyStyle(sheet.getCell(1, c), deepCloneStyle(style));
    }

    // Data rows (row 2 to last; use known count per category)
    const dataRowCount = CATEGORY_ROW_COUNT[id] || 1;
    const lastRow = 1 + dataRowCount;
    for (let r = 2; r <= lastRow; r++) {
      if (dataRowHeight != null) sheet.getRow(r).height = dataRowHeight;
      for (let c = 1; c <= 5; c++) {
        const style = dataRowStyles[c - 1];
        if (style) applyStyle(sheet.getCell(r, c), deepCloneStyle(style));
      }
    }

    console.log('Applied sheet A formatting to sheet', id);
  }

  await wb.xlsx.writeFile(OUT_PATH);
  console.log('Saved:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
