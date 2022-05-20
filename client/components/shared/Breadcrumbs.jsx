import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../services/breadcrumbs';

const Breadcrumbs = () => {
  const params = useParams();

  const breadcrumbs = useBreadcrumbs(routes(params));

  console.log(breadcrumbs);

  return (
    <ul className='flex'>
      {breadcrumbs.map(({ key, breadcrumb }, i) => {
        if (i === breadcrumbs.length - 1)
          return <li key={key}>{breadcrumb}</li>;
        return (
          <li key={key} className='text-purple-1'>
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
