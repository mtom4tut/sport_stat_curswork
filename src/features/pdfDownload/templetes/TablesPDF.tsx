import { FC, useMemo, useState } from 'react';

// Fonts
import '../assets/font.ts';

// Styles
import { styles } from '../assets/styles';

// Components
import { Page, Text, View } from '@react-pdf/renderer';
import { LayoutPDF } from './LayoutPDF';
import { HeaderPDF } from '../ui/HeaderPDF';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

interface TablesPDFProps {
  className?: string;
  data: IDataTable[];
}

export const TablesPDF: FC<TablesPDFProps> = ({ data }) => {
  const [tables, setTables] = useState<IDataTable[]>(data);

  useMemo(() => {
    setTables(data);
  }, [data]);

  return (
    <LayoutPDF>
      <Page style={styles.page}>
        <HeaderPDF />
        {tables.map(item => (
          <View key={item.spreadsheetId} style={styles.view}>
            <Text>ID: {item.spreadsheetId}</Text>
            <Text style={styles.defaultText}>{item.valueRanges[0].values.at(1)![0]}</Text>
            <Text style={styles.defaultText}>Дата рождения: {item.valueRanges[0].values.at(1)![1]}</Text>
            <Text style={styles.defaultText}>Дата прохождения: {item.valueRanges[0].values.at(1)![2]}</Text>
            <Text style={styles.defaultText}>Возраст: {item.valueRanges[0].values.at(1)![3]}</Text>
            <Text style={styles.defaultText}>Вес: {item.valueRanges[0].values.at(1)![4]}</Text>
          </View>
        ))}
      </Page>
    </LayoutPDF>
  );
};
