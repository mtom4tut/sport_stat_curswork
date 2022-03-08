import { FC } from 'react';
import { Link } from 'react-router-dom';

// Config
import { IBreadcrumb } from './model/types';

// Components
import { Breadcrumb } from 'antd';

// Styles
import cl from 'classnames';

interface BreadcrumbProps {
  className?: string;
  breadcrumbs: IBreadcrumb[];
}

export const MyBreadcrumb: FC<BreadcrumbProps> = ({ className, breadcrumbs }) => {
  return (
    <Breadcrumb className={cl(className)}>
      {breadcrumbs.map((breadcrumb, i) => (
        <Breadcrumb.Item key={breadcrumb + '_' + i}>
          {breadcrumb.link !== undefined ? <Link to={breadcrumb.link}>{breadcrumb.text}</Link> : breadcrumb.text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
