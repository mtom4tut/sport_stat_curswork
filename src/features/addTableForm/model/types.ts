export interface AddTableFormProps {
  className?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5;
}

export interface IForm {
  tableId: string;
}

export interface IDataTable {
  spreadsheetId: string;
  valueRanges: {
    majorDimension: string;
    range: string;
    values: [];
  }[];
}
