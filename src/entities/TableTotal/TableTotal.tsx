import { FC } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Styles
import cl from 'classnames';
import styles from './TableTotal.module.scss';

interface TableTotalProps {
  className?: string;
  data: IDataTable;
}

export const TableTotal: FC<TableTotalProps> = ({ className, data }) => {
  function timeSeconds(stage: string[] | undefined) {
    const timeStage: string[] | undefined = stage?.at(0)?.split(/:|,/);
    let legsTimeFirst;

    if (timeStage) {
      const minToSec = parseInt(timeStage[0]) * 60;
      legsTimeFirst = minToSec + parseInt(timeStage[1]);
    }

    return legsTimeFirst;
  }

  const legs = data.valueRanges.find(item => item.range === "'Ноги'!A1:Z1000");
  const legsFilters = legs?.values.filter(item => parseFloat(item[6]));

  // Мощность предпоследней ступени
  const legsPenultimateStage: string[] | undefined = legsFilters ? legsFilters.at(-2) : [];
  let legsPenultimateStageNum: string | number | undefined = legsPenultimateStage?.at(6)?.replace(',', '.');
  legsPenultimateStageNum = legsPenultimateStageNum ? parseFloat(legsPenultimateStageNum) : 0;

  // Мощность последней ступени
  const legsLastStage: string[] | undefined = legsFilters ? legsFilters.at(-1) : [];
  let legsPenultimateStageLastNum: string | number | undefined = legsLastStage?.at(6)?.replace(',', '.');
  legsPenultimateStageLastNum = legsPenultimateStageLastNum ? parseFloat(legsPenultimateStageLastNum) : 0;

  // Время ступени, с
  const legsFirstStage: string[] | undefined = legsFilters ? legsFilters.at(0) : [];
  const legsTimeFirst = timeSeconds(legsFirstStage);

  // Время работы на последней ступени, с
  const legsLastTimeStage = timeSeconds(legsLastStage);
  const legsPenultimateTimeStage = timeSeconds(legsPenultimateStage);
  let legsDiffTime;
  if (legsLastTimeStage && legsPenultimateTimeStage) {
    legsDiffTime = legsLastTimeStage - legsPenultimateTimeStage;
  }

  // Мощность МПК, Вт
  let legsTotal;

  if (legsPenultimateStageNum && legsPenultimateStageLastNum && legsTimeFirst && legsDiffTime) {
    legsTotal =
      legsPenultimateStageNum +
      ((legsPenultimateStageLastNum - legsPenultimateStageNum) * legsDiffTime) / legsTimeFirst;
  }

  return (
    <div className={cl(className, styles['table-total'])}>
      <div>
        <h2 className={cl(styles['table-total__title'])}>Ноги</h2>
        <dl>
          <div className={cl(styles['table-total__item'])}>
            <dt>Мощность предпоследней ступени </dt>
            <dd>{legsPenultimateStageNum ? legsPenultimateStageNum : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'])}>
            <dt>Мощность последней ступени </dt>
            <dd>{legsPenultimateStageLastNum ? legsPenultimateStageLastNum : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'])}>
            <dt>Время ступени, с</dt>
            <dd>{legsTimeFirst ? legsTimeFirst : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'])}>
            <dt>Время работы на последней ступени, с</dt>
            <dd>{legsDiffTime ? legsDiffTime : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'], styles['table-total__item--accent'])}>
            <dt>Мощность МПК, Вт</dt>
            <dd>{legsTotal ? legsTotal : 'Нет данных'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
