import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link, useLocation, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useParams } from 'react-router-dom';
import { routes } from '../../services/routes';
import { useLoader } from '../../useLoader';
import { fetchJSON } from '../../fetchJSON';
import Loading from './Loading';

const Breadcrumbs = () => {
  const params = useParams();

  const {
    data: group,
    error,
    loading,
  } = useLoader(() => fetchJSON(`/api/v1/groups/?groupId=${params.id}`));

  const breadcrumbs = useBreadcrumbs(routes(group?.name));

  if (loading) return <Loading />;

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
