import { IDataTable } from '~features/addTableForm/model/types';

export function timeSeconds(stage: string[] | undefined) {
  const timeStage: string[] | undefined = stage?.at(0)?.split(/:|,/);
  let legsTimeFirst;

  if (timeStage) {
    const minToSec = parseInt(timeStage[0]) * 60;
    legsTimeFirst = minToSec + parseInt(timeStage[1]);
  }

  return legsTimeFirst;
}

export function filteredTable(arr: any[], tableName: string) {
  const find = arr.find(item => item.range === tableName);
  const filter = find.values.filter((item: string[]) => parseFloat(item[6]));
  return filter;
}

export function powerOfTheStage(arr: string[]) {
  let stageNum: string | number | undefined = arr?.at(6)?.replace(',', '.');
  stageNum = stageNum ? parseFloat(stageNum) : 0;
  return stageNum;
}

export function timeInterval(start: string[], end: string[]) {
  const endTime = timeSeconds(end);
  const startTime = timeSeconds(start);
  const diffTime = endTime && startTime ? endTime - startTime : 'Нет данных';

  return diffTime;
}

export function powerTotal(
  stageNum: number,
  stageLastNum: number,
  diffTime: number | 'Нет данных',
  startTime: number | undefined
) {
  let legsTotal: number | 'Нет данных' = 'Нет данных';

  if (stageNum && stageLastNum && startTime && diffTime !== 'Нет данных') {
    legsTotal = stageNum + ((stageLastNum - stageNum) * diffTime) / startTime;
  }

  return legsTotal;
}

export function sportsmenWeight(data: IDataTable['valueRanges']) {
  const sportsmenData: string[] | undefined = data.find(item => item.range === "'Спортсмен'!A1:Z1000")?.values.at(1);
  const sportsmenWeight = sportsmenData ? parseFloat(sportsmenData[4]) : -1;

  return sportsmenWeight;
}

export function YOC(dataList: string[][], sportsmenWeight: number) {
  const legsYOC = dataList.map((item: string[]) => {
    const power = parseFloat(item[6]);
    const frequency = parseFloat(item[5]);
    const YOC = ((power + 0.3 * sportsmenWeight) * 100) / (frequency * 3.75 * (Math.pow(frequency / 190, 0.2) - 0.69));

    return [...item.slice(5, 7), YOC.toFixed(2)];
  });

  return legsYOC;
}
