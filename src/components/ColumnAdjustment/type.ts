export type ColumnSettings = {
    type: string,
    columns : Array<Column>
}
export type Column = {
    title: string,
    field?: string,
    visible: boolean,
    render?:(data: any) => any,
    cellStyle?: React.CSSProperties,
    headerStyle?: React.CSSProperties,
    renderToString?: string
}
export function setRenderToString(column: Column){
    column.renderToString = column.render !== undefined ? column.render.toString() : undefined;
    return column;
}