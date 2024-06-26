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

const adminRoutes = [
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
    ],
    roles: [USER_ROLE.Admin]
  }
];


const trainerRoutes = [
  {
    path: `${appRoot}/paths`,
    label: 'menu.paths',
    icon: 'destination',
    exact: true,
    redirect: true,
    to: `${appRoot}/paths/list`,
    subs: [
      { path: '/list', label: 'menu.list', component: paths.list },
      { path: '/detail', label: 'menu.detail', component: paths.detail },
    ],
    roles: [USER_ROLE.Trainer]
  }
];

const learnerRoutes = [
  {
    path: `${appRoot}/misc`,
    label: 'menu.misc',
    icon: 'layout-5',
    exact: true,
    redirect: true,
    to: `${appRoot}/misc/player`,
    subs: [
      { path: '/player', label: 'menu.player', component: misc.player },
      { path: '/material', label: 'menu.material', component: misc.material },
      { path: '/syllabus', label: 'menu.syllabus', component: misc.syllabus },
    ],
    roles: [USER_ROLE.Learner]
  }
];

const sharedRoutes = [
  {
    path: DEFAULT_PATHS.APP,
    exact: true,
    redirect: true,
    to: `${appRoot}/dashboards/elearning`,
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
    roles: [USER_ROLE.Admin , USER_ROLE.Learner , USER_ROLE.Trainer]
  }
];

const routesAndMenuItems = {
  mainMenuItems: [
    ...sharedRoutes,
    ...adminRoutes,
    ...trainerRoutes,
    ...learnerRoutes,
  ],
  sidebarItems: [],
};


export default routesAndMenuItems;
