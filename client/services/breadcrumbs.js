export const routes = (params = null) => [
  {
    path: '/',
    breadcrumb: "Grupper",
  },
  {
    path: '/groups',
    breadcrumb: null,
  },
  {
    path: '/groups/search-group',
    breadcrumb: 'Søk etter gruppe',
  },
  {
    path: '/search-group/results',
    breadcrumb: 'Søkeresultater',
  },
  {
    path: 'groups/create-group',
    breadcrumb: 'Opprett gruppe',
  },
  {
    path: `/groups/:id`,
    breadcrumb: params.id,
  },
];
