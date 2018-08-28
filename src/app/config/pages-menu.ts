import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
/*  {
    title: 'Informes',
    icon: 'fa fa-bar-chart-o',
    children: [
      {
        title: 'Descarga de informe',
        link: '/pages/report/create',
      }
    ],
  },*/
  {
    title: 'Usuarios',
    icon: 'nb-person',
    children: [
      {
        title: 'Listado de usuarios',
        link: '/pages/user/list-users',
      },
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Logout',
        link: '/auth/logout',
      },
      {
        title: 'Recuperar contraseña',
        link: '/auth/request-password',
      },
    ],
  }
];
