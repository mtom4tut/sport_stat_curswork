import { FC } from 'react';
import logo from '~assets/img/logo.png';

// Fonts
import '../assets/font.ts';

// Styles
import { styles } from '../assets/styles';

// Components
import { Image, Text, View } from '@react-pdf/renderer';

export const HeaderPDF: FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.flexView}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>Sport Stat</Text>
      </View>
      <Text style={styles.defaultText}>{new Date().toLocaleString('ru')}</Text>
    </View>
  );
};
