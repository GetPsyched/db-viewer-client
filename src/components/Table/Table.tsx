import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

interface TableProps {
  data: Array<any>;
  columns: Array<string>;
}

const Table = ({ data, columns }: TableProps) => {
  return (
    <table>
      <TableHeader columns={columns} />
      <TableRows data={data} />
    </table>
  );
}

export default Table;
