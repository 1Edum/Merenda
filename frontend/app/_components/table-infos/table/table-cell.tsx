interface TableCellProps {
  textcell: string
}

function TableCell({ textcell}: TableCellProps) {
  return <div>{textcell}</div>;
}

export default TableCell;