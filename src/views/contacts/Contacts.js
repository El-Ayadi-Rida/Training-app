import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { createContact, deleteContact, deleteContacts, getContacts, updateContact } from './contactsSlice';
import ItemList from './components/ItemList';
import ItemListPagination from './components/ItemListPagination';
import AddEditModal from './components/AddEditModal';
import ItemListHeader from './components/ItemListHeader';
import CheckAll from './components/CheckAll';
import SearchInput from './components/SearchInput';
import AddNewButton from './components/AddNewButton';
import MobileSortDropdown from './components/MobileSortDropdown';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const ContactsApp = () => {
  const title = 'Contacts';
  const description = 'User directory application that built with the help of List.js. Can be searched, paged and sorted.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'apps', title: 'Apps' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Title',
        accessor: 'title',
        sortable: true,
        headerClassName: 'col-3 col-lg-3 d-flex flex-column pe-1 justify-content-center',
      },
      {
        Header: 'Fees',
        accessor: 'fees',
        sortable: true,
        headerClassName: 'col-3 col-lg-3 d-flex flex-column pe-1 justify-content-center',
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        sortable: true,
        headerClassName: 'col-3 col-lg-1 d-flex flex-column pe-1 justify-content-center',
      },
      {
        Header: '',
        id: 'action',
        headerClassName: '',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
      },
    ];
  }, []);

  const dispatch = useDispatch();
  const { contacts: data, pageCount, loading } = useSelector((state) => state.contacts);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState(false);
  const [term, setTerm] = useState('');

  const tableInstance = useTable(
    {
      columns,
      data,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      isOpenDeleteConfirmModal,
      setIsOpenDeleteConfirmModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
      initialState: { pageSize: 7, pageIndex: 0, sortBy: [{ id: 'id', desc: false }], hiddenColumns: ['id'] },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );
  const {
    state: { pageIndex, pageSize, sortBy },
  } = tableInstance;

  const addItem = ({ item }) => {
    dispatch(createContact({ sortBy, pageSize, pageIndex, item }));
  };

  const editItem = ({ item }) => {
    dispatch(updateContact({ sortBy, pageSize, pageIndex, item }));
  };

  const deleteItem = (items) => {
    if (items.length === 1) {
      const itemId = items[0].id;
      console.log(itemId);
      // dispatch(deleteContact(itemId));
    } else {
      const itemIds = items.map((item) => item.id);
      console.log(itemIds);
      // dispatch(deleteContacts({itemIds}));
    }
  };

  const searchItem = useAsyncDebounce((val) => {
    
    setTerm(val || undefined);
  }, 200);

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
      dispatch(getContacts({ term, sortBy:sortBy[0].id, pageSize, pageIndex }));
      console.log(pageIndex);
    } catch (e) {
      // console.log('...error : ', e);
    }
  }, [sortBy, dispatch, pageIndex, pageSize, term ]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="container" id="contacts">
        {/* Title and Top Buttons Start */}
        <div className="page-title-container">
          <Row className="g-0">
            <Col xs="auto" className="mb-2 mb-md-0 me-auto">
              <div className="w-auto sw-md-30">
                <h1 className="mb-0 pb-0 display-4">{title} </h1>
                <BreadcrumbList items={breadcrumbs} />
              </div>
            </Col>
            <div className="w-100 d-md-none" />
            <Col xs="12" sm="6" md="auto" className="d-flex align-items-start justify-content-end order-3 order-sm-2">
              <div className="w-100 w-lg-auto search-input-container border border-separator">
                <SearchInput tableInstance={tableInstance} onChange={searchItem} />
              </div>
            </Col>
            <Col xs="12" sm="6" md="auto" className="d-flex align-items-start justify-content-end mb-2 mb-sm-0 order-sm-3">
              <AddNewButton tableInstance={tableInstance} />
              <MobileSortDropdown tableInstance={tableInstance} />
              <CheckAll tableInstance={tableInstance} />
            </Col>
          </Row>
        </div>
        {/* Title and Top Buttons End */}

        <Row className="g-0">
          <Col>
            {/* List Items Start */}
            <div id="checkboxTable">
              <ItemListHeader tableInstance={tableInstance} />
              <ItemList tableInstance={tableInstance} />
              <ItemListPagination tableInstance={tableInstance} />
            </div>
          </Col>

          {isOpenAddEditModal && <AddEditModal tableInstance={tableInstance} addItem={addItem} editItem={editItem} />}
          {isOpenDeleteConfirmModal && <DeleteConfirmModal tableInstance={tableInstance} deleteItem={deleteItem} />}
        </Row>
      </div>
    </>
  );
};

export default ContactsApp;
