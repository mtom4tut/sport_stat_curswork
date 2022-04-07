import { FC, useMemo, useState } from 'react';
import logo from '~assets/img/logo.png';

// Components
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

// Fonts
import '../assets/font.ts';

// Styles
import { styles } from '../assets/styles';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';
import { HeaderPDF } from '../ui/HeaderPDF';
import { LayoutPDF } from './LayoutPDF';

interface TablesPDFProps {
  className?: string;
  data: IDataTable;
}

export const TablesIdPDF: FC<TablesPDFProps> = ({ data }) => {
  const [tableId, setTableId] = useState<IDataTable>(data);

  useMemo(() => {
    setTableId(data);
  }, [data]);

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
      <Page size='A4' orientation='landscape'></Page>
      <Page size='A4' orientation='landscape'></Page>
      <Page size='A4'></Page>
    </LayoutPDF>
  );
};
