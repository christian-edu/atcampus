export const routes = (group) => [
  {
    path: '/',
    breadcrumb: 'Grupper',
  },
  {
    path: '/groups',
    breadcrumb: null,
  },
  {
    path: '/groups/:id',
    breadcrumb: group,
  },
  {
    path: '/groups/:id/members',
    breadcrumb: 'Medlemmer',
  },
  {
    path: '/groups/:id/profile',
    breadcrumb: 'Endre gruppeprofil',
  },
  {
    path: '/groups/:id/members/search',
    breadcrumb: 'Legg til medlem',
  },
  {
    path: '/groups/specific/groupCriteria',
    breadcrumb: 'Gruppekriterier',
  },
  {
    path: '/groups/createGroup',
    breadcrumb: 'Opprett gruppe',
  },
  {
    path: '/groups/searchGroup',
    breadcrumb: 'Søk etter gruppe',
  },
  {
    path: '/groups/searchGroup/searchGroupResults',
    breadcrumb: 'Resultater',
  },
];
