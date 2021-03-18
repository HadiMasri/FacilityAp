import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExportService {
  exportedArray: any = [];
  constructor() {}

  ExportData(dataSource,  prefix, sheetName) {
    this.exportedArray = [];
    dataSource.filteredData.forEach((element) => {
      let assignTo;
      delete element.reporterId;
      element.bytes = null;
      if (element.assignTo === null || element.assignTo === undefined) {
        assignTo = 'nog niet toegewezen';
      } else {
        assignTo = element.assignTo.displayName;
      }

      delete element.assignTo;
      element.AssignTo = assignTo;
      this.exportedArray.push(element);
    });
    const timeSpan = new Date().toISOString();
    const prefix1 = prefix;
    const fileName = `${prefix1}-${timeSpan}`;
    const workSheet = XLSX.utils.json_to_sheet(this.exportedArray);

    const workBook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);

    /**
     * set width voor elke Cell
     */
    const wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 5 },
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
    ];
    workSheet['!cols'] = wscols;

    const range = XLSX.utils.decode_range(workSheet['!ref']);
    for (let C = range.s.r; C <= range.e.r; ++C) {
      const address = XLSX.utils.encode_col(C) + '1'; // <-- first row, column number C
      if (!workSheet[address]) {
        continue;
      }
      workSheet[address].v = workSheet[address].v.toUpperCase();
    }

    XLSX.writeFile(workBook, `${fileName}.xlsx`);
  }
}
