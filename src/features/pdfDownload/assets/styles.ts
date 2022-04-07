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
  view: {
    marginBottom: 20,
  },
});
