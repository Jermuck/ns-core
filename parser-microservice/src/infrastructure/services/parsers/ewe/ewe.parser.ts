import { Injectable } from "@nestjs/common";
import * as Excel from "exceljs";
import { IProductModel } from "../../../../domain/models/product.model";

@Injectable()
export class EWEParserService {
    public async Main() {
        const filePath = '/Users/kirillbardugov/Desktop/Projects/ns-core/parser-microservice/src/EWE_Выгрузка.xlsx';
        const workbook = new Excel.Workbook();
        const content = await workbook.xlsx.readFile(filePath);

        const worksheet = content.worksheets[0];
        const rowStartIndex = 2;
        const numberOfRows = worksheet.rowCount - (rowStartIndex - 1);

        const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

        return rows.map((row): IProductModel => {
            return {
                itemNumber:         this.getCellValue(row, 1),
                name:               this.getCellValue(row, 3),
                brand:              this.getCellValue(row, 2),
                availableQuantity:  this.getNumberFromCell(row, 4),
                price:              this.getNumberFromRSDCell(row, 5),
                oldPrice:           this.getNumberFromRSDCell(row, 6),
                mpPrice:            this.getNumberFromRSDCell(row, 7),
            }
        });
    }

    private getCellValue = (row:  Excel.Row, column: number) => {
        const cell = row.getCell(column);
        return cell.value ? cell.value.toString() : '';
    };

    private getNumberFromCell = (row:  Excel.Row, column: number) => {
        return +this.getCellValue(row, column);
    }

    private getRSDFromRSDString = (RSDString: string) => {
        const regEx = /[^,\d]/g;
        const RSDOption = +RSDString
            .replace(regEx, '')
            .replace(',', '.')
        return isNaN(RSDOption) ? 0 : Math.round(RSDOption);
    }

    private getNumberFromRSDCell = (row:  Excel.Row, column: number) => {
        return this.getRSDFromRSDString(this.getCellValue(row, column));
    }
}