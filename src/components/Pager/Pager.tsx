import React, { Fragment, useState, useEffect } from 'react';
import { Paper, TablePagination, Table, TableBody } from '@material-ui/core';
import ListFilter from '../SaveSearch/ListFilter';
import { PageInfo } from './PageInfo';

const Pager = (props: PageInfo) => {
    const { type, totalCount, rowsPerPage, page, test } = props;
    return (
        <Fragment>
            <Paper>
                <ListFilter typeFilter={type} />
                <Table aria-label="collapsible table">
                    <TableBody>
                        
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[50]}
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={() => {}}
                    ActionsComponent={() => (
                        <div>{test}</div>
                    )}
                />
            </Paper>
        </Fragment>
    )
}

export default Pager;