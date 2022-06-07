import {withStyles} from "@material-ui/core";
import React from "react";
import {CustomTablePaginationActionsProps} from "./CustomTablePaginationActions.types";
import styles from "./CustomTablePaginationActions.styles";
import Pagination from '@material-ui/lab/Pagination';

const CustomTablePaginationActions = (props: CustomTablePaginationActionsProps) => {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        onChangePage(null, page -1);
    };
    return (
        <Pagination count={Math.ceil(count / rowsPerPage)} defaultPage={page + 1} variant="outlined"  color="primary" hideNextButton={true} hidePrevButton={true} onChange={handleChangePage} />
    );
};

export default withStyles(styles)(CustomTablePaginationActions);
