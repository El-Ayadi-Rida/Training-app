import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import MenuModal from './components/MenuModal';
import TaskListItem from './components/TaskListItem';
import MenuContent from './components/MenuContent';
import SearchInput from './components/SearchInput';
import { getTasks, setSelectedTask, setShowSettings } from './tasksSlice';


const TasksApp = () => {
  const { tasks, showSettings, loading } = useSelector((state) => state.tasks);
  const {pageIndex,pageSize,sortBy,sortDir,term,programType} = showSettings;

  const title = programType || 'PROGRAMS';
  const description = 'Implementation for a basic events and schedule application that built on top of Full Calendar plugin.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'apps', title: 'Apps' },
  ];

  const dispatch = useDispatch();
  

  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);

  const { width } = useWindowSize();
  const [listingItems, setListingItems] = useState(tasks);
  const [filteredMailbox, setFilteredMailbox] = useState([]);
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [isOpenNewTask, setIsOpenNewTask] = useState(false);


  useEffect(() => {
    if (width) {
      if (width >= lgBreakpoint) {
        if (!isLgScreen) setIsLgScreen(true);
        if (isOpenMenuModal) setIsOpenMenuModal(false);
      } else if (isLgScreen) setIsLgScreen(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    if (loading) {
      document.body.classList.add('spinner');
    } else {
      document.body.classList.remove('spinner');
    }
    return () => {
      document.body.classList.remove('spinner');
    };
  }, [loading]);
  
  useEffect(() => {
    try {
      dispatch(getTasks({pageIndex,pageSize,sortBy,sortDir,term,programType}));
      console.log("SETTING CHANGED HERE");
      console.log(showSettings.term);
      console.log(term);
    } catch (e) {
      // console.log('...error : ', e);
    }
  }, [dispatch, showSettings ]);


  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const onChangeSearchTerm = (newSearchTerm) => {
    dispatch(setShowSettings({ sortBy: 'id', pageSize:20, pageIndex:0 ,term: newSearchTerm ,programType:''}))
    console.log(`Search Term Updated: ${newSearchTerm}`);
    console.log(tasks);
  };


  const onClickNewTask = () => {
    // setIsOpenNewTask(true);
    // dispatch(setSelectedTask(null));
    // setSearchTerm('react');
  };
  const onEditClick = (task) => {
    setIsOpenNewTask(true);
    dispatch(setSelectedTask(task));
  };

  return (
    <>
      <HtmlHead title={title} description={description} />
        <>
          <div className="page-title-container">
            <Row className="g-0">
              <Col xs="auto" className="mb-2 mb-md-0 me-auto">
                <div className="w-auto sw-md-25">
                  <h1 className="mb-0 pb-0 display-4">{title}</h1>
                  <BreadcrumbList items={breadcrumbs} />
                </div>
              </Col>
              <Col xs="auto" className="d-flex d-lg-none align-items-start mb-2 mb-md-0 order-md-1">
                <Button variant="primary" className="btn-icon btn-icon-only ms-1" onClick={() => setIsOpenMenuModal(true)}>
                  <CsLineIcons icon="menu-left" />
                </Button>
              </Col>
              <Col xs="12" md className="d-flex align-items-start justify-content-end justify-content-lg-start">
                <div className="me-lg-auto w-100 w-md-auto search-input-container border border-separator">
                  <SearchInput onChange={onChangeSearchTerm} />
                </div>
              </Col>
            </Row>
          </div>
          <Row className="row g-0">
            {isLgScreen && (
              <Col xs="auto" className="d-lg-flex">
                <div className="nav flex-column sw-25 mt-n2">
                  <MenuContent />
                </div>
              </Col>
            )}
            <Col>
              {/* List Items Start */}
              <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 mb-5" id="tasksContainer">
                {tasks &&
                  tasks.map((task, tIndex) => {
                    return <TaskListItem key={`task.${tIndex}`} task={task} onEditClick={onEditClick} />;
                  })}
                {/* Tag Item Template Start */}
                <template id="taskTagTemplate">
                  <span className="badge opacity-75 text-decoration-none me-1" />
                </template>
                {/* Tag Item Template End */}
                {/* No Task Template Start */}
                <template id="noTasksFound">
                  <Col xs="12" className="small-gutter-col mb-2 flex-grow-1 mw-100">
                    <div className="h-100">
                      <div className="text-center">
                        <i className="cs-warning-hexagon text-primary" />
                        <p className="mb-0">No tasks found!</p>
                      </div>
                    </div>
                  </Col>
                </template>
                {/* No Task Template End */}
              </Row>
              {/* List Items End */}
            </Col>
          </Row>
          {isLgScreen === false && <MenuModal show={isOpenMenuModal} onHide={() => setIsOpenMenuModal(false)} />}
        </>
    </>
  );
};

export default TasksApp;
