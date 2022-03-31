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
  let penultimateStageNum: string | number | undefined = arr?.at(6)?.replace(',', '.');
  penultimateStageNum = penultimateStageNum ? parseFloat(penultimateStageNum) : 0;
  return penultimateStageNum;
}

export function timeInterval(start: string[], end: string[]) {
  const endTime = timeSeconds(end);
  const startTime = timeSeconds(start);
  const diffTime = endTime && startTime ? endTime - startTime : 'Нет данных';

  return diffTime;
}

export function powerTotal(penultimateStageNum: number, penultimateStageLastNum: number, diffTime: number | 'Нет данных', startTime: number | undefined) {
  let legsTotal: number | string = 'Нет данных';

  if (penultimateStageNum && penultimateStageLastNum && startTime && diffTime !== 'Нет данных') {
    legsTotal =
    penultimateStageNum +
      ((penultimateStageLastNum - penultimateStageNum) * diffTime) / startTime;
  }

  return legsTotal
}