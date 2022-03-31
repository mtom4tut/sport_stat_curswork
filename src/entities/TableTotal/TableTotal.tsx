import { FC } from 'react';

// Components

// Functions
import { filteredTable, powerOfTheStage, powerTotal, timeInterval, timeSeconds } from './function/helpers';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Styles
import cl from 'classnames';
import styles from './TableTotal.module.scss';
import { Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

interface TableTotalProps {
  className?: string;
  data: IDataTable;
}

export const TableTotal: FC<TableTotalProps> = ({ className, data }) => {
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

  return (
    <Collapse className={cl(className, styles['table-total'])} ghost>
      <CollapsePanel header='Ноги' key='1'>
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
            <dd>{legsDiffTime}</dd>
          </div>

          <div className={cl(styles['table-total__item'], styles['table-total__item--accent'])}>
            <dt>Мощность МПК, Вт</dt>
            <dd>{legsTotal}</dd>
          </div>
        </dl>
      </CollapsePanel>
      <CollapsePanel header='Плечевой пояс' key='2'>
        <dl>
          <div className={cl(styles['table-total__item'])}>
            <dt>Мощность предпоследней ступени </dt>
            <dd>{armsPenultimateStageNum ? armsPenultimateStageNum : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'])}>
            <dt>Мощность последней ступени </dt>
            <dd>{armsPenultimateStageLastNum ? armsPenultimateStageLastNum : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'])}>
            <dt>Время ступени, с</dt>
            <dd>{armsTimeFirst ? armsTimeFirst : 'Нет данных'}</dd>
          </div>

          <div className={cl(styles['table-total__item'])}>
            <dt>Время работы на последней ступени, с</dt>
            <dd>{armsDiffTime}</dd>
          </div>

          <div className={cl(styles['table-total__item'], styles['table-total__item--accent'])}>
            <dt>Мощность МПК, Вт</dt>
            <dd>{armsTotal}</dd>
          </div>
        </dl>
      </CollapsePanel>
    </Collapse>
  );
};
