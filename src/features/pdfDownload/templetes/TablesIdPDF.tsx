import { FC, useMemo, useState } from 'react';

// Components
import { Page, Text, View } from '@react-pdf/renderer';
import { HeaderPDF } from '../ui/HeaderPDF';
import { LayoutPDF } from './LayoutPDF';

// Functions
import { totalTableIdСalculations } from '~entities/TableTotal/function/totalTableIdСalculations';

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
  } = totalTableIdСalculations(data);

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
          <Text style={styles.defaultText}>Дата рождения: {tableId.valueRanges[0].values.at(1)![1]}</Text>
          <Text style={styles.defaultText}>Дата прохождения: {tableId.valueRanges[0].values.at(1)![2]}</Text>
          <Text style={styles.defaultText}>Возраст: {tableId.valueRanges[0].values.at(1)![3]}</Text>
          <Text style={styles.defaultText}>Вес: {tableId.valueRanges[0].values.at(1)![4]}</Text>
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
          <Text style={styles.titleH2}>Итоги:</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>Ноги</Text>
          <View style={styles.view}>
            <Text style={styles.defaultText}>Мощность предпоследней ступени: {legsPenultimateStageNum}</Text>
            <Text style={styles.defaultText}>Мощность последней ступени: {legsPenultimateStageLastNum}</Text>
            <Text style={styles.defaultText}>Время ступени, с: {legsTimeFirst}</Text>
            <Text style={styles.defaultText}>Время работы на последней ступени, с: {legsDiffTime}</Text>
            <Text style={styles.defaultText}>Мощность МПК, Вт: {legsTotal}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>Плечевой пояс</Text>
          <View style={styles.view}>
            <Text style={styles.defaultText}>Мощность предпоследней ступени: {armsPenultimateStageNum}</Text>
            <Text style={styles.defaultText}>Мощность последней ступени: {armsPenultimateStageLastNum}</Text>
            <Text style={styles.defaultText}>Время ступени, с: {armsTimeFirst}</Text>
            <Text style={styles.defaultText}>Время работы на последней ступени, с: {armsDiffTime}</Text>
            <Text style={styles.defaultText}>Мощность МПК, Вт: {armsTotal}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>УОС ноги</Text>
          {legsYOC.map((row, i) => (
            <View key={i} style={styles.table}>
              <Text style={styles.tableItemBig}>{row[0]}</Text>
              <Text style={styles.tableItemBig}>{row[1]}</Text>
              <Text style={styles.tableItemBig}>{row[2]}</Text>
            </View>
          ))}
          <View style={styles.view}>
            <Text style={styles.defaultText}>УОС max, мл: {legsMaxYOC}</Text>
            <Text style={styles.defaultText}>ЧСС УОС max, уд/мин: {legsHeartRateMaxYOC}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>УОС Плечевой пояс</Text>
          {armsYOC.map((row, i) => (
            <View key={i} style={styles.table}>
              <Text style={styles.tableItemBig}>{row[0]}</Text>
              <Text style={styles.tableItemBig}>{row[1]}</Text>
              <Text style={styles.tableItemBig}>{row[2]}</Text>
            </View>
          ))}
          <View style={styles.view}>
            <Text style={styles.defaultText}>УОС max, мл: {armsMaxYOC}</Text>
            <Text style={styles.defaultText}>ЧСС УОС max, уд/мин: {armsHeartRateMaxYOC}</Text>
          </View>
        </View>
      </Page>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.view}>
          <Text style={styles.titleH2}>АэП и АнП ноги</Text>
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
          <Text style={styles.titleH2}>АэП и АнП плечевой пояс</Text>
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
          <Text style={styles.titleH3}>Ноги</Text>
          <Text style={styles.defaultText}>Мощность, АэП, Вт: {legsPowerAeP}</Text>
          <Text style={styles.defaultText}>ЧСС АэП, уд/мин: {legsAeP}</Text>
          <Text style={styles.defaultText}>ПК АэП, л/мин: {(legsPowerAeP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>Мощность, АнП, Вт: {legsPowerAnP}</Text>
          <Text style={styles.defaultText}>ЧСС АнП, уд/мин: {legsAnP}</Text>
          <Text style={styles.defaultText}>ПК АнП, л/мин: {(legsPowerAnP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>МАМ, Вт: {legsMAM}</Text>
          <Text style={styles.defaultText}>ОМВ, %: {legsOMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>ПМВ, %: {legsPMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>ГМВ, %: {legsGMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>АнП от МПК, %: {legsAnpMPC.toFixed(2)}</Text>
          <Text style={styles.defaultText}>АнП от МАМ, %: {legsAnpMAM.toFixed(2)}</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.titleH3}>Плечевой пояс</Text>
          <Text style={styles.defaultText}>Мощность, АэП, Вт: {armsPowerAeP}</Text>
          <Text style={styles.defaultText}>ЧСС АэП, уд/мин: {armsAeP}</Text>
          <Text style={styles.defaultText}>ПК АэП, л/мин: {(armsPowerAeP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>Мощность, АнП, Вт: {armsPowerAnP}</Text>
          <Text style={styles.defaultText}>ЧСС АнП, уд/мин: {armsAnP}</Text>
          <Text style={styles.defaultText}>ПК АнП, л/мин: {(armsPowerAnP / 75).toFixed(2)}</Text>
          <Text style={styles.defaultText}>МАМ, Вт: {armsMAM}</Text>
          <Text style={styles.defaultText}>ОМВ, %: {armsOMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>ПМВ, %: {armsPMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>ГМВ, %: {armsGMB.toFixed(2)}</Text>
          <Text style={styles.defaultText}>АнП от МПК, %: {armsAnpMPC.toFixed(2)}</Text>
          <Text style={styles.defaultText}>АнП от МАМ, %: {armsAnpMAM.toFixed(2)}</Text>
        </View>
      </Page>
    </LayoutPDF>
  );
};
