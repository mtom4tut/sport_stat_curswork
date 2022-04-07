import { FC, ReactNode } from 'react';

// Components
import { Document } from '@react-pdf/renderer';

interface LayoutPDFProps {
  children?: ReactNode;
}

export const LayoutPDF: FC<LayoutPDFProps> = ({ children }) => {
  return (
    <Document title='Sport Stat' language='ru'>
      {children}
    </Document>
  );
};
