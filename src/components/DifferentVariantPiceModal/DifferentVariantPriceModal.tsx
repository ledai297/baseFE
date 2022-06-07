import React, { Fragment } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import styled from "styled-components";
import { Variant } from '../../services/product';
import { Province } from '../../services/province';
import { RegionalVariant } from '../../services/variant';

interface IProps {
    open: boolean,
    onClose: () => void,
    handleCancel: () => void,
    handleConfirm: () => void,
    currentVariants: Array<Variant>,
    regionalVariants: Array<RegionalVariant>,
    currentRegion: Province | null,
    newRegion: Province | null
}

const DialogStyled = styled(Dialog)`
    .MuiDialog-paper {
        max-width: 700px;
    }
`;

const DialogContentStyled = styled(DialogContent)`
    max-height: 350px;
`;

export const DifferentVariantPriceModal = (props: IProps) => {
    const ModalBody = () => {
        return (
            <div className="regional-variants-diff">
                <div className="description">
                    Địa chỉ giao hàng bạn chọn khác với khu vực của giỏ hàng hiện tại. Giá sản phẩm sẽ được tự động cập nhật theo khu vực vừa được chọn.
                </div>
                <Table className="mt-15">
                    <TableHead>
                        <TableRow>
                            <TableCell className="w-50">Sản phẩm</TableCell>
                            <TableCell>
                                <span>{props?.currentRegion?.name || ""}</span>
                                <i> (Giá hiện tại)</i>
                            </TableCell>
                            <TableCell>
                                <span>{props?.newRegion?.name || ""}</span>
                                <i> (Giá mới)</i>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            props?.currentVariants.map((variant: Variant) => {
                                const regionalVariant = props?.regionalVariants?.find((rv: RegionalVariant) => rv.variantId === variant.id);
                                if (!regionalVariant || regionalVariant?.price !== variant?.price || !regionalVariant.sellable) {
                                    return (
                                        <TableRow>
                                            <TableCell>{variant?.name || ""}</TableCell>
                                            <TableCell align="right">
                                                <span>{variant?.price !== null ? `${variant?.price?.toLocaleString("ja")}đ` : "Không bán"}</span>
                                            </TableCell>
                                            <TableCell align="right">
                                                <span>
                                                    {
                                                        regionalVariant?.sellable
                                                            ? `${regionalVariant?.price?.toLocaleString("ja")}đ`
                                                            : 'Không bán'
                                                    }
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
    return (
        <Fragment>
            <DialogStyled
                open={props.open}
                // onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">Sản phẩm thay đổi giá</DialogTitle>
                <DialogContentStyled id="alert-dialog-content">
                    {ModalBody()}
                </DialogContentStyled>
                <DialogActions>
                {
                    props.handleCancel && (
                        <button onClick={props.handleCancel} className="btn">
                            Hủy bỏ
                        </button>
                    )
                }
                <button onClick={props.handleConfirm} className="btn sapo-btn-default" autoFocus>
                    OK
                </button>
                </DialogActions>
            </DialogStyled>
        </Fragment>
    )
}

export default DifferentVariantPriceModal;