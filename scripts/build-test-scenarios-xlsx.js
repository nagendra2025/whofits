/**
 * Builds Whofits_TestScenarios.xlsx:
 * - Sheet 1: Introduction
 * - Sheet 2: Summary (categories + metrics with formulae that reference category sheets)
 * - Sheets 3+: One sheet per category (A–M) with test case rows; Pass/Fail Status in column E
 *
 * Run: node scripts/build-test-scenarios-xlsx.js
 * Output: C:\Users\rasna\Documents\cursor\cursor-projects-1\Testscenarios_whofits\Whofits_TestScenarios.xlsx
 */

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const MD_PATH = path.join(__dirname, '..', 'whofits_test_scenarios.md');
const OUT_DIR = 'C:\\Users\\rasna\\Documents\\cursor\\cursor-projects-1\\Testscenarios_whofits';
const OUT_PATH = path.join(OUT_DIR, 'Whofits_TestScenarios.xlsx');

const CATEGORY_META = [
  { id: 'A', desc: 'Launch, environment, instructions', count: 9 },
  { id: 'B', desc: 'Player setup', count: 6 },
  { id: 'C', desc: 'Drag-and-drop gameplay', count: 6 },
  { id: 'D', desc: 'Scoring, turns, and skip behavior', count: 12 },
  { id: 'E', desc: 'Scoreboard and progress bars', count: 3 },
  { id: 'F', desc: 'Game completion and restart', count: 3 },
  { id: 'G', desc: 'UI, copy, and colors', count: 3 },
  { id: 'H', desc: 'Data correctness and mappings', count: 2 },
  { id: 'I', desc: 'Cross-browser and display behavior', count: 3 },
  { id: 'J', desc: 'Performance and network conditions', count: 2 },
  { id: 'K', desc: 'Accessibility and browser-state edge cases', count: 4 },
  { id: 'L', desc: 'Data and session independence', count: 3 },
  { id: 'M', desc: 'Browser coverage (Chrome, Firefox, Safari, IE)', count: 4 },
];

function parseTableRows(mdContent) {
  const lines = mdContent.split(/\r?\n/);
  const rows = [];
  let inTable = false;
  for (const line of lines) {
    const raw = line.trim();
    if (raw.startsWith('| Test ID |')) {
      inTable = true;
      continue;
    }
    if (!inTable) continue;
    if (raw.startsWith('| ---') || raw === '') continue;
    if (!raw.startsWith('|')) break;
    const parts = raw.split(/\s*\|\s*/).map((s) => s.trim());
    if (parts.length < 6) continue;
    const testId = parts[1] || '';
    const purpose = parts[2] || '';
    const steps = parts[3] || '';
    const objective = parts[4] || '';
    const status = parts[5] || '';
    if (!testId || testId.startsWith('-')) continue;
    rows.push({ testId, purpose, steps, objective, status });
  }
  return rows;
}

function groupByCategory(rows) {
  const byCat = {};
  for (const r of rows) {
    const cat = (r.testId || '').charAt(0);
    if (!byCat[cat]) byCat[cat] = [];
    byCat[cat].push(r);
  }
  return byCat;
}

/** Puts each step on a new line in the Steps column: "1. a 2. b" -> "1. a\n2. b" */
function formatStepsWithNewlines(steps) {
  if (steps == null) return steps;
  const s = String(steps).trim();
  if (!s) return s;
  return s.replace(/\. (\d+\.)/g, '.\n$1');
}

async function main() {
  const mdContent = fs.readFileSync(MD_PATH, 'utf8');
  const rows = parseTableRows(mdContent);
  const byCategory = groupByCategory(rows);

  const wb = new ExcelJS.Workbook();
  wb.creator = 'WhoFits Test Scenarios';

  // ----- Sheet 1: Introduction -----
  const introSheet = wb.addWorksheet('Introduction', { views: [{ state: 'frozen', ySplit: 0 }] });
  introSheet.getColumn(1).width = 90;
  const introLines = [
    'WhoFits? – Test Scenarios',
    '',
    'This sheet and the next (Summary) are standalone and independent of the category sheets that follow.',
    '',
    'WhoFits? is a browser-based matching game where players drag and drop celebrity names onto their correct professional roles. The game is designed for laptops and desktop computers and supports multiple players taking turns on the same machine.',
    '',
    'Purpose of this test suite:',
    '• To verify that the game behaves correctly and reliably across different devices, browsers, and player counts.',
    '• To validate scoring, turns, skip-count behavior, and winner calculation for 1–4 players.',
    '• To confirm that the game does not store or share any user data across sessions or devices.',
    '• To ensure the experience is clear and enjoyable for new users, including a fresher in a third-party testing team.',
    '',
    'After these test cases are executed and all issues are fixed, the plan is to use this suite as part of the final quality check before publishing the game in app stores and sharing it more widely.',
    '',
    'The scenarios are written in simple language so that a fresher tester can execute them step by step without prior knowledge of the codebase.',
  ];
  introLines.forEach((text, i) => {
    introSheet.getCell(i + 1, 1).value = text;
  });

  // ----- Sheet 2: Summary (Categories + metrics with formulae) -----
  const summarySheet = wb.addWorksheet('Summary', { views: [{ state: 'frozen', ySplit: 1 }] });
  summarySheet.getColumn(1).width = 10;
  summarySheet.getColumn(2).width = 50;
  summarySheet.getColumn(3).width = 8;
  summarySheet.getColumn(4).width = 10;
  summarySheet.getColumn(5).width = 10;
  summarySheet.getColumn(6).width = 10;
  summarySheet.getColumn(7).width = 10;
  summarySheet.getCell(1, 1).value = 'Category';
  summarySheet.getCell(1, 2).value = 'Description';
  summarySheet.getCell(1, 3).value = 'Total';
  summarySheet.getCell(1, 4).value = 'Pass';
  summarySheet.getCell(1, 5).value = 'Fail';
  summarySheet.getCell(1, 6).value = 'NT';
  summarySheet.getCell(1, 7).value = 'Pending';
  summarySheet.getRow(1).font = { bold: true };

  CATEGORY_META.forEach((meta, idx) => {
    const r = idx + 2;
    summarySheet.getCell(r, 1).value = meta.id;
    summarySheet.getCell(r, 2).value = meta.desc;
    summarySheet.getCell(r, 3).value = meta.count;
    const dataStart = 2;
    const dataEnd = dataStart + meta.count - 1;
    summarySheet.getCell(r, 4).value = { formula: `COUNTIF(${meta.id}!E${dataStart}:E${dataEnd},"Pass")` };
    summarySheet.getCell(r, 5).value = { formula: `COUNTIF(${meta.id}!E${dataStart}:E${dataEnd},"Fail")` };
    summarySheet.getCell(r, 6).value = { formula: `COUNTIF(${meta.id}!E${dataStart}:E${dataEnd},"NT")` };
    summarySheet.getCell(r, 7).value = { formula: `C${r}-D${r}-E${r}-F${r}` };
  });

  const totalRow = CATEGORY_META.length + 2;
  const lastDataRow = totalRow - 1;
  summarySheet.getCell(totalRow, 1).value = 'Total';
  summarySheet.getCell(totalRow, 2).value = '';
  summarySheet.getCell(totalRow, 3).value = 60;
  summarySheet.getCell(totalRow, 4).value = { formula: `SUM(D2:D${lastDataRow})` };
  summarySheet.getCell(totalRow, 5).value = { formula: `SUM(E2:E${lastDataRow})` };
  summarySheet.getCell(totalRow, 6).value = { formula: `SUM(F2:F${lastDataRow})` };
  summarySheet.getCell(totalRow, 7).value = { formula: `SUM(G2:G${lastDataRow})` };
  summarySheet.getRow(totalRow).font = { bold: true };

  // ----- Sheets 3+: One sheet per category -----
  const headers = ['Test ID', 'Purpose', 'Steps', 'Objective', 'Pass/Fail Status'];
  CATEGORY_META.forEach((meta) => {
    const sheet = wb.addWorksheet(meta.id, { views: [{ state: 'frozen', ySplit: 1 }] });
    sheet.getColumn(1).width = 45;
    sheet.getColumn(2).width = 50;
    sheet.getColumn(3).width = 70;
    sheet.getColumn(4).width = 55;
    sheet.getColumn(5).width = 14;
    headers.forEach((h, c) => {
      sheet.getCell(1, c + 1).value = h;
    });
    sheet.getRow(1).font = { bold: true };
    const catRows = byCategory[meta.id] || [];
    catRows.forEach((row, r) => {
      const excelRow = r + 2;
      sheet.getCell(excelRow, 1).value = row.testId;
      sheet.getCell(excelRow, 2).value = row.purpose;
      const stepsCell = sheet.getCell(excelRow, 3);
      stepsCell.value = formatStepsWithNewlines(row.steps);
      stepsCell.alignment = stepsCell.alignment || {};
      stepsCell.alignment.wrapText = true;
      sheet.getCell(excelRow, 4).value = row.objective;
      sheet.getCell(excelRow, 5).value = row.status || '';
    });
  });

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  await wb.xlsx.writeFile(OUT_PATH);
  console.log('Written:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
