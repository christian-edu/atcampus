import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../services/routes';

const Breadcrumbs = () => {
  // Component for breadcrumbs
  // WIP

  const location = useLocation();

  console.log(location.state);
  const breadcrumbs = useBreadcrumbs(routes(location));

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
