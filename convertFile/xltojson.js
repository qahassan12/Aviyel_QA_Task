import {writeFileSync} from 'fs'
import XLSX from 'xlsx'

try {
    const workBook = XLSX.readFile("../cypress/fixtures/data.xlsx");
    const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets.Sheet1);
    writeFileSync(
      "./cypress/fixtures/testData.json",
      JSON.stringify(jsonData, null, 4),
      "utf-8"
    );
  } catch (e) {
    throw Error(e);
  }