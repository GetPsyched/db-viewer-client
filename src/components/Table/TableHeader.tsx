interface TableHeaderProps {
  columns: Array<string>;
}

const TableHeader = ({ columns }: TableHeaderProps): JSX.Element => {
  const headers = columns.map((column: string, index) => {
    return <th key={`th-${index}`}>{column}</th>;
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};

export default TableHeader;
