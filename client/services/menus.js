import {
  UserIcon,
  CogIcon,
  BellIcon,
  HomeIcon,
  ColorSwatchIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CalendarIcon,
} from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';

export const profileMenu = [
  {
    title: 'Endre profil',
    path: '/',
    Icon: UserIcon,
  },
  {
    title: 'Instillinger',
    path: '/',
    Icon: CogIcon,
  },
  {
    title: 'Notifikasjoner',
    path: '/',
    Icon: BellIcon,
  },
  {
    title: 'Logg ut',
    path: '/',
    Icon: LogoutIcon,
  },
];

export const topNavBarMenu = [
  {
    title: 'Forsiden',
    path: '/',
    Icon: HomeIcon,
  },
  {
    title: 'Grupper',
    path: '/',
    Icon: UserGroupIcon,
  },
  {
    title: 'Flashcards',
    path: '/',
    Icon: ColorSwatchIcon,
  },
  {
    title: 'Dokumentdeling',
    path: '/',
    Icon: DocumentTextIcon,
  },
  {
    title: 'Mine spørsmål',
    path: '/',
    Icon: QuestionMarkCircleIcon,
  },
  {
    title: 'Mine svar',
    path: '/',
    Icon: QuestionMarkCircleIcon,
  },
];

export const leftNavBarMenu = [
  ...topNavBarMenu,
  {
    title: 'Profil',
    path: '/',
    Icon: UserIcon,
  },
];

// export const bottomNavBarMenu = [
//   {
//     title: 'Spørsmål',
//     path: '/',
//     Icon: QuestionMarkCircleIcon,
//   },
//   {
//     title: 'Kalender',
//     path: '/',
//     Icon: CalendarIcon,
//   },
//   {
//     title: 'Grupper',
//     path: '/',
//     Icon: UserGroupIcon,
//   },
//   {
//     title: 'Profil',
//     path: '/',
//     Icon: UserIcon,
//   },
// ];
