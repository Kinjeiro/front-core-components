/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import memoize from 'lodash/memoize';
import {
  Table,
  Checkbox,
  Pagination,
  Button,
  Icon,
} from 'semantic-ui-react';

import {
  // objectValues,
  isEmpty,
  executeVariable,
} from '@reagentum/front-core/lib/common/utils/common';
import i18nAbsolute from '@reagentum/front-core/lib/common/utils/i18n-utils';
import {
  formatDate,
  formatDateTime,
} from '@reagentum/front-core/lib/common/utils/date-utils';
import Link from '@reagentum/front-core/lib/common/components/Link/Link';

import i18n from '../../utils/i18n';

import Loading from '../Loading/Loading';

import COLUMN_PROP_TYPE, { COLUMN_TYPES } from '../../models/model-column';

import './UniTable.scss';

// todo @ANKU @LOW - добавить дефолтные форматеры (дата, дататайм и т.д.)

/**
 * Пример c редуксом:
 import { getTableInfo } from '@reagentum/front-core/lib/common/app-redux/selectors';

 {
     records: [],
     meta: {
       search: null,
       startPage: 0,
       itemsPerPage: 10,
       sortBy: null,
       sortDesc: true,
       total: null,
     },
     filters: {
       // field: value
     },
     selected: [],
     isSelectedAll: false,

     actionLoadRecordsStatus: undefined,
     actionBulkChangeStatusStatus: undefined,
     actionEditRecordStatusMap: {}
 }

 <UniTable
   key={ valuationsType }
   cacheColumnsKey={ valuationsType }
   records={ records }
   columns={ columns }
   meta={ meta }
   i18nPrefix={ `${NAMESPACE}:pages.Valuations.table.columns` }

   selectable={ valuationsType === VALUATIONS_TYPES.NOT_SORTED }
   selected={ selected }
   isSelectedAll={ isSelectedAll }
   onSelect={ (recordId, selected, record) => this.props.actionChangeRecordsSelected(tableUuid, recordId, selected) }
   onSelectPage={ (selectedRecordIds, selected, selectedRecords) => this.props.actionChangeRecordsSelected(tableUuid, selectedRecordIds, selected) }
   onSelectAll={ (isSelectedAll) => this.props.actionChangeRecordsSelectedAll(tableUuid, isSelectedAll) }

   onPaginationChange={ (startPage, itemsPerPage) =>
            this.props.actionLoadRecords(tableUuid, { startPage, itemsPerPage }) }

   textNoData={ i18n('pages.Valuations.table.noData') }

   tableProps={{
      compact: true,
      celled: true,
    }}

   isExpandableRows={ true }
   expandableData={ loadPositionsTables }
   renderExpandableData={ this.renderPositionsTable }
   onRowExpand={ (record) => {
      const valuationId = record.id;
      this.setState({
        loadPositionsTables: {
          ...this.state.loadPositionsTables,
          [valuationId]: true,
        },
      });
    } }
 />
 */
export default class UniTable extends Component {
  static COLUMN_TYPES = COLUMN_TYPES;
  static COLUMN_PROP_TYPE = COLUMN_PROP_TYPE;
  static propTypes = {
    className: PropTypes.string,

    meta: PropTypes.shape({
      startPage: PropTypes.number,
      itemsPerPage: PropTypes.number,
      total: PropTypes.number,
      sortBy: PropTypes.string,
      sortDesc: PropTypes.bool,
    }),
    records: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(COLUMN_PROP_TYPE),
    columnId: PropTypes.string,
    i18nPrefix: PropTypes.string,
    loadingData: PropTypes.bool,
    // cacheColumnsKey: PropTypes.oneOfType([
    //   PropTypes.string,
    //   PropTypes.number,
    //   /* (props, state) => {} */
    //   PropTypes.func,
    // ]),
    cacheColumnsKey: PropTypes.any,

    tableProps: PropTypes.shape(Table.propTypes),

    textNoData: PropTypes.node,
    // ======================================================
    // SELECTION
    // ======================================================
    selectable: PropTypes.bool,
    selectableAll: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    isSelectedAll: PropTypes.bool,
    /**
     * (recordId, selected, record) => {}
     */
    onSelect: PropTypes.func,
    /**
     * (selectedRecordIds, selected, selectedRecords) => {}
     */
    onSelectPage: PropTypes.func,
    /**
     * (isSelectedAll) => {}
     */
    onSelectAll: PropTypes.func,

    textYouSelectedPage: PropTypes.node,
    textYouSelectedAll: PropTypes.node,
    textActionSelectAll: PropTypes.node,

    // ======================================================
    // PAGINATION
    // ======================================================
    pagination: PropTypes.bool,
    onPaginationChange: PropTypes.func,

    // ======================================================
    // SCROLLABLE
    // ======================================================
    scrollable: PropTypes.bool,

    // ======================================================
    // EXPANDABLE
    // ======================================================
    isExpandableRows: PropTypes.bool,
    expandableData: PropTypes.object,
    renderExpandableData: PropTypes.func,
    onRowExpand: PropTypes.func,
    onRowCollapse: PropTypes.func,
  };

  static defaultProps = {
    meta: {
      startPage: 0,
      itemsPerPage: 10,
      // total: PropTypes.number,
      // sortBy: PropTypes.string,
      // sortDesc: PropTypes.bool,
    },
    columns: [],
    columnId: 'id',
    i18nPrefix: 'project:components.UniTable.columns',
    selectable: false,
    selectableAll: true,
    textNoData: i18n('components.UniTable.textNoData'),
    textYouSelectedPage: i18n('components.UniTable.textYouSelectedPage'),
    textYouSelectedAll: i18n('components.UniTable.textYouSelectedAll'),
    textActionSelectAll: i18n('components.UniTable.textActionSelectAll'),
    pagination: true,
    scrollable: true,
  };

  state = {
    isSelectedPage: false,
    isSelectedAll: false,
    isRowExpandableMap: {},
  };

  // ======================================================
  // LIFECYCLE
  // ======================================================
  constructor(props) {
    super(props);

    const {
      cacheColumnsKey,
    } = props;

    if (cacheColumnsKey) {
      this.getColumnsMem = memoize(
        this.getColumnsMem.bind(this),
        () => executeVariable(this.props.cacheColumnsKey, null, this.props, this.state),
      );
    }
  }
  // componentDidMount() {
  // }
  // componentWillReceiveProps(newProps) {
  // }

  // ======================================================
  // UTILS
  // ======================================================
  hasData() {
    const {
      records,
    } = this.props;

    return records && records.length > 0;
  }

  isSelected(recordId) {
    const {
      selected,
    } = this.props;
    return selected && selected.includes(recordId);
  }

  isSelectedPage() {
    const {
      selected,
      records,
    } = this.props;
    const {
      isSelectedPage: isSelectedPageState,
    } = this.state;

    return this.isSelectedAll()
      || (typeof selected !== 'undefined'
        ? records && records.length > 0 && selected.length === records.length
        : isSelectedPageState
      );
  }

  isSelectedAll() {
    const {
      isSelectedAll,
    } = this.props;

    const {
      isSelectedAll: isSelectedAllState,
    } = this.state;

    return typeof isSelectedAll !== 'undefined'
      ? isSelectedAll
      : isSelectedAllState;
  }


  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleSelect(event, { checked }, record, rowIndex) {
    const {
      columnId,
      onSelect,
    } = this.props;

    return onSelect(record[columnId], checked, rowIndex, record);
  }
  @bind()
  handleSelectPage(event, { checked }) {
    const {
      records,
      meta: {
        total,
      },
      columnId,
      onSelectPage,
    } = this.props;
    const isSelectedAll = this.isSelectedAll();

    const isAll = !total || records.length === total;

    if (isAll || isSelectedAll) {
      return this.handleSelectAll(checked);
    }

    this.setState({
      isSelectedPage: checked,
    });
    const ids = records.map((record) => record[columnId]);
    return onSelectPage(ids, checked, records);
  }
  @bind()
  handleSelectAll(checked = true) {
    const {
      records,
      columnId,
      onSelectPage,
      onSelectAll,
    } = this.props;

    const isSelectedPage = this.isSelectedPage();

    if (isSelectedPage) {
      // обнуляем прошлые результаты
      const ids = records.map((record) => record[columnId]);
      onSelectPage(records, false, ids);
    }

    this.setState({
      isSelectedPage: false,
      isSelectedAll: checked,
    });

    return onSelectAll(checked);
  }

  @bind()
  handlePaginationChange(event, { activePage }) {
    const {
      meta: {
        itemsPerPage,
      },
      onSelectAll,
      onPaginationChange,
    } = this.props;

    onPaginationChange(activePage - 1, itemsPerPage);

    if (onSelectAll) {
      onSelectAll(false);
    }
  }

  // ======================================================
  // RENDERS
  // ======================================================
  @bind()
  parseColumn(columnInfo) {
    const { i18nPrefix } = this.props;

    if (typeof columnInfo !== 'object') {
      // eslint-disable-next-line no-param-reassign
      columnInfo = {
        dataIndex: columnInfo,
        key: columnInfo,
      };
    }

    const {
      type,
      dataIndex,
      key,
      title,
      ...options
    } = columnInfo;

    return {
      type: type || COLUMN_TYPES.TEXT,
      dataIndex: dataIndex || key,
      title: title !== null && typeof title !== 'undefined'
        ? title
        : i18nAbsolute(`${i18nPrefix}.${key || dataIndex}`),
      key: key || dataIndex,
      // onFilter: (value, record) => record.indexOf(value) === 0,
      // sorter: (a, b) => a.length - b.length,
      ...options,
    };
  }

  getSelectableColumnInfo() {
    const {
      selectableAll,
      onSelect,
      onSelectPage,
      onSelectAll,
      columnId,
    } = this.props;

    return {
      key: 'checkbox',
      type: COLUMN_TYPES.CHECKBOX,
      title: () => ((onSelectPage || (selectableAll && onSelectAll)) && this.hasData() && (
        <Checkbox
          onChange={ this.handleSelectPage }
          checked={ this.isSelectedPage() || this.isSelectedAll() }
        />
      )) || null,
      render: (value, column, record, rowIndex) => (onSelect
        ? (
          <Checkbox
            checked={ (this.isSelectedPage() || this.isSelectedAll() || this.isSelected(record[columnId])) ? true : undefined }
            onChange={ (event, args) => this.handleSelect(event, args, record, rowIndex) }
          />
        )
        : null
      ),
      cellProps: {
        collapsing: true,
      },
      headerCellProps: {
        positive: true,
        selectable: true,
        textAlign: 'right',
      },
    };
  }


  @bind()
  renderExpandableCell(value, column, record, rowIndex) {
    const {
      columnId,
      onRowCollapse,
      onRowExpand,
    } = this.props;

    const id = record[columnId];
    const isExpand = this.state.isRowExpandableMap[id];

    return (typeof isExpand !== 'undefined' && isExpand)
      ? (
        <div
          className="expandable expandable--minus"
          onClick={ () => {
            const { isRowExpandableMap } = this.state;
            isRowExpandableMap[id] = false;
            this.setState({
              isRowExpandableMap,
            });
            if (onRowCollapse) {
              onRowCollapse(record, rowIndex);
            }
          } }
        >
          <Icon name="minus" />
        </div>
      )
      : (
        <div
          className="expandable expandable--plus"
          onClick={ () => {
            const { isRowExpandableMap } = this.state;
            isRowExpandableMap[id] = true;
            this.setState({
              isRowExpandableMap,
            });
            if (onRowExpand) {
              onRowExpand(record, rowIndex);
            }
          } }
        >
          <Icon name="plus" />
        </div>
      );
  }

  getExpandableColumnInfo() {
    return {
      key: 'expandable',
      type: COLUMN_TYPES.EXPAND,
      title: '',
      render: this.renderExpandableCell,
      // cellProps: {},
      // headerCellProps: {},
    };
  }

  getColumnsMem() {
    const {
      records,
      columns,
      selectable,
      isExpandableRows,
    } = this.props;

    const columnsMeta = [];

    if (selectable) {
      columnsMeta.push(this.getSelectableColumnInfo());
    }
    if (isExpandableRows) {
      columnsMeta.push(this.getExpandableColumnInfo());
    }

    // если нет колонок, то они берутся из название полей данных
    if ((!columns || columns.length === 0) && records.length > 0) {
      columnsMeta.push(...Object.keys(records[0]));
    } else {
      columnsMeta.push(...columns);
    }

    return columnsMeta.map(this.parseColumn);
  }

  getColumns() {
    return this.getColumnsMem();
  }

  renderColumn(column) {
    const {
      title,
      className,
      dataIndex,
      headerCellProps,
    } = column;

    return (
      <Table.HeaderCell
        key={ dataIndex }
        className={ `UniTable__column ${className || ''}` }
        { ...headerCellProps }
      >
        { executeVariable(title) }
      </Table.HeaderCell>
    );
  }


  renderColumns() {
    const columns = this.getColumns();

    return (
      <Table.Row>
        {
          columns.map((column) => this.renderColumn(column))
        }
      </Table.Row>
    );
  }


  renderCell(record, column, rowIndex) {
    const {
      type,
      dataIndex,
      defaultValue,
      render,
      className,
      cellProps,
      linkTo,
    } = column;

    const cellValue = record[dataIndex];

    let cellComponent;

    if (render) {
      cellComponent = render(cellValue, column, record, rowIndex);
    } else {
      const value = isEmpty(cellValue) ? defaultValue : cellValue;

      switch (type) {
        case COLUMN_TYPES.DATE:
          cellComponent = formatDate(value);
          break;
        case COLUMN_TYPES.DATETIME:
          cellComponent = formatDateTime(value);
          break;
        default:
          cellComponent = value;
      }
    }

    const linkToFinal = executeVariable(linkTo, null, record, column, rowIndex);
    if (linkToFinal) {
      cellComponent = (
        <Link
          className="UniTable__link"
          to={ linkToFinal }
        >
          { cellComponent }
        </Link>
      );
    }

    return (
      <Table.Cell
        key={ dataIndex }
        className={ `UniTable__cell ${className || ''}` }
        { ...cellProps }
      >
        { cellComponent }
      </Table.Cell>
    );
  }

  @bind()
  renderRecord(record, rowIndex) {
    const {
      columnId,
      isExpandableRows,
      expandableData,
      renderExpandableData,
    } = this.props;

    const {
      isRowExpandableMap,
    } = this.state;

    const columns = this.getColumns();
    const id = record[columnId];
    const key = id || rowIndex;

    const rows = [(
      <Table.Row key={ key }>
        {
          columns.map((column) => this.renderCell(record, column, rowIndex))
        }
      </Table.Row>
    )];

    if (isExpandableRows && isRowExpandableMap[id] && expandableData[id]) {
      rows.push(
        this.renderFullWidthRow(
          renderExpandableData(expandableData[id], record, rowIndex),
          undefined,
          {
            key: `${key}__expandable`,
          },
        ),
      );
    }

    return rows;
  }

  renderNoData() {
    const {
      textNoData,
    } = this.props;
    return textNoData;
  }

  renderYouSelectedAll() {
    const {
      records,
      meta: {
        total,
      },
      selectableAll,
      textYouSelectedPage,
      textYouSelectedAll,
      textActionSelectAll,
    } = this.props;

    const dataLength = records.length;

    return this.isSelectedAll()
      ? (
        <div>
          { textYouSelectedAll }
          <span className="UniTable__selectedTextAmount">
            ({ total || dataLength })
          </span>
        </div>
        )
      : this.isSelectedPage()
        ? (
          <div>
            { textYouSelectedPage }
            <span className="UniTable__selectedTextAmount">
            ({ dataLength })
            </span>
            {
              (selectableAll && total && total > dataLength && (
                <Button
                  className="Button--plain"
                  onClick={ () => this.handleSelectAll(true) }
                >
                  { textActionSelectAll }
                  <span className="UniTable__selectedTextAmount">
                    ({ total })
                  </span>
                </Button>
              )) || null
            }
          </div>
        )
        : null;
  }

  // todo @ANKU @LOW - объединить с нижней
  renderFullWidthHeaderRow(content, colSpan = this.getColumns().length, rowProps = {}) {
    return (
      <Table.Row { ...rowProps }>
        <Table.HeaderCell colSpan={ colSpan }>
          { content }
        </Table.HeaderCell>
      </Table.Row>
    );
  }
  renderFullWidthRow(content, colSpan = this.getColumns().length, rowProps = {}) {
    return (
      <Table.Row { ...rowProps }>
        <Table.Cell colSpan={ colSpan }>
          { content }
        </Table.Cell>
      </Table.Row>
    );
  }

  renderPagination() {
    const {
      meta: {
        startPage = 0,
        itemsPerPage = 10,
        total,
      },
    } = this.props;
    return (
      <Pagination
        className="UniTable__pagination"
        activePage={ startPage + 1 }
        totalPages={ Math.ceil(total / itemsPerPage) }

        onPageChange={ this.handlePaginationChange }

        size="mini"
        boundaryRange={ 2 }
        siblingRange={ 2 }
        // ellipsisItem={ true }
        // firstItem={ true }
        // lastItem={ true }
        // prevItem={ true }
        // nextItem={ true }
      />
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      records,
      meta: {
        total,
      },
      className,
      selectable,

      tableProps = {},
      loadingData,
      pagination,
      scrollable,
    } = this.props;

    const definition = selectable && this.hasData();

    const hasPagination = pagination && total && records && total > records.length;

    // todo @ANKU @LOW @BUG_OUT @semantic_ui - если элемент динамический, то после оборачивания через definition в Cell он теряет клики
    return (
      <div className={ `UniTable ${scrollable ? 'UniTable--scrollable' : ''}` }>
        <div className="UniTable__tableWrapper">
          <Table
            definition={ false }
            { ...tableProps }
            className={
              `UniTable__table ${className || ''} ${tableProps.className || ''} ${definition ? 'UniTable--definition' : ''}`
            }
          >
            <Table.Header fullWidth={ true }>
              { this.renderColumns() }
              {
                selectable
                && (this.isSelectedPage() || this.isSelectedAll())
                && this.renderFullWidthHeaderRow(this.renderYouSelectedAll())
              }
            </Table.Header>
            <Table.Body>
              {
                loadingData
                  ? this.renderFullWidthRow(<Loading />)
                  : records.reduce((result, record, index) => {
                    result.push(...this.renderRecord(record, index));
                    return result;
                  }, [])
              }
            </Table.Body>
          </Table>
        </div>
        <div className="UniTable__footer">
          {
            !this.hasData()
              ? this.renderNoData()
              : hasPagination
                ? this.renderPagination()
                : null
          }
        </div>
      </div>
    );
  }
}
