import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../services/routes';
import { useContext, useEffect, useState } from 'react';
import { UserGroupsContext } from '../../store/UserGroupsContext';

const Breadcrumbs = () => {
  const { getGroupById } = useContext(UserGroupsContext);

  const params = useParams();

  const group = getGroupById(params.id);

  const breadcrumbs = useBreadcrumbs(routes(group?.name));

  return (
    <ul className='flex'>
      {breadcrumbs.map(({ key, breadcrumb }, i) => {
        if (i === breadcrumbs.length - 1)
          return <li key={key}>{breadcrumb}</li>;
        return (
          <li key={key} className='text-purple-1 mb-6'>
            <Link to={key} className='flex items-center'>
              {breadcrumb} <ChevronRightIcon className='h-4' />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
