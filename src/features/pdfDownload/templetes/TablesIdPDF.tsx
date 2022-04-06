import { FC, useMemo, useState } from 'react';
import logo from '~assets/img/logo.png';

// Components
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

interface TablesPDFProps {
  className?: string;
  data: IDataTable;
}

export const TablesIdPDF: FC<TablesPDFProps> = ({ data }) => {
  const [tableId, setTableId] = useState<IDataTable>(data);

  useMemo(() => {
    setTableId(data);
  }, [data]);

  Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
  });

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Roboto',
      backgroundColor: '#E4E4E4',
      paddingTop: 20,
      paddingRight: 15,
      paddingBottom: 20,
      paddingLeft: 30,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 50,
    },
    logo: {
      width: 64,
      height: 64,
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 34,
      fontWeight: 700,
    },
    defaultText: {
      fontSize: 14,
      fontWeight: 400,
    },
  });

  return (
    <Document title='Sport Stat' language='ru'>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <View style={styles.flexView}>
            <Image style={styles.logo} src={logo} />
            <Text style={styles.title}>Sport Stat</Text>
          </View>
          <Text style={styles.defaultText}>{new Date().toLocaleString('ru')}</Text>
        </View>
        <View>
          <Text>ID: {data.spreadsheetId}</Text>
          <Text style={styles.defaultText}>{data.valueRanges[0].values.at(1)![0]}</Text>
          <Text style={styles.defaultText}>Дата рождения: {data.valueRanges[0].values.at(1)![1]}</Text>
          <Text style={styles.defaultText}>Дата прохождения: {data.valueRanges[0].values.at(1)![2]}</Text>
          <Text style={styles.defaultText}>Возраст: {data.valueRanges[0].values.at(1)![3]}</Text>
          <Text style={styles.defaultText}>Вес: {data.valueRanges[0].values.at(1)![4]}</Text>
        </View>
      </Page>
      <Page orientation='landscape'></Page>
      <Page orientation='landscape'></Page>
      <Page></Page>
    </Document>
  );
};
