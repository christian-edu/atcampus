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
    breadcrumb: group
  },
  {
    path: '/groups/specific/members',
    breadcrumb: 'Medlemmer',
  },
  {
    path: '/groups/specific/members/searchUser',
    breadcrumb: 'Legg til medlem',
  },
  {
    path: '/groups/specific/groupCriteria',
    breadcrumb: 'Gruppekriterier',
  },
  {
    path: '/groups/:id/profile',
    breadcrumb: 'Endre gruppeprofil',
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
