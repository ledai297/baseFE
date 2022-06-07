export interface SmTableProps<RowData extends object> {
    columns: Array<RowData>,
    data: RowData
}

export interface SmTableColumn {
    title: string
    field: string
    render: (data: any) => any
    headerStyle?: React.CSSProperties
    cellStyle?: React.CSSProperties
}