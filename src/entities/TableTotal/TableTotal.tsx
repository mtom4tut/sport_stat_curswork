import { FC, useMemo, useState } from 'react';

// Components
import { Button, Collapse, InputNumber } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { Table } from '~entities/Table';
import { MyMessage } from '~shared/ui/MyMessage';

// Hook
import { useFetching } from '~shared/hooks/useFetching';

// Functions
import { totalTableId–°alculations } from '~entities/TableTotal/function/totalTableId–°alculations';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Styles
import cl from 'classnames';
import styles from './TableTotal.module.scss';
import { insertDataTotal } from '~processes/auth/api';

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
    legsPowerAeP,
    legsAnP,
    legsPowerAnP,
    armsAePAndAnp,
    armsAeP,
    armsPowerAeP,
    armsAnP,
    armsPowerAnP,
  } = totalTableId–°alculations(data);

  const [legsMAM, setLegsMAM] = useState<number>(1000);
  const [armsMAM, setArmsMAM] = useState<number>(270);

  const info = {
    OMB: 0,
    PMB: 0,
    GMB: 0,
    AnpMPC: 0,
    AnpMAM: 0,
  };

  const [legsInfo, setLegsInfo] = useState(info);
  const [armsInfo, setArmsInfo] = useState(info);

  useMemo(() => {
    const OMB = (legsPowerAeP / legsMAM) * 200;
    const PMB = (legsPowerAnP / legsMAM) * 200 - OMB;
    const GMB = 100 - OMB - PMB;
    const AnpMPC = (legsPowerAnP / legsTotal) * 100;
    const AnpMAM = (legsPowerAnP / legsMAM) * 100;

    setLegsInfo({
      OMB: Number(OMB.toFixed(2)),
      PMB: Number(PMB.toFixed(2)),
      GMB: Number(GMB.toFixed(2)),
      AnpMPC: Number(AnpMPC.toFixed(2)),
      AnpMAM: Number(AnpMAM.toFixed(2)),
    });
  }, [legsMAM, legsPowerAeP, legsPowerAnP, legsTotal]);

  useMemo(() => {
    const OMB = (armsPowerAeP / armsMAM) * 200;
    const PMB = (armsPowerAnP / armsMAM) * 200 - OMB;
    const GMB = 100 - OMB - PMB;
    const AnpMPC = (armsPowerAnP / armsTotal) * 100 ;
    const AnpMAM = (armsPowerAnP / armsMAM) * 100;

    setArmsInfo({
      OMB: Number(OMB.toFixed(2)),
      PMB: Number(PMB.toFixed(2)),
      GMB: Number(GMB.toFixed(2)),
      AnpMPC: Number(AnpMPC.toFixed(2)),
      AnpMAM: Number(AnpMAM.toFixed(2)),
    });
  }, [armsMAM, armsPowerAeP, armsPowerAnP, armsTotal]);

  const [fetchSaveDataBase, isLoadingSaveDataBase] = useFetching(saveDataBase);

  async function saveDataBase() {
    const value = data.valueRanges[0].values.at(1);

    if (value) {
      let date: string = String(value[2]).split('.').reverse().join('-');

      const response = await insertDataTotal(
        data.spreadsheetId,
        String(value[0]),
        Number(value[4]),
        Number(value[3]),
        date,
        legsPowerAeP,
        armsPowerAeP,
        legsAeP,
        armsAeP,
        legsPowerAnP,
        armsPowerAnP,
        legsAnP,
        armsAnP,
        legsTotal,
        armsTotal,
        legsMaxYOC,
        armsMaxYOC
      );

      if (response?.data) {
        MyMessage('error', '–ě—ą–ł–Ī–ļ–į', response.data);
      } else {
        MyMessage('success', '–í—č–Ņ–ĺ–Ľ–Ĺ–Ķ–Ĺ–ĺ', '–Ē–į–Ĺ–Ĺ—č–Ķ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č –≤ –Ī–į–∑—É –ī–į–Ĺ–Ĺ—č—Ö');
      }
    }
  }

  return (
    <>
      <div className={cl(styles['btn-block'])}>
        <Button loading={isLoadingSaveDataBase} type='primary' onClick={fetchSaveDataBase}>
          –°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –≤ –Ī–į–∑—É –ī–į–Ĺ–Ĺ—č—Ö
        </Button>
      </div>
      <Collapse className={cl(className, styles['table-total'])} ghost>
        <CollapsePanel header='–Ě–ĺ–≥–ł' key='1'>
          <dl>
            <div className={cl(styles['table-total__item'])}>
              <dt>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ—Ä–Ķ–ī–Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł </dt>
              <dd>{legsPenultimateStageNum ? legsPenultimateStageNum : '–Ě–Ķ—ā –ī–į–Ĺ–Ĺ—č—Ö'}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł </dt>
              <dd>{legsPenultimateStageLastNum ? legsPenultimateStageLastNum : '–Ě–Ķ—ā –ī–į–Ĺ–Ĺ—č—Ö'}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–í—Ä–Ķ–ľ—Ź —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā</dt>
              <dd>{legsTimeFirst ? legsTimeFirst : '–Ě–Ķ—ā –ī–į–Ĺ–Ĺ—č—Ö'}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–í—Ä–Ķ–ľ—Ź —Ä–į–Ī–ĺ—ā—č –Ĺ–į –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā</dt>
              <dd>{legsDiffTime}</dd>
            </div>

            <div className={cl(styles['table-total__item'], styles['table-total__item--accent'])}>
              <dt>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –ú–ü–ö, –í—ā</dt>
              <dd>{legsTotal}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–ú–ü–ö, –Ľ/–ľ–ł–Ĺ: </dt>
              <dd>
                <b>{typeof legsTotal === 'number' ? (legsTotal / 75).toFixed(2) : legsTotal}</b>
              </dd>
            </div>
          </dl>
        </CollapsePanel>
        <CollapsePanel header='–ü–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā' key='2'>
          <dl>
            <div className={cl(styles['table-total__item'])}>
              <dt>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ—Ä–Ķ–ī–Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł </dt>
              <dd>{armsPenultimateStageNum ? armsPenultimateStageNum : '–Ě–Ķ—ā –ī–į–Ĺ–Ĺ—č—Ö'}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł </dt>
              <dd>{armsPenultimateStageLastNum ? armsPenultimateStageLastNum : '–Ě–Ķ—ā –ī–į–Ĺ–Ĺ—č—Ö'}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–í—Ä–Ķ–ľ—Ź —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā</dt>
              <dd>{armsTimeFirst ? armsTimeFirst : '–Ě–Ķ—ā –ī–į–Ĺ–Ĺ—č—Ö'}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–í—Ä–Ķ–ľ—Ź —Ä–į–Ī–ĺ—ā—č –Ĺ–į –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā</dt>
              <dd>{armsDiffTime}</dd>
            </div>

            <div className={cl(styles['table-total__item'], styles['table-total__item--accent'])}>
              <dt>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –ú–ü–ö, –í—ā</dt>
              <dd>{armsTotal}</dd>
            </div>

            <div className={cl(styles['table-total__item'])}>
              <dt>–ú–ü–ö, –Ľ/–ľ–ł–Ĺ:</dt>
              <dd>
                <b>{typeof armsTotal === 'number' ? (armsTotal / 75).toFixed(2) : armsTotal}</b>
              </dd>
            </div>
          </dl>
        </CollapsePanel>

        <CollapsePanel header='–£–ě–° –Ě–ĺ–≥–ł' key='3'>
          <Table data={legsYOC} />
          <p className={cl(styles['table-total__item'])}>
            –£–ě–° max, –ľ–Ľ: <b>{legsMaxYOC}</b>
          </p>
          <p className={cl(styles['table-total__item'])}>
            –ß–°–° –£–ě–° max, —É–ī/–ľ–ł–Ĺ: <b>{legsHeartRateMaxYOC}</b>
          </p>
        </CollapsePanel>

        <CollapsePanel header='–£–ě–° –ü–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā' key='4'>
          <Table data={armsYOC} />
          <p className={cl(styles['table-total__item'])}>
            –£–ě–° max, –ľ–Ľ: <b>{armsMaxYOC}</b>
          </p>
          <p className={cl(styles['table-total__item'])}>
            –ß–°–° –£–ě–° max, —É–ī/–ľ–ł–Ĺ: <b>{armsHeartRateMaxYOC}</b>
          </p>
        </CollapsePanel>

        <CollapsePanel header='–ź—ć–ü –ł –ź–Ĺ–ü –Ĺ–ĺ–≥–ł' key='5'>
          <Table data={legsAePAndAnp} />
        </CollapsePanel>

        <CollapsePanel header='–ź—ć–ü –ł –ź–Ĺ–ü –Ņ–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā' key='6'>
          <Table data={armsAePAndAnp} />
        </CollapsePanel>
      </Collapse>

      <hr />

      <div>
        <h3 className={cl(styles['table-total__title'])}>–Ě–ĺ–≥–ł: </h3>
        <p className={cl(styles['table-total__item'])}>
          –ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź—ć–ü, –í—ā: <b>{legsPowerAeP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ß–°–° –ź—ć–ü, —É–ī/–ľ–ł–Ĺ: <b>{legsAeP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ü–ö –ź—ć–ü, –Ľ/–ľ–ł–Ĺ: <b>{(legsPowerAeP / 75).toFixed(2)}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź–Ĺ–ü, –í—ā: <b>{legsPowerAnP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ß–°–° –ź–Ĺ–ü, —É–ī/–ľ–ł–Ĺ: <b>{legsAnP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ü–ö –ź–Ĺ–ü, –Ľ/–ľ–ł–Ĺ: <b>{(legsPowerAnP / 75).toFixed(2)}</b>
        </p>
        <div className={cl(styles['table-total__item'])}>
          –ú–ź–ú, –í—ā:
          <InputNumber type='number' controls={false} value={legsMAM} onChange={e => setLegsMAM(e)} maxLength={6} />
        </div>
        <p className={cl(styles['table-total__item'])}>
          –ě–ú–í, %: <b>{legsInfo.OMB}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ü–ú–í, %:
          <b>{legsInfo.PMB}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ď–ú–í, %:
          <b>{legsInfo.GMB}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ź–Ĺ–ü –ĺ—ā –ú–ü–ö, %:
          <b> {legsInfo.AnpMPC}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ź–Ĺ–ü –ĺ—ā –ú–ź–ú, %:
          <b>{legsInfo.AnpMAM}</b>
        </p>
      </div>

      <div>
        <h3 className={cl(styles['table-total__title'])}>–ü–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā: </h3>
        <p className={cl(styles['table-total__item'])}>
          –ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź—ć–ü, –í—ā: <b>{armsPowerAeP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ß–°–° –ź—ć–ü, —É–ī/–ľ–ł–Ĺ: <b>{armsAeP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ü–ö –ź—ć–ü, –Ľ/–ľ–ł–Ĺ: <b>{(armsPowerAeP / 75).toFixed(2)}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź–Ĺ–ü, –í—ā: <b>{armsPowerAnP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ß–°–° –ź–Ĺ–ü, —É–ī/–ľ–ł–Ĺ: <b>{armsAnP}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ü–ö –ź–Ĺ–ü, –Ľ/–ľ–ł–Ĺ: <b>{(armsPowerAnP / 75).toFixed(2)}</b>
        </p>
        <div className={cl(styles['table-total__item'])}>
          –ú–ź–ú, –í—ā:
          <InputNumber type='number' controls={false} value={armsMAM} onChange={e => setArmsMAM(e)} maxLength={6} />
        </div>
        <p className={cl(styles['table-total__item'])}>
          –ě–ú–í, %<b>{armsInfo.OMB}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ü–ú–í, %:
          <b>{armsInfo.PMB}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ď–ú–í, %:
          <b>{armsInfo.GMB}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ź–Ĺ–ü –ĺ—ā –ú–ü–ö, %:
          <b>{armsInfo.AnpMPC}</b>
        </p>
        <p className={cl(styles['table-total__item'])}>
          –ź–Ĺ–ü –ĺ—ā –ú–ź–ú, %:
          <b>{armsInfo.AnpMAM}</b>
        </p>
      </div>
    </>
  );
};
