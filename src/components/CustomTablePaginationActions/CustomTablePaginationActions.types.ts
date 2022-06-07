import React from "react";
import {WithStyles} from "@material-ui/core";
import styles from "./CustomTablePaginationActions.styles";

export interface CustomTablePaginationActionsProps extends WithStyles<typeof styles>{
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}
