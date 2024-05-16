/* eslint-disable */
import { lazy } from 'react';
// import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';
import { USER_ROLE } from 'constants.js';

const dashboards = {
  elearning: lazy(() => import('views/dashboards/ElearningDashboard')),
  school: lazy(() => import('views/dashboards/SchoolDashboard')),
};
const courses = {
  explore: lazy(() => import('views/courses/CoursesExplore')),
  list: lazy(() => import('views/courses/CoursesList')),
  detail: lazy(() => import('views/courses/CoursesDetail')),
};
const quiz = {
  list: lazy(() => import('views/quiz/QuizList')),
  detail: lazy(() => import('views/quiz/QuizDetail')),
  result: lazy(() => import('views/quiz/QuizResult')),
};
const paths = {
  list: lazy(() => import('views/paths/PathsList')),
  detail: lazy(() => import('views/paths/PathsDetail')),
};

const instructor = {
  list: lazy(() => import('views/instructor/InstructorList')),
  detail: lazy(() => import('views/instructor/InstructorDetail')),
};
const misc = {
  player: lazy(() => import('views/misc/Player')),
  material: lazy(() => import('views/misc/Material')),
  syllabus: lazy(() => import('views/misc/Syllabus')),
};

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
// const appRoot = DEFAULT_PATHS.APP;
const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: '/app',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      roles: [USER_ROLE.Admin, USER_ROLE.Trainer ,USER_ROLE.Learner] 
    },
    {
      path: `${appRoot}/dashboards`,
      icon: 'home-garage',
      label: 'menu.dashboards',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      subs: [
        { path: '/elearning', label: 'menu.elearning', component: dashboards.elearning },
        { path: '/school', label: 'menu.school', component: dashboards.school },
      ],
      roles: [USER_ROLE.Admin, USER_ROLE.Trainer , USER_ROLE.Learner] 
    },
    {
    path: `${appRoot}/courses`,
    label: 'menu.courses',
    icon: 'online-class',
    exact: true,
    redirect: true,
    to: `${appRoot}/courses/explore`,
    subs: [
      { path: '/explore', label: 'menu.explore', component: courses.explore },
      { path: '/list', label: 'menu.list', component: courses.list },
      { path: '/detail', label: 'menu.detail', component: courses.detail },
      { path: '/create', label: 'menu.create', component: courses.explore },
      { path: '/edit', label: 'menu.edit', component: courses.explore },
    ],
    roles: [USER_ROLE.Admin]
  },
  {
    path: `${appRoot}/quiz`,
    label: 'menu.users',
    icon: 'user',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list  },
      { path: '/detail', label: 'menu.add', component: quiz.detail  },
      { path: '/detail', label: 'menu.edit', component: quiz.result  },
    ],
    roles: [USER_ROLE.Admin]
  },
  {
    path: `${appRoot}/quiz`,
    label: 'menu.logistics',
    icon: 'compass',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Admin]
  },
  {
    path: `${appRoot}/reports`,
    label: 'menu.reports',
    icon: 'chart-3',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Admin]
  },
  {
    path: `${appRoot}/invoices`,
    label: 'menu.invoices',
    icon: 'invoice',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Admin]
  },
  {
    path: `${appRoot}/social-media`,
    label: 'menu.socialMedia',
    icon: 'facebook',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Admin]
  },
{
    path: `${appRoot}/training-sessions`,
    label: 'menu.trainingSessions',
    icon: 'form',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Trainer]
  },
  {
    path: `${appRoot}/fees`,
    label: 'menu.fees',
    icon: 'fees',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Trainer]
  },
  {
    path: `${appRoot}/certificates`,
    label: 'menu.certificates',
    icon: 'graduation',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Trainer]
  },
{
    path: `${appRoot}/training-programs`,
    label: 'menu.trainingPrograms',
    icon: 'online-class',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Learner]
  },
  {
    path: `${appRoot}/certificates`,
    label: 'menu.certificates',
    icon: 'graduation',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Learner]
  },
  {
    path: `${appRoot}/invoices`,
    label: 'menu.invoices',
    icon: 'invoices',
    exact: true,
    redirect: true,
    to: `${appRoot}/quiz/list`,
    subs: [
      { path: '/list', label: 'menu.manage', component: quiz.list },
      { path: '/detail', label: 'menu.add', component: quiz.detail },
      { path: '/result', label: 'menu.edit', component: quiz.result },
    ],
    roles: [USER_ROLE.Learner]
  }
  ],
  sidebarItems: [],
};


const adminRoutes = [
  
];

const trainerRoutes = [
  
];

const learnerRoutes = [
  
];

export default routesAndMenuItems;
