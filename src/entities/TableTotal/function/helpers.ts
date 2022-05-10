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

export function AePAndAnp(data: string[][]): [string[][], number, number, number] {
  const AePAndAnp: string[][] = [
    [
      'Мощность',
      'ЧСС',
      "V'E",
      'Нижняя прямая',
      'Верхняя прямая',
      'Уходит вверх от нижней прямой',
      'Уходит вверх от верхней прямой',
      'a1',
      'b1',
      'x1',
      'y1',
      'x2',
      'y2',
    ],
  ];
  let AeP = -1;
  let Anp = -1;
  let powerAeP = -1;
  let powerAnp = -1;

  const x1 = parseFloat(data[0][5].replace(',', '.'));
  const x2 = parseFloat(data[1][5].replace(',', '.'));
  const x3 = parseFloat(data[2][5].replace(',', '.'));
  const y1 = parseFloat(data[0][10].replace(',', '.'));
  const y2 = parseFloat(data[1][10].replace(',', '.'));
  const y3 = parseFloat(data[2][10].replace(',', '.'));

  const xAverage = (x1 + x2 + x3) / 3;
  const yAverage = (y1 + y2 + y3) / 3;
  const lowerLineCoefficients =
    ((x1 - xAverage) * (y1 - yAverage) + (x2 - xAverage) * (y2 - yAverage) + (x3 - xAverage) * (y3 - yAverage)) /
    ((x1 - xAverage) ** 2 + (x2 - xAverage) ** 2 + (x3 - xAverage) ** 2);
  const intersectionY = yAverage - xAverage * lowerLineCoefficients;

  let oldMpc: number;
  let oldHeartRate: number;
  let oldVe: number;

  let isTrueLowerStraight = true;
  let isTrueUpperStraight = true;

  data.map((item: string[], i: number) => {
    const mpc = parseFloat(item[6].replace(',', '.'));
    const heartRate = parseFloat(item[5].replace(',', '.'));
    const ve = parseFloat(item[10].replace(',', '.'));
    const lowerStraight = intersectionY + heartRate * lowerLineCoefficients;
    const upperStraight = heartRate * lowerLineCoefficients + intersectionY + 10;
    const lowerStraightStatus = ve > lowerStraight ? 'ИСТИНА' : 'ЛОЖЬ';
    const upperStraightStatus = ve > upperStraight ? 'ИСТИНА' : 'ЛОЖЬ';

    if (i === 0) {
      AePAndAnp.push([
        String(mpc),
        String(heartRate),
        String(ve),
        String(lowerStraight.toFixed(2)),
        String(upperStraight.toFixed(2)),
        lowerStraightStatus,
        upperStraightStatus,
        '',
        '',
        '',
        '',
        '',
        '',
      ]);
      oldHeartRate = heartRate;
      oldVe = ve;
      return;
    }
    const a1 = (ve - oldVe) / (heartRate - oldHeartRate);
    const b1 = oldVe - a1 * oldHeartRate;
    const x1 = (b1 - intersectionY) / (lowerLineCoefficients - a1);
    const y1 = a1 * x1 + b1;
    const x2 = (b1 - (intersectionY + 10)) / (lowerLineCoefficients - a1);
    const y2 = a1 * x2 + b1;

    if (x1 && lowerStraightStatus === 'ИСТИНА' && isTrueLowerStraight) {
      AeP = Number(x1.toFixed(2));
      isTrueLowerStraight = false;
    } else if (lowerStraightStatus === 'ЛОЖЬ') {
      isTrueLowerStraight = true;
    }

    if (upperStraightStatus === 'ИСТИНА' && isTrueUpperStraight) {
      Anp = Number(x2.toFixed(2));
      isTrueUpperStraight = false;
    } else if (upperStraightStatus === 'ЛОЖЬ') {
      isTrueUpperStraight = true;
    }

    oldVe = ve;
    oldHeartRate = heartRate;
    AePAndAnp.push([
      String(mpc),
      String(heartRate),
      String(ve),
      String(lowerStraight.toFixed(2)),
      String(upperStraight.toFixed(2)),
      lowerStraightStatus,
      upperStraightStatus,
      String(a1.toFixed(2)),
      String(b1.toFixed(2)),
      String(x1.toFixed(2)),
      String(y1.toFixed(2)),
      String(x2.toFixed(2)),
      String(y2.toFixed(2)),
    ]);
  });

  data.map((item: string[], i: number) => {
    const mpc = parseFloat(item[6].replace(',', '.'));
    const heartRate = parseFloat(item[5].replace(',', '.'));

    if (i === 0) {
      oldMpc = mpc;
      oldHeartRate = heartRate;
      return;
    }

    if (oldHeartRate <= AeP && AeP <= heartRate) {
      const a = (heartRate - oldHeartRate) / (mpc - oldMpc);
      const b = oldHeartRate - oldMpc * a;

      powerAeP = Number(((AeP - b) / a).toFixed(2));
    }

    oldMpc = mpc;
    oldHeartRate = heartRate;
  });

  return [AePAndAnp, AeP, powerAeP, Anp];
}
