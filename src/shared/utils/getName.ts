import { IDataTable } from '~features/addTableForm/model/types';

export function getName(item: IDataTable): string {
  const elem = item.valueRanges.find(item => item.range === "'Спортсмен'!A1:Z1000");
  const elemItem = elem?.values.find((_, index) => index === 1);

  if (elemItem && elemItem[0]) {
    return elemItem[0];
  }

  return 'Имя не распознано';
}
