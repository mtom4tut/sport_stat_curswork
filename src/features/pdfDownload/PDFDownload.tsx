import { FC, ReactElement } from 'react';

// Styles
import cl from 'classnames';
import styles from './PDFDownload.module.scss';

// Components
import { PDFDownloadLink } from '@react-pdf/renderer';

interface PDFDownloadProps {
  className?: string;
  Template: ReactElement;
  filename?: string;
}

export const PDFDownload: FC<PDFDownloadProps> = ({ className, Template, filename = 'tables' }) => {
  return (
    <PDFDownloadLink
      document={Template}
      fileName={`${filename}.pdf`}
      className={cl(className, styles['pdf-btn'], 'ant-btn ant-btn-primary')}
    >
      <svg xmlns='http://www.w3.org/2000/svg' version='1.0' viewBox='0 0 512 512'>
        <path d='M174.7 70.1c-9.9 2.3-19.7 10.4-24 19.7-2.2 4.6-2.2 5.5-2.7 76.7l-.5 72-24 .5c-23 .5-24.2.6-27.8 2.8-2 1.3-5 4.5-6.5 7l-2.7 4.7v63c0 34.6.3 64.2.8 65.7 1.1 4 6.6 9.8 11.2 11.9 3.5 1.6 6.9 1.9 26.8 1.9H148v10c0 7.7.5 11.2 2.2 15.7 2.9 7.8 11.1 16.1 19.3 19.4l6 2.4h111c106.5 0 111.2-.1 116-1.9 11-4.2 19.4-13.2 22.2-23.9 1-4.1 1.3-28.9 1.3-126.2v-121l-50.8-50.7L324.5 69l-73 .1c-40.2.1-74.7.5-76.8 1zm140.5 48.6c.3 34.3.4 36 2.5 40.5 3.2 7.1 10.3 14.1 17.6 17.4l6.2 2.9 35.3.3 35.2.3v115.1c0 88.1-.3 116-1.2 119.2-1.6 5.3-8.1 11.8-13.4 13.4-5.5 1.6-214.9 1.8-220.7.1-4.7-1.3-11.5-7.2-13.4-11.6-.7-1.9-1.3-7-1.3-12.3v-9h75.4c50.8 0 76.4-.3 78.3-1.1 3.8-1.4 9.2-6.7 10.9-10.6 1.1-2.6 1.4-15 1.4-66.8 0-56.7-.2-63.9-1.6-66.8-2.3-4.6-4.3-6.6-8.9-9.1-4-2.1-4.5-2.1-79.8-2.4l-75.7-.3.2-70.8.3-70.9 3-4.3c1.7-2.3 5-5.3 7.4-6.6l4.4-2.3h137.6l.3 35.7zm59.1 47.1c-18 .2-28.1-.1-30.8-.8-5.5-1.6-10.1-5.3-12.8-10.3-2.1-4-2.2-5.4-2.5-33.2l-.3-29 36.6 36.5 36.5 36.5-26.7.3zm-61.8 88.7l2.5 2.4v120.2l-2.5 2.5-2.4 2.4-103.2-.2-103.1-.3-1.9-2.4c-1.8-2.2-1.9-4.7-1.9-61.8 0-40.1.3-60.1 1.1-61.4.6-1.1 2-2.4 3.2-2.9 1.2-.5 47.9-.9 104-.9l101.8-.1 2.4 2.5z' />
        <path d='M122 317v29h12v-19h8.3c4.6 0 10.6-.7 13.3-1.5 18.2-5.4 17.8-30.2-.5-36.4-1.9-.6-9.8-1.1-18.2-1.1H122v29zm29.5-16.6c5.5 2.3 6.2 9.3 1.3 12.9-2 1.5-4.8 2.1-10.8 2.5l-8 .5V299h7c3.9 0 8.6.6 10.5 1.4zM181.2 316.7l.3 28.8 15-.1c14.2 0 15.3-.2 21-2.8 11.3-5.1 16.5-12.4 17.3-24.1.6-9.3-2.1-15.8-9-22-7.3-6.6-14.4-8.5-31.4-8.5H181l.2 28.7zm31.6-15.6c12.4 6.1 13.3 24 1.4 30.7-3.2 1.8-5.6 2.2-12.1 2.2H194v-35h7.2c5.3 0 8.3.6 11.6 2.1zM249 317v29h13v-23h28v-11h-28v-13h32v-11h-45v29z' />
      </svg>
    </PDFDownloadLink>
  );
};
