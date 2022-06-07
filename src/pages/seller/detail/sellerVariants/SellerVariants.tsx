import { Card, CardContent, Checkbox, Grid, makeStyles, Paper, Popover, TablePagination } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import CustomTablePaginationActions from '../../../../components/CustomTablePaginationActions';
import SmTable from '../../../../components/SmTable/SmTable';
import { District } from '../../../../services/district';
import { PaginationResponseModel } from '../../../../services/pagination/PaginationResponse';
import { Province } from '../../../../services/province';
import sellerService from '../../../../services/seller';
import { SellerRegionalVariantModel } from '../../../../services/seller/type/SellerRegionalVariantModel';
import { SellerVariantFilterRequest } from '../../../../services/seller/type/SellerVariantsFilterRequest';
import { SellerVariantsFilterResultModel } from '../../../../services/seller/type/SellerVariantsFilterResultModel';
import { SellerWarehouseQuotasDto } from '../../../../services/seller/type/SellerWarehouseQuotasDto';
import { SellerWarehouseQuotasModel } from '../../../../services/seller/type/SellerWarehouseQuotasModel';
import { WardModel } from '../../../../services/ward/type/ward';
import { calculatePostCommissionPrice } from '../../../../utilities/Helpers';

interface IProps {
    sellerId: any
}

const useStyles = makeStyles({
    papper: {
        outline: 0,
        position: 'absolute',
        maxWidth: 'calc(100% - 32px)',
        minWidth: '16px',
        maxHeight: 'calc(100% - 32px)',
        minHeight: '16px',
        overflowX: 'auto',
        overflowY: 'auto',
    },
    caption: {
        flexGrow: 'unset',
        marginRight: '10px',
    },
    toolbar: {
        justifyContent: 'flex-end',
    },
    filter: {
        height: 'max-content',
        overflowY: 'scroll',
    },
    customTextField: {
        "& input::placeholder": {
            fontSize: "13px",
        }
    }
});

const SellerVariants: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [ filterParams, setFilterParams ] = useState<SellerVariantFilterRequest>(new SellerVariantFilterRequest({ id: props.sellerId }));
    const [ sellerVariants, setSellerVariants ] = useState<Array<SellerVariantsFilterResultModel>>([]);
    const [ pagination, setPagination ] = useState<PaginationResponseModel>(new PaginationResponseModel());
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'anchor-popover' : undefined;
    
    const [ anchorWarehouseQuota, setAnchorWarehouseQuota ] = useState(null);
    const openWarehouseQuota = Boolean(anchorWarehouseQuota);
    const warehousePopoverId = open ? 'seller-warehouse-popover' : undefined;
    const [ anchorVariantPricePopover, setAnchorVariantPricePopover ] = useState(null);
    const openVariantPricePopover = Boolean(anchorVariantPricePopover);
    // const sellerRegionalVariantId = 
    const [ warehouseQuotaDtos, setWarehouseQuotaDtos ] = useState<Array<SellerWarehouseQuotasDto>>([]);
    const [ sellerRegionalVariants, setSellerRegionalVariants ] = useState<Array<SellerRegionalVariantModel>>([]);

    useEffect(() => {
        fetchSellerVariants();
    }, [filterParams.keyword, filterParams.page, filterParams.size])

    const fetchSellerVariants = async () => {
        try {
            const response = await sellerService.filterSellerVariants(props.sellerId, filterParams);
            setSellerVariants(response.variants);
            setPagination(response.pagination);
        } catch (error) {

        }
    }

    const fetchSellerWarehouseQuota =  async (variantId: any) => {
        try {
            const response = await sellerService.filterSellerWarehouseQuotas(props.sellerId, variantId);
            const { warehouseQuotas, reference } = response;
            let warehouseQuotaDtos: SellerWarehouseQuotasDto[] = [];
            warehouseQuotas.forEach((warehouse: SellerWarehouseQuotasModel) => {
                const ward = reference.wards.find((w: WardModel) => w.provinceId === warehouse.provinceId && w.districtId === warehouse.districtId && w.id === warehouse.wardId);
                const district = reference.districts.find((d: District) => d.provinceId === warehouse.provinceId && d.id === warehouse.districtId);
                const province = reference.provinces.find((p: Province) => p.id === warehouse.provinceId);
                const address = `${warehouse.line1}, ${ward?.name}, ${district?.name}, ${province?.name}`;

                const warehouseQuota = new SellerWarehouseQuotasDto();
                warehouseQuota.id = warehouse.id;
                warehouseQuota.label = warehouse.label;
                warehouseQuota.quantity = warehouse.quantity;
                warehouseQuota.address = address;
                warehouseQuotaDtos.push(warehouseQuota);
            });

            setWarehouseQuotaDtos(warehouseQuotaDtos);
        } catch (error) {

        }
    }

    const fetchSellerVariantPrice = async (variantId: any) => {
        try {
            const response = await sellerService.fetchSellerRegionalVariantPrice(props.sellerId, variantId);
            setSellerRegionalVariants(response);
        } catch (error) {

        }
    }

    const _onClose = () => {
        setAnchorEl(null);
    };

    const _onCloseWarehouseQuota = () => {
        setAnchorWarehouseQuota(null);
    }

    const _onCloseVariantPricePopover = () => {
        setAnchorVariantPricePopover(null);
    }

    const _onKeyUp = (e: any) => {
        if (e.which === 13) {
            const input = document.getElementById("variants-search-keyword");
            const newFilter = new SellerVariantFilterRequest(
                {
                    ...filterParams,
                    keyword: (input as any)?.value
                }
            );
            setFilterParams(newFilter);
        }
    }

    const _onChangePage = (e: any, page: number) => {
        setFilterParams({
            ...filterParams,
            page
        });
    }

    const _onChangeRowsPerPage = (e: any) => {
        setFilterParams({
            ...filterParams,
            size: Number(e.target.value)
        });
    }

    const handleTogglePopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const renderFilterContent = () => {
        return (
            <Grid container>
                <Grid>
                    <Grid item xs={12} style={{ marginTop: '1rem' }}>
                        <button className="btn sapo-btn-default">Lọc</button>
                        <button className="btn sapo-btn-default ml-15">Xóa bộ lọc</button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    const showSellerWarehouseQuota = (e: any, variantId: any) => {
        fetchSellerWarehouseQuota(variantId);
        setAnchorWarehouseQuota(e.currentTarget);
    }

    const showSellerVariantPrice = (e: any, variantId: any) => {
        fetchSellerVariantPrice(variantId);
        setAnchorVariantPricePopover(e.currentTarget);
    }

    const renderFilter = () => {
        return (
            <div className="sellers-filter">
                <div className="filter-header">
                    <button className="btn btn-filter" onClick={handleTogglePopover}>
                        <span>Chọn bộ lọc</span>
                        <svg className="next-icon next-icon--size-20" id="svg-filter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.28 9.28l3.366 3.366c.196.196.512.196.708 0L13.72 9.28c.293-.293.293-.767 0-1.06-.14-.14-.332-.22-.53-.22H6.81c-.414 0-.75.336-.75.75 0 .2.08.39.22.53z"></path></svg></svg>
                    </button>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={_onClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        classes={{ paper: classes.papper }}
                    >
                        <Card style={{ width: '450px', fontSize:'13px' }} classes={{ root: classes.filter }} >
                            <CardContent> 
                                {renderFilterContent()}
                            </CardContent>
                        </Card>
                    </Popover>

                    <div className="group-input-query w-100">
                        <svg id="next-search-reverse" className="next-icon next-icon--size-16" width="100%" height="100%"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path></svg></svg>
                        <input
                            type="text"
                            className="input-query sapo-textbox"
                            placeholder="Tìm theo tên sản phẩm, barcode"
                            id="variants-search-keyword"
                            onKeyUp={_onKeyUp}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const SellerWarehousePopover = () => {
        return (
            <Popover
                id={warehousePopoverId}
                open={openWarehouseQuota}
                anchorEl={anchorWarehouseQuota}
                onClose={_onCloseWarehouseQuota}
                disableRestoreFocus
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'left',
                // }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: { width: '600px' },
                }}
            >
                <MaterialTable
                    columns={[
                        {
                            title: 'Tên kho',
                            field: 'label',
                            cellStyle: {
                                width: '25%'
                            },
                            headerStyle: {
                                width: '25%'
                            }
                        },
                        {
                            title: 'Địa chỉ',
                            field: 'address',
                            cellStyle: {
                                width: '60%'
                            },
                            headerStyle: {
                                width: '60%'
                            }
                        },
                        {
                            title: 'Số lượng',
                            field: 'quantity',
                            cellStyle: {
                                textAlign: 'center'
                            },
                            headerStyle: {
                                textAlign: 'center'
                            },
                        }
                    ]}
                    data={warehouseQuotaDtos}
                    options={{
                        selection: false,
                        search: false,
                        paging: false,
                        sorting: false,
                        headerStyle: { position: 'sticky', top: 0, backgroundColor: '#E7E9EB', fontSize: "13px" },
                        maxBodyHeight: '37vh',
                        toolbar: false,
                        rowStyle: { fontSize: '13px' },
                    }}
                    components={{
                        Container: props => <Paper {...props} elevation={0} className="table-material" />
                    }}
                />
            </Popover>
        )
    }

    const SellerRegionalVariantPopover = () => {
        return (
            <Popover
                id={warehousePopoverId}
                open={openVariantPricePopover}
                anchorEl={anchorVariantPricePopover}
                onClose={_onCloseVariantPricePopover}
                disableRestoreFocus
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'left',
                // }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: { width: '550px' },
                }}
            >
                <MaterialTable
                    columns={[
                        {
                            title: 'Khu vực',
                            field: 'regionName',
                            headerStyle: {
                                textAlign: 'center'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            }
                        },
                        {
                            title: 'Giá seller',
                            headerStyle: {
                                textAlign: 'center'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            },
                            render: (rowData: SellerRegionalVariantModel) => {
                                const listedPrice = calculatePostCommissionPrice(rowData.price, rowData.commissionRate);
                                return (
                                    <div>{listedPrice?.toLocaleString('ja')}</div>
                                );
                            }
                        },
                        {
                            title: 'Chia sẻ(%)',
                            field: 'commissionRate',
                            headerStyle: {
                                textAlign: 'center'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            },
                        },
                        {
                            title: 'Giá niêm yết',
                            headerStyle: {
                                textAlign: 'center'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            },
                            render: (rowData: SellerRegionalVariantModel) => {
                                return (
                                    <div>{rowData?.price?.toLocaleString('ja')}đ</div>
                                );
                            }
                        },
                        {
                            title: 'Trạng thái',
                            headerStyle: {
                                textAlign: 'center'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            },
                            render: (rowData: SellerRegionalVariantModel) => {
                                return (
                                    <Checkbox checked={rowData.sellable} icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} />
                                );
                            }
                        }
                    ]}
                    data={sellerRegionalVariants}
                    options={{
                        selection: false,
                        search: false,
                        paging: false,
                        sorting: false,
                        headerStyle: { position: 'sticky', top: 0, backgroundColor: '#E7E9EB', fontSize: "13px" },
                        maxBodyHeight: '37vh',
                        toolbar: false,
                        rowStyle: { fontSize: '13px' },
                    }}
                    components={{
                        Container: props => <Paper {...props} elevation={0} className="table-material" />
                    }}
                />
            </Popover>
        )
    }

    const renderSellerVariantTable = () => {
        return (
            <SmTable
                columns={[
                    {
                        title: 'Tên sản phẩm',
                        field: 'name',
                        cellStyle: {
                            width: '35%'
                        },
                        headerStyle: {
                            width: '35%'
                        }
                    },
                    {
                        title: 'SKU',
                        field: 'sku',
                        cellStyle: {
                            width: '35%'
                        },
                        headerStyle: {
                            width: '35%'
                        }
                    },
                    {
                        title: 'Giá bán',
                        cellStyle: {
                            textAlign: 'center',
                            width: '15%'
                        },
                        headerStyle: {
                            textAlign: 'center',
                            width: '15%'
                        },
                        render: (rowData: SellerVariantsFilterResultModel) => {
                            return (
                                <div id={`id-${rowData.id}`} className='link' aria-describedby={warehousePopoverId} onClick={(e: any) => showSellerVariantPrice(e, rowData.id)}>
                                    Xem
                                </div>
                            )
                        }
                    },
                    {
                        title: 'SL có sẵn / kho',
                        cellStyle: {
                            textAlign: 'center',
                            width: '15%'
                        },
                        headerStyle: {
                            width: '15%'
                        },
                        render: (rowData: SellerVariantsFilterResultModel) => {
                            return (
                                <div id={`id-${rowData.id}`} className='link' aria-describedby={warehousePopoverId} onClick={(e: any) => showSellerWarehouseQuota(e, rowData.id)}>
                                    Xem
                                </div>
                            )
                        }
                    }
                ]}
                data={sellerVariants}
                maxBodyHeight="35vh"
            />
        )
    }

    const renderPaginationBar = () => {

        if (sellerVariants?.length === 0) {
            return null;
        }
        return (
            <TablePagination
                component="div"
                rowsPerPageOptions={[50, 100, 200]}
                count={pagination.total || 0}
                rowsPerPage={pagination.size}
                page={pagination.page - 1}
                onChangePage={_onChangePage}
                onChangeRowsPerPage={_onChangeRowsPerPage}
                ActionsComponent={props => (
                    <CustomTablePaginationActions {...props} />
                )}
                classes={{ caption: classes.caption, toolbar: classes.toolbar }}
            />
        )
    }

    return (
        <div>
            {renderFilter()}
            {renderSellerVariantTable()}
            {SellerWarehousePopover()}
            {SellerRegionalVariantPopover()}
            {renderPaginationBar()}
        </div>
    )
}
export default SellerVariants;