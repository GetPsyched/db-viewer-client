interface TableRowProps {
  data: Array<any>;
}

const TableRows = ({ data }: TableRowProps) => {
  const rows = data.map((row: any, row_index) => {
    const entry: [string, string][] = Object.entries(row);
    return (
      <tr key={`row-${row_index}`}>
        {entry.map(([key, value], col_index) => {
          return <td key={`column-${col_index}`}>{value}</td>;
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableRows;
