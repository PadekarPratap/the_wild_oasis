const Table = ({ children }) => {
  return <table className="w-full">{children}</table>;
};

const TableHead = ({ children }) => {
  return (
    <thead className="bg-white border-b border-gray-300 table-head">
      {children}
    </thead>
  );
};

const TableBody = ({ children }) => {
  return <tbody className="divide-y divide-gray-300">{children}</tbody>;
};

const TableRow = ({ children }) => {
  return <tr className="odd:bg-gray-50 even:bg-white">{children}</tr>;
};

// no styles for table header row
const TableHeaderRow = ({ children }) => {
  return <tr>{children}</tr>;
};

const TableDataCell = ({ children, color, data }) => {
  return (
    <td
      data-cell={data}
      className={`p-3 font-medium text-gray-700 ${color} data-cell`}
    >
      {children}
    </td>
  );
};

const TableHeaderCell = ({ children, width }) => {
  return (
    <th
      className={`${width} p-3 text-lg font-semibold text-left tracking-wide`}
    >
      {children}
    </th>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderRow = TableHeaderRow;
Table.DataCell = TableDataCell;
Table.HeaderCell = TableHeaderCell;

export default Table;
