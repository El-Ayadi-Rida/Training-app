import React from 'react';
import { useAccordionButton, Accordion } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSettings } from '../tasksSlice';

const MenuContent = () => {
  const dispatch = useDispatch();
  const { showSettings } = useSelector((state) => state.tasks);
  const { deleted, status, tags } = showSettings;
  const { term, sortBy, pageSize, pageIndex ,programType} = showSettings;

  const onMenuClicked = ({ event, settings }) => {
    event.preventDefault();
    dispatch(setShowSettings(settings));
  };
  return (
    <div className="menu-items">
      <a
        className={`nav-link px-0 task-menu-item${programType === ''}`}
        href="#/all"
        onClick={(event) =>
          onMenuClicked({
            event,
            settings: { sortBy: 'id', pageSize:20, pageIndex:0 ,term:'',programType:'' },
          })
        }
      >
        <CsLineIcons icon="inbox" size="17" className="me-2" /> <span className="d-inline-block mt-1 align-middle">All</span>
      </a>

      <a
        className={`nav-link px-0 task-menu-item${programType === 'COURSE'}`}
        href="#/active"
        onClick={(event) =>
          onMenuClicked({
            event,
            settings: { sortBy: 'id', pageSize:20, pageIndex:0 ,term:'' ,programType:'COURSE'},
          })
        }
      >
        <CsLineIcons icon="book-open" size="17" className="me-2 text-primary" /> <span className="d-inline-block mt-1 align-middle">Courses</span>
      </a>
      <a
        className={`nav-link px-0 task-menu-item${programType === 'TRAINING'}`}
        href="#/done"
        onClick={(event) =>
          onMenuClicked({
            event,
            settings: { sortBy: 'id', pageSize:20, pageIndex:0 ,term:'' ,programType:'TRAINING'},
          })
        }
      >
        <CsLineIcons icon="diploma" size="17" className="me-2 text-warning" /> <span className="d-inline-block mt-1 align-middle">Trainings</span>
      </a>
    </div>
  );
};

export default MenuContent;
