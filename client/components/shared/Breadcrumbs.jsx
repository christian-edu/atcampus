import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useParams } from 'react-router-dom';
import { routes } from '../../services/routes';
import { useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rest = await fetch(`/api/v1/groups/?groupId=${params.id}`);
      const data = await rest.json();
      setGroup(data);
    };

    fetchData();
  }, []);

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
