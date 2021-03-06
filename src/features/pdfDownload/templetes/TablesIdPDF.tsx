import { FC, useMemo, useState } from 'react';

// Components
import { Page, Text, View } from '@react-pdf/renderer';
import { HeaderPDF } from '../ui/HeaderPDF';
import { LayoutPDF } from './LayoutPDF';

// Functions
import { totalTableId–°alculations } from '~entities/TableTotal/function/totalTableId–°alculations';

// Utils
import { parseNameTable } from '~shared/utils/parseNameTable';

// Fonts
import '../assets/font.ts';

// Styles
import { styles } from '../assets/styles';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

interface TablesPDFProps {
  data: IDataTable;
}

export const TablesIdPDF: FC<TablesPDFProps> = ({ data }) => {
  const [tableId, setTableId] = useState<IDataTable>(data);

  useMemo(() => {
    setTableId(data);
  }, [data]);

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

  const legsMAM = 1000;
  const armsMAM = 270;

  const legsOMB = (legsPowerAeP / legsMAM) * 200;
  const legsPMB = (legsPowerAnP / legsMAM) * 200 - legsOMB;
  const legsGMB = 100 - legsOMB - legsPMB;
  const legsAnpMPC = (legsPowerAnP / legsTotal) * 100;
  const legsAnpMAM = (legsPowerAnP / legsMAM) * 100;

  const armsOMB = (armsPowerAeP / armsMAM) * 200;
  const armsPMB = (armsPowerAnP / armsMAM) * 200 - armsOMB;
  const armsGMB = 100 - armsOMB - armsPMB;
  const armsAnpMPC = (armsPowerAnP / armsTotal) * 100 ;
  const armsAnpMAM = (armsPowerAnP / armsMAM) * 100;

  return (
    <LayoutPDF>
      <Page size='A4' style={styles.page}>
        <HeaderPDF />
        <View>
          <Text>ID: {tableId.spreadsheetId}</Text>
          <Text style={styles.defaultText}>{tableId.valueRanges[0].values.at(1)![0]}</Text>
          <Text style={styles.defaultText}>–Ē–į—ā–į —Ä–ĺ–∂–ī–Ķ–Ĺ–ł—Ź: {tableId.valueRanges[0].values.at(1)![1]}</Text>
          <Text style={styles.defaultText}>–Ē–į—ā–į –Ņ—Ä–ĺ—Ö–ĺ–∂–ī–Ķ–Ĺ–ł—Ź: {tableId.valueRanges[0].values.at(1)![2]}</Text>
          <Text style={styles.defaultText}>–í–ĺ–∑—Ä–į—Ā—ā: {tableId.valueRanges[0].values.at(1)![3]}</Text>
          <Text style={styles.defaultText}>–í–Ķ—Ā: {tableId.valueRanges[0].values.at(1)![4]}</Text>
        </View>
      </Page>

      {data.valueRanges.map((item, index) => {
        if (!index) {
          return;
        }

        return (
          <Page key={index} size='A4' orientation='landscape' style={styles.page}>
            <View style={styles.view}>
              <Text style={styles.titleH2}>{parseNameTable(item.range)}</Text>
            </View>
            {item.values.map((row, i) => (
              <View key={i} style={styles.table}>
                <Text style={styles.tableItem}>{row[0]}</Text>
                <Text style={styles.tableItemBig}>{row[1]}</Text>
                <Text style={styles.tableItem}>{row[2]}</Text>
                <Text style={styles.tableItem}>{row[3]}</Text>
                <Text style={styles.tableItem}>{row[4]}</Text>
                <Text style={styles.tableItem}>{row[5]}</Text>
                <Text style={styles.tableItem}>{row[6]}</Text>
                <Text style={styles.tableItem}>{row[7]}</Text>
                <Text style={styles.tableItem}>{row[8]}</Text>
                <Text style={styles.tableItem}>{row[9]}</Text>
                <Text style={styles.tableItem}>{row[10]}</Text>
                <Text style={styles.tableItem}>{row[11]}</Text>
                <Text style={styles.tableItem}>{row[12]}</Text>
              </View>
            ))}
          </Page>
        );
      })}
      <Page size='A4' style={styles.page}>
        <View style={styles.view}>
          <Text style={styles.titleH2}>–ė—ā–ĺ–≥–ł:</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>–Ě–ĺ–≥–ł</Text>
          <View style={styles.view}>
            <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ—Ä–Ķ–ī–Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł: {legsPenultimateStageNum}</Text>
            <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł: {legsPenultimateStageLastNum}</Text>
            <Text style={styles.defaultText}>–í—Ä–Ķ–ľ—Ź —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā: {legsTimeFirst}</Text>
            <Text style={styles.defaultText}>–í—Ä–Ķ–ľ—Ź —Ä–į–Ī–ĺ—ā—č –Ĺ–į –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā: {legsDiffTime}</Text>
            <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –ú–ü–ö, –í—ā: {legsTotal}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>–ü–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā</Text>
          <View style={styles.view}>
            <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ—Ä–Ķ–ī–Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł: {armsPenultimateStageNum}</Text>
            <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł: {armsPenultimateStageLastNum}</Text>
            <Text style={styles.defaultText}>–í—Ä–Ķ–ľ—Ź —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā: {armsTimeFirst}</Text>
            <Text style={styles.defaultText}>–í—Ä–Ķ–ľ—Ź —Ä–į–Ī–ĺ—ā—č –Ĺ–į –Ņ–ĺ—Ā–Ľ–Ķ–ī–Ĺ–Ķ–Ļ —Ā—ā—É–Ņ–Ķ–Ĺ–ł, —Ā: {armsDiffTime}</Text>
            <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć –ú–ü–ö, –í—ā: {armsTotal}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>–£–ě–° –Ĺ–ĺ–≥–ł</Text>
          {legsYOC.map((row, i) => (
            <View key={i} style={styles.table}>
              <Text style={styles.tableItemBig}>{row[0]}</Text>
              <Text style={styles.tableItemBig}>{row[1]}</Text>
              <Text style={styles.tableItemBig}>{row[2]}</Text>
            </View>
          ))}
          <View style={styles.view}>
            <Text style={styles.defaultText}>–£–ě–° max, –ľ–Ľ: {legsMaxYOC}</Text>
            <Text style={styles.defaultText}>–ß–°–° –£–ě–° max, —É–ī/–ľ–ł–Ĺ: {legsHeartRateMaxYOC}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>–£–ě–° –ü–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā</Text>
          {armsYOC.map((row, i) => (
            <View key={i} style={styles.table}>
              <Text style={styles.tableItemBig}>{row[0]}</Text>
              <Text style={styles.tableItemBig}>{row[1]}</Text>
              <Text style={styles.tableItemBig}>{row[2]}</Text>
            </View>
          ))}
          <View style={styles.view}>
            <Text style={styles.defaultText}>–£–ě–° max, –ľ–Ľ: {armsMaxYOC}</Text>
            <Text style={styles.defaultText}>–ß–°–° –£–ě–° max, —É–ī/–ľ–ł–Ĺ: {armsHeartRateMaxYOC}</Text>
          </View>
        </View>
      </Page>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.view}>
          <Text style={styles.titleH2}>–ź—ć–ü –ł –ź–Ĺ–ü –Ĺ–ĺ–≥–ł</Text>
        </View>
        {legsAePAndAnp.map((row, i) => (
          <View key={i} style={styles.table}>
            <Text style={styles.tableItem}>{row[0]}</Text>
            <Text style={styles.tableItemSmall}>{row[1]}</Text>
            <Text style={styles.tableItemSmall}>{row[2]}</Text>
            <Text style={styles.tableItem}>{row[3]}</Text>
            <Text style={styles.tableItem}>{row[4]}</Text>
            <Text style={styles.tableItemBig}>{row[5]}</Text>
            <Text style={styles.tableItemBig}>{row[6]}</Text>
            <Text style={styles.tableItemSmall}>{row[7]}</Text>
            <Text style={styles.tableItemSmall}>{row[8]}</Text>
            <Text style={styles.tableItemSmall}>{row[9]}</Text>
            <Text style={styles.tableItemSmall}>{row[10]}</Text>
            <Text style={styles.tableItemSmall}>{row[11]}</Text>
            <Text style={styles.tableItemSmall}>{row[12]}</Text>
          </View>
        ))}

        <View style={styles.view}></View>
        <View style={styles.view}></View>

        <View style={styles.view}>
          <Text style={styles.titleH2}>–ź—ć–ü –ł –ź–Ĺ–ü –Ņ–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā</Text>
        </View>
        {armsAePAndAnp.map((row, i) => (
          <View key={i} style={styles.table}>
            <Text style={styles.tableItem}>{row[0]}</Text>
            <Text style={styles.tableItemSmall}>{row[1]}</Text>
            <Text style={styles.tableItemSmall}>{row[2]}</Text>
            <Text style={styles.tableItem}>{row[3]}</Text>
            <Text style={styles.tableItem}>{row[4]}</Text>
            <Text style={styles.tableItemBig}>{row[5]}</Text>
            <Text style={styles.tableItemBig}>{row[6]}</Text>
            <Text style={styles.tableItemSmall}>{row[7]}</Text>
            <Text style={styles.tableItemSmall}>{row[8]}</Text>
            <Text style={styles.tableItemSmall}>{row[9]}</Text>
            <Text style={styles.tableItemSmall}>{row[10]}</Text>
            <Text style={styles.tableItemSmall}>{row[11]}</Text>
            <Text style={styles.tableItemSmall}>{row[12]}</Text>
          </View>
        ))}
      </Page>
      <Page size='A4' style={styles.page}>
        <View style={styles.view}>
          <Text style={styles.titleH3}>–Ě–ĺ–≥–ł</Text>
          <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź—ć–ü, –í—ā: {legsPowerAeP}</Text>
          <Text style={styles.defaultText}>–ß–°–° –ź—ć–ü, —É–ī/–ľ–ł–Ĺ: {legsAeP}</Text>
          <Text style={styles.defaultText}>–ü–ö –ź—ć–ü, –Ľ/–ľ–ł–Ĺ: {(legsPowerAeP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź–Ĺ–ü, –í—ā: {legsPowerAnP}</Text>
          <Text style={styles.defaultText}>–ß–°–° –ź–Ĺ–ü, —É–ī/–ľ–ł–Ĺ: {legsAnP}</Text>
          <Text style={styles.defaultText}>–ü–ö –ź–Ĺ–ü, –Ľ/–ľ–ł–Ĺ: {(legsPowerAnP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ú–ź–ú, –í—ā: {legsMAM}</Text>
          <Text style={styles.defaultText}>–ě–ú–í, %: {legsOMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ü–ú–í, %: {legsPMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ď–ú–í, %: {legsGMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ź–Ĺ–ü –ĺ—ā –ú–ü–ö, %: {legsAnpMPC.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ź–Ĺ–ü –ĺ—ā –ú–ź–ú, %: {legsAnpMAM.toFixed(2)}</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>–ü–Ľ–Ķ—á–Ķ–≤–ĺ–Ļ –Ņ–ĺ—Ź—Ā</Text>
          <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź—ć–ü, –í—ā: {armsPowerAeP}</Text>
          <Text style={styles.defaultText}>–ß–°–° –ź—ć–ü, —É–ī/–ľ–ł–Ĺ: {armsAeP}</Text>
          <Text style={styles.defaultText}>–ü–ö –ź—ć–ü, –Ľ/–ľ–ł–Ĺ: {(armsPowerAeP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ú–ĺ—Č–Ĺ–ĺ—Ā—ā—Ć, –ź–Ĺ–ü, –í—ā: {armsPowerAnP}</Text>
          <Text style={styles.defaultText}>–ß–°–° –ź–Ĺ–ü, —É–ī/–ľ–ł–Ĺ: {armsAnP}</Text>
          <Text style={styles.defaultText}>–ü–ö –ź–Ĺ–ü, –Ľ/–ľ–ł–Ĺ: {(armsPowerAnP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ú–ź–ú, –í—ā: {armsMAM}</Text>
          <Text style={styles.defaultText}>–ě–ú–í, %: {armsOMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ü–ú–í, %: {armsPMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ď–ú–í, %: {armsGMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ź–Ĺ–ü –ĺ—ā –ú–ü–ö, %: {armsAnpMPC.toFixed(2)}</Text>
          <Text style={styles.defaultText}>–ź–Ĺ–ü –ĺ—ā –ú–ź–ú, %: {armsAnpMAM.toFixed(2)}</Text>
        </View>
      </Page>
    </LayoutPDF>
  );
};
