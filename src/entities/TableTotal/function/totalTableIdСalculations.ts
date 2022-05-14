import { IDataTable } from '~features/addTableForm/model/types';
import {
  AePAndAnp,
  filteredTable,
  powerOfTheStage,
  powerTotal,
  sportsmenWeight,
  timeInterval,
  timeSeconds,
  YOC,
} from './helpers';

export function totalTableIdСalculations(data: IDataTable) {
  // /////////// Ноги
  const legs = filteredTable(data.valueRanges, "'Ноги'!A1:Z1000");

  // Мощность предпоследней ступени
  const legsPenultimateStage: string[] = legs ? legs.at(-2) : []; // получаем предпоследнюю ступень
  const legsPenultimateStageNum = powerOfTheStage(legsPenultimateStage);

  // Мощность последней ступени
  const legsLastStage: string[] = legs ? legs.at(-1) : []; // получаем последнюю ступень
  const legsPenultimateStageLastNum = powerOfTheStage(legsLastStage);

  // Время ступени, с
  const legsFirstStage: string[] | undefined = legs ? legs.at(0) : [];
  const legsTimeFirst = timeSeconds(legsFirstStage);

  // Время работы на последней ступени, с
  const legsDiffTime = timeInterval(legsPenultimateStage, legsLastStage);

  // Мощность МПК, Вт
  let legsTotal = powerTotal(legsPenultimateStageNum, legsPenultimateStageLastNum, legsDiffTime, legsTimeFirst);

  // /////////// Руки
  const arms = filteredTable(data.valueRanges, "'Плечевой пояс'!A1:Z1000");

  // Мощность предпоследней ступени
  const armsPenultimateStage: string[] = arms ? arms.at(-2) : []; // получаем предпоследнюю ступень
  const armsPenultimateStageNum = powerOfTheStage(armsPenultimateStage);

  // Мощность последней ступени
  const armsLastStage: string[] = arms ? arms.at(-1) : []; // получаем последнюю ступень
  const armsPenultimateStageLastNum = powerOfTheStage(armsLastStage);

  // Время ступени, с
  const armsFirstStage: string[] | undefined = arms ? arms.at(0) : [];
  const armsTimeFirst = timeSeconds(armsFirstStage);

  // Время работы на последней ступени, с
  const armsDiffTime = timeInterval(armsPenultimateStage, armsLastStage);

  // Мощность МПК, Вт
  let armsTotal = powerTotal(armsPenultimateStageNum, armsPenultimateStageLastNum, armsDiffTime, armsTimeFirst);

  const weight = sportsmenWeight(data.valueRanges); // вес спортсмена

  // /////////// УОС ноги
  const legsYOC = YOC(legs, weight);
  const legsMaxYOC = parseFloat(legsYOC[legsYOC.length - 1][2]);
  const legsHeartRateMaxYOC = legsYOC[legsYOC.length - 1][0];
  legsYOC.unshift(['ЧСС', 'Мощность', 'УОС']);

  // /////////// УОС плечевой пояс
  const armsYOC = YOC(arms, weight);
  const armsMaxYOC = parseFloat(armsYOC[armsYOC.length - 1][2]);
  const armsHeartRateMaxYOC = armsYOC[armsYOC.length - 1][0];
  armsYOC.unshift(['ЧСС', 'Мощность', 'УОС']);

  // /////////// АэП и АнП ноги
  const [legsAePAndAnp, legsAeP, legsPowerAeP, legsAnP, legsPowerAnP] = AePAndAnp(legs);

  // /////////// АэП и АнП плечевой пояс
  const [armsAePAndAnp, armsAeP, armsPowerAeP, armsAnP, armsPowerAnP] = AePAndAnp(arms);

  return {
    legsPenultimateStageNum,
    legsPenultimateStageLastNum,
    legsTimeFirst,
    legsDiffTime,
    legsTotal,
    armsPenultimateStageNum,
    armsPenultimateStageLastNum,
    armsTimeFirst,
    armsDiffTime,
    armsTotal,
    legsYOC,
    armsYOC,
    legsMaxYOC,
    legsHeartRateMaxYOC,
    armsMaxYOC,
    armsHeartRateMaxYOC,
    legsAePAndAnp,
    legsAeP,
    legsPowerAeP,
    legsAnP,
    legsPowerAnP,
    armsAePAndAnp,
    armsAeP,
    armsPowerAeP,
    armsAnP,
    armsPowerAnP
  };
}
