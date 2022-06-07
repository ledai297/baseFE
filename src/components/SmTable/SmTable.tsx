import React from 'react';
import { SmTableColumn } from './types';
import "./SmTable.styles.scss";
import styled from 'styled-components';

interface IProps {
    columns: Array<SmTableColumn>,
    data: Array<any>,
    maxBodyHeight?: string
}

const SmTableHeaderCell = styled.div<{ width: string }>`
    width: ${props => props.width};
    background-color: rgb(231, 233, 235);
    font-size: 13px;
    text-align: center;
    box-sizing: border-box;
    padding: 8px;
    text-align: left;
    color: #263238;
    font-weight: 700;
    line-height: 1.5rem;
`;

const SmTableBodyCell = styled.div<{ width: string }>`
    width: ${props => props.width};
    padding: 8px;
    color: inherit;
    box-sizing: border-box;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    border-bottom: 1px solid #eeeeee;
`;

const SmTableBody = styled.div<{ maxHeight: string }>`
    max-height: ${props => props.maxHeight || '100%' };
    overflow: auto;
`;

const SmTable: React.FC<any> = (props: IProps) => {
    const defaultWidth = `${100 / props.columns.length}%`;

    const SmTableCell = (rowData: any, col: SmTableColumn) => {
        if (col.render) {
            return (
                <SmTableBodyCell width={defaultWidth} style={col.cellStyle}>
                    {col.render(rowData)}
                </SmTableBodyCell>
            )
        }

        const cellData = rowData[col.field];
        return (
            <SmTableBodyCell width={defaultWidth} style={col.cellStyle}>
                {cellData || ""}
            </SmTableBodyCell>
        )
    }

    const SmTableRow = (rowData: any) => {
        return (
            <div className='sm-table__row'>
                {
                    props.columns?.map((col: SmTableColumn) => (
                        <>
                            {SmTableCell(rowData, col)}
                        </>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='sm-table'>
            <div className="sm-table__thead">
                <div className="sm-table__row">
                    {
                        props.columns.map((col: SmTableColumn) => (
                            <SmTableHeaderCell width={defaultWidth} style={col.headerStyle}>
                                {col.title}
                            </SmTableHeaderCell>
                        ))
                    }
                </div>
            </div>

            <SmTableBody maxHeight={props?.maxBodyHeight || '100%'}>
                {
                    props.data?.length ? (
                        props.data.map((rowData: any) => (
                            <>{SmTableRow(rowData)}</>
                        ))
                    ) : (
                        <div className='empty-body'>No discords to display</div>
                    )
                }
            </SmTableBody>
        </div>
    )
}

export default SmTable;