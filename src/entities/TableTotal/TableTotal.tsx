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
  } = totalTableIdСalculations(data);

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
      <CollapsePanel header='УОС Ноги' key='3'>
        <Table data={legsYOC} />
      </CollapsePanel>
      <CollapsePanel header='УОС Плечевой пояс' key='4'>
        <Table data={armsYOC} />
      </CollapsePanel>
    </Collapse>
  );
};
