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
  } = totalTableIdСalculations(data);

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
        </View>
      </Page>
    </LayoutPDF>
  );
};
