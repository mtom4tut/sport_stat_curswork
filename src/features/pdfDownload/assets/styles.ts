import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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

  view: {
    marginBottom: 20,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
  },
  titleH2: {
    fontSize: 24,
    fontWeight: 700,
  },
  titleH3: {
    fontSize: 20,
    fontWeight: 700,
  },
  defaultText: {
    fontSize: 14,
    fontWeight: 400,
  },

  table: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid black',
  },
  tableItem: {
    width: 170,
    fontSize: 11,
    fontWeight: 400,
    textAlign: 'center',
    borderRight: '1px solid black',
  },
  tableItemBig: {
    width: 250,
    fontSize: 11,
    fontWeight: 400,
    textAlign: 'center',
    borderRight: '1px solid black',
  },
});
