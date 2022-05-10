import { FC } from 'react';

// Components
import { Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { Table } from '~entities/Table';

// Functions
import { totalTableIdСalculations } from '~entities/TableTotal/function/totalTableIdСalculations';

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
  const {
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
    legsAnp,
    armsAePAndAnp,
    armsAeP,
    armsAnp,
  } = totalTableIdСalculations(data);

  return (
    <>
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

            <div className={cl(styles['table-total__item'])}>
              <dt>МПК, л/мин: </dt>
              <dd>
                <b>{typeof legsTotal === 'number' ? (legsTotal / 75).toFixed(2) : legsTotal}</b>
              </dd>
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

            <div className={cl(styles['table-total__item'])}>
              <dt>МПК, л/мин:</dt>
              <dd>
                <b>{typeof armsTotal === 'number' ? (armsTotal / 75).toFixed(2) : armsTotal}</b>
              </dd>
            </div>
          </dl>
        </CollapsePanel>

        <CollapsePanel header='УОС Ноги' key='3'>
          <Table data={legsYOC} />
          <p className={cl(styles['table-total__item'])}>
            УОС max, мл: <b>{legsMaxYOC}</b>
          </p>
          <p className={cl(styles['table-total__item'])}>
            ЧСС УОС max, уд/мин: <b>{legsHeartRateMaxYOC}</b>
          </p>
        </CollapsePanel>

        <CollapsePanel header='УОС Плечевой пояс' key='4'>
          <Table data={armsYOC} />
          <p className={cl(styles['table-total__item'])}>
            УОС max, мл: <b>{armsMaxYOC}</b>
          </p>
          <p className={cl(styles['table-total__item'])}>
            ЧСС УОС max, уд/мин: <b>{armsHeartRateMaxYOC}</b>
          </p>
        </CollapsePanel>

        <CollapsePanel header='АэП и АнП ноги' key='5'>
          <Table data={legsAePAndAnp} />
        </CollapsePanel>

        <CollapsePanel header='АэП и АнП плечевой пояс' key='6'>
          <Table data={armsAePAndAnp} />
        </CollapsePanel>
      </Collapse>

      <hr />

      <div>
        <p className={cl(styles['table-total__item'])}>
          ЧСС АэП, уд/мин (ноги): <b>{legsAeP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          ЧСС АэП, уд/мин (плечевой пояс): <b>{armsAeP}</b>
        </p>

        <p className={cl(styles['table-total__item'])}>
          ЧСС АнП, уд/мин (ноги): <b>{legsAnp}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          ЧСС АнП, уд/мин (плечевой пояс): <b>{armsAnp}</b>
        </p>
      </div>
    </>
  );
};
