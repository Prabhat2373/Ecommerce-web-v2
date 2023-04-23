import React, { FC, MutableRefObject, useEffect, useMemo } from 'react';
import {
  useTable,
  Column,
  useSortBy,
  useRowSelect,
  usePagination,
} from 'react-table';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import Pagination from '../pagination/Pagination';

interface TableProps {
  columns: readonly Column<any>[];
  data: any[];
  hidePagination?: boolean;
  hasCheckBox?: boolean;
  hideActions?: boolean;
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>;
  onRowClick?: () => void;
}
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = defaultRef as MutableRefObject<any>;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        {
          <input
            type="checkbox"
            ref={resolvedRef}
            {...rest}
            onInput={() => console.log('LOGGG', resolvedRef)}
          />
        }
      </>
    );
  }
);

const Table: FC<TableProps> = ({
  columns,
  setSelectedRows,
  data,
  hidePagination,
  hasCheckBox,
  onRowClick,
}) => {
  const tableData = useMemo(() => data, [data]);
  const tableColumns = useMemo(() => columns, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
    page,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hasCheckBox &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    }
  );

  const selectedItems = selectedFlatRows?.map((elem) => elem?.original);

  useEffect(() => {
    setSelectedRows && setSelectedRows(selectedItems);
  }, [selectedRowIds]);
  return (
    <div className="overflow-x-scroll border-gray-200 sm:rounded-lg ">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider relative"
                >
                  {column.render('Header') === 'actions'
                    ? ''
                    : column?.render('Header')}
                  <span id="col-span" className="absolute bottom-2 top-3 ml-3">
                    {column?.isSorted ? (
                      column?.isSortedDesc ? (
                        <ArrowDownIcon width={'10px'} />
                      ) : (
                        <ArrowUpIcon width={'10px'} />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200 "
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="odd:bg-white even:bg-primary-bgPrimary"
                onClick={onRowClick}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-5 whitespace-nowrap text-base text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {!hidePagination && (
        <Pagination
          canPreviousPage={canNextPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          previousPage={previousPage}
          setPageSize={setPageSize}
        />
      )}
    </div>
  );
};

export default Table;
