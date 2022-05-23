export const routes = (location) => [
  {
    path: '/',
    breadcrumb: 'Grupper',
  },
  {
    path: '/groups',
    breadcrumb: null,
  },
  {
    path: '/groups/specific',
    breadcrumb: location.state?.group?.name,
  },
  {
    path: '/groups/specific/members',
    breadcrumb: 'Medlemmer',
  },
  {
    path: '/groups/specific/groupCriteria',
    breadcrumb: 'Gruppekriterier',
  },
  {
    path: '/groups/specific/editProfile',
    breadcrumb: 'Rediger profil',
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
