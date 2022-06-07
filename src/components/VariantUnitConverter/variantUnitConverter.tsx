import React, { FC, Fragment, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Table, TableHead, TableCell, TableRow, TableBody, TableFooter, DialogProps, Paper, TextField } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { Variant } from '../../services/product';
import './variant-unit-converter.scss';
import { VariantRequest, AttributeRequest } from '../../services/variant/type';
import { CONSTANT } from '../../statics/constant';
import { useSnackbar } from 'notistack';
import { optionSnackbarError } from '../../utilities/Option';
import { generateRandomId } from '../../utilities/Helpers';
import _ from 'lodash';
import { Autocomplete } from '@material-ui/lab';
import { Map360ProductUnitModel } from '../../services/map360ProductUnit/dto/Map360ProductUnitModel';

interface IProp {
    status: boolean,
    handleClose: () => void,
    currentVariant: Variant,
    onSubmit: (variants: Array<VariantRequest>) => void,
    map360ProductUnits?: Array<Map360ProductUnitModel>,
}

const VariantUnitConverter: FC<IProp> = (props: IProp) => {
    const { status, handleClose, currentVariant, onSubmit } = props;
    const initUnitConverter = new VariantRequest({
        name: currentVariant.name,
        price: null,
        attributes: currentVariant.attributes.map(attrs => {
            return new AttributeRequest({
                attribute_id: attrs.attributeId,
                value: attrs.value
            })
        }),
        base_unit_variant_id: currentVariant.id,
        retail_price: null,
        short_description: currentVariant.shortDescription,
        full_description: currentVariant.fullDescription,
        status: CONSTANT.VARIANT_STATUS.DEACTIVATED,
        weight: null,
        unit_multiplier: 2,
        vid: generateRandomId(10)
    });
    const [unitConverter, setUnitConverter] = useState<Array<VariantRequest>>([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (currentVariant.id > 0 && status === true) {
            let uc = unitConverter.filter(uc => uc.base_unit_variant_id === currentVariant.id);
            if (uc.length === 0)
                setUnitConverter([...unitConverter, initUnitConverter]);
        }
    }, [status])

    const addConverter = () => {
        setUnitConverter([...unitConverter, initUnitConverter]);
    }

    const removeItem = (variant: VariantRequest) => {
        let newUnitConverter = unitConverter.filter(uc => uc.vid !== variant.vid);
        setUnitConverter([...newUnitConverter]);
        console.log([...newUnitConverter])
    }

    const handleChangeUnit = (value: string, variant: VariantRequest) => {
        let filterResult = unitConverter.filter(uc => uc.vid === variant.vid);
        if (filterResult.length === 0)
            return;
        let newObject = _.cloneDeep(variant);
        newObject.unit = value;
        let newUnitConverter = unitConverter.map(uc => {
            return uc.vid === variant.vid ? newObject : uc;
        });
        setUnitConverter(newUnitConverter);
    }

    const handleChangeUnitMultiplier = (event: React.ChangeEvent<HTMLInputElement>, variant: VariantRequest) => {
        let filterResult = unitConverter.filter(uc => uc.vid === variant.vid);
        if (filterResult.length === 0)
            return;
        let newObject = _.cloneDeep(variant);
        newObject.unit_multiplier = parseInt(event.currentTarget.value);
        let newUnitConverter = unitConverter.map(uc => {
            return uc.vid === variant.vid ? newObject : uc;
        });
        setUnitConverter(newUnitConverter);
    }

    const handleChangeBarcode = (event: React.ChangeEvent<HTMLInputElement>, variant: VariantRequest) => {
        let filterResult = unitConverter.filter(uc => uc.vid === variant.vid);
        if (filterResult.length === 0)
            return;
        let newObject = _.cloneDeep(variant);
        newObject.barcode = event.currentTarget.value;
        let newUnitConverter = unitConverter.map(uc => {
            return uc.vid === variant.vid ? newObject : uc;
        });
        setUnitConverter(newUnitConverter);
    }

    const handleSubmit = () => {
        let objectRequestSend = unitConverter.filter(uc => uc.base_unit_variant_id === currentVariant.id);
        if (objectRequestSend.filter(uc => uc.unit_multiplier === null || uc.unit_multiplier <= 1).length > 0 ||
            objectRequestSend.filter(uc => uc.unit === null || uc.unit === '').length > 0) {
            enqueueSnackbar('Giá trị quy đổi không hợp lệ', optionSnackbarError);
            return;
        }
        let result = objectRequestSend.map(uc => {
            let prefix = `${uc.unit} ( ${uc.unit_multiplier} ${currentVariant.unit ? currentVariant.unit : 'đơn vị'} )`;
            uc.name = uc.name.endsWith(prefix) ? uc.name : `${uc.name} - ${prefix}`;
            return uc;
        })
        onSubmit(result);
        setUnitConverter(unitConverter.filter(uc => !objectRequestSend.includes(uc)));
    }

    return (
        <Fragment>
            <Dialog
                open={status}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">Danh sách phiên bản quy đổi</DialogTitle>
                <DialogContent className="dialog-content">
                    <Table className="variant-unit-converter">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên phiên bản</TableCell>
                                <TableCell width="200px">Đơn vị quy đổi</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Đơn vị gốc</TableCell>
                                <TableCell>Barcode</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                unitConverter.filter(uc => uc.base_unit_variant_id === currentVariant.id).map((vr, idx) => (
                                    <TableRow key={vr.vid}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{currentVariant.name}</TableCell>
                                        <TableCell>
                                            {/* <input className="sapo-textbox" type="text" defaultValue={vr.unit || ""} onChange={(event) => handleChangeUnit(event, vr)} /> */}
                                            <Autocomplete
                                                className="autocomplete"
                                                options={props?.map360ProductUnits || []}
                                                getOptionLabel={(option: Map360ProductUnitModel) => option.name}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder="Chọn đơn vị"
                                                    />
                                                }
                                                onChange={(e: any, optionSelected: any) => {
                                                    handleChangeUnit(optionSelected?.name || '', vr)
                                                }}
                                                value={props?.map360ProductUnits?.find((item: Map360ProductUnitModel) => item.name === vr.unit)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input className="sapo-textbox" type="number" min={2} defaultValue={vr.unit_multiplier || 2} onChange={(event) => handleChangeUnitMultiplier(event, vr)} />
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                className="sapo-textbox"
                                                disabled
                                                value={props.currentVariant?.unit || ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input className="sapo-textbox" type="text" defaultValue={vr.barcode} onChange={(event) => handleChangeBarcode(event, vr)} />
                                        </TableCell>
                                        <TableCell>
                                            <HighlightOff className="cursor-pointer" color="error" onClick={() => removeItem(vr)}></HighlightOff>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <Button className="add-more btn sapo-btn-default" onClick={addConverter}>Thêm bộ quy đổi</Button>
                    </Table>
                </DialogContent>
                <DialogActions>
                <button onClick={handleClose} className="btn sapo-btn-primary">
                    Hủy bỏ
                </button>
                <button onClick={handleSubmit} className="btn sapo-btn-default">
                    Xác nhận
                </button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default VariantUnitConverter;