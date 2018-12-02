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
  objectValues,
  isEmpty,
  executeVariable,
} from '@igs/front-core/lib/common/utils/common';
import i18nAbsolute from '@igs/front-core/lib/common/utils/i18n-utils';
import {
  formatDate,
  formatDateTime,
} from '@igs/front-core/lib/common/utils/date-utils';

import i18n from '../../utils/i18n';

import Loading from '../Loading/Loading';

import './UniTable.scss';

// todo @ANKU @LOW - добавить дефолтные форматеры (дата, дататайм и т.д.)
export const COLUMN_TYPES = {
  CHECKBOX: 'checkbox',
  EXPAND: 'expand',

  TEXT: 'text',
  DATE: 'date',
  DATETIME: 'datetime',
  NUMBER: 'number',
  DECIMAL: 'decimal',
  CODE: 'code',
};

export default class UniTable extends Component {
  static COLUMN_TYPES = COLUMN_TYPES;
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
    columns: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dataIndex: PropTypes.string,
        type: PropTypes.oneOf(objectValues(COLUMN_TYPES)),
        key: PropTypes.string,
        title: PropTypes.node,
        render: PropTypes.func,
        className: PropTypes.string,
        headerCellProps: PropTypes.object,
        cellProps: PropTypes.object,
      }),
    ])),
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
    onSelect: PropTypes.func,
    onSelectPage: PropTypes.func,
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
  componentDidMount() {

  }
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
      onSelect,
    } = this.props;

    return onSelect(record, checked, rowIndex);
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
    return onSelectPage(records, checked, ids);
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
