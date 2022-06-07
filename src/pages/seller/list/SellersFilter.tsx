import { Card, CardContent, Grid, makeStyles, Popover, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { SellerFilterRequest } from '../../../services/seller/type/SellerFilterRequest';
import { SellerStatuses } from '../../../services/seller/type/SellerStatuses';

interface IProps {
    setFilter: (filter: SellerFilterRequest) => void,
    filter: SellerFilterRequest,
    filterSellers: (filter: SellerFilterRequest) => void
}

const useStyles = makeStyles({
    papper: {
        outline: 0,
        position: 'absolute',
        maxWidth: 'calc(100% - 32px)',
        minWidth: '16px',
        maxHeight: 'calc(100% - 32px)',
        minHeight: '16px',
        overflowX: 'unset',
        overflowY: 'unset',
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

const SELLER_STATUS_OPTIONS = [
    {
        label: "Tất cả",
        value: 'ALL'
    },
    {
        label: "Đang chờ",
        value: SellerStatuses.AWAITING
    },
    {
        label: "Đang hoạt động",
        value: SellerStatuses.ACTIVE
    },
    {
        label: "Đã từ chối",
        value: SellerStatuses.REJECTED
    },
    {
        label: "Dừng hợp tác",
        value: SellerStatuses.INACTIVE
    }
]

const SellersFilter: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'anchor-popover' : undefined;

    const handleTogglePopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const _onClose = () => {
        setAnchorEl(null);
    };

    const setCreatedDateMin = (date: Date) => {
        const newFilter = { ...props.filter };
        const dateMinString = moment(date).format('YYYY-MM-DD')
        newFilter.createdDateMin = date ? new Date(`${dateMinString} 00:00:01`).toISOString() : null;
        props.setFilter(newFilter);
    }

    const setCreatedDateMax = (date: Date) => {
        const newFilter = { ...props.filter };
        const dateMaxString = moment(date).format('YYYY-MM-DD')
        newFilter.createdDateMax = date ? new Date(`${dateMaxString} 23:59:59`).toISOString() : null;
        props.setFilter(newFilter);
    }

    // const onChangeStatus = (e: any) => {
        // const newFilter = { ...props.filter };
        // newFilter.sellerStatuses = options.map((item: any) => item.value);
        // props.setFilter(newFilter);
    // }

    const onChangeStatus = (e: any) => {
        const newFilter = { ...props.filter };
        newFilter.sellerStatuses = [ e.target.value ];
        props.setFilter(newFilter);
    }

    const _onKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            const newFilter = {
                ...props.filter,
                keyword: e.target.value.trim()
            };
            props.setFilter(newFilter);
            props.filterSellers(newFilter);
        }
    }

    const getSellerStatusLabel = (sellerStatus: string) => {
        let result;
        switch(sellerStatus) {
            case 'ALL':
                result = "Tất cả";
                break;
            case SellerStatuses.AWAITING:
                result = "Đang chờ";
                break;
            case SellerStatuses.ACTIVE:
                result = "Đang hoạt động";
                 break;
            case SellerStatuses.REJECTED:
                result = "Đã từ chối";
                 break;
            case SellerStatuses.INACTIVE:
                result = "Dừng hợp tác";
                 break;
            case SellerStatuses.DELETED:
                result = "Dừng hợp tác";
                 break;
            default:
                result = "Đang chờ"
                 break;
        }

        return result;
    }

    const handleFilter = () => {
        props.filterSellers(props.filter);
        _onClose();
    }

    const resetFilter = () => {
        const input = document.getElementById("keyword");
        if (input) {
            (input as any).value = "";
        }
        props.setFilter(new SellerFilterRequest());
    }

    const renderFilterContent = () => {
        return (
            <Grid container>
                <Grid item container alignItems="center">
                    <Grid item xs={3}>Ngày tạo</Grid>
                    <Grid item container xs={8} justify="space-between">
                        <Grid item xs={5}>
                            <ReactDatePicker
                                selected={props.filter.createdDateMin ? new Date(props.filter.createdDateMin) : null}
                                showMonthDropdown
                                onChange={(date: Date) => setCreatedDateMin(date)}
                                customInput={<input className="sapo-textbox" />}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Từ ngày"
                                maxDate={props.filter.createdDateMax ? new Date(props.filter.createdDateMax) : null}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <ReactDatePicker
                                selected={props.filter.createdDateMax ? new Date(props.filter.createdDateMax) : null}
                                showMonthDropdown
                                onChange={(date: any) => setCreatedDateMax(date)}
                                customInput={<input className="sapo-textbox" />}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Đến ngày"
                                minDate={props.filter.createdDateMin ? new Date(props.filter.createdDateMin) : null}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container style={{ marginTop: '1rem' }} alignItems="center">
                    <Grid item xs={3}>Trạng thái</Grid>
                    <Grid item xs={8}>
                        {/* <Autocomplete
                            className="autocomplete"
                            options={props.filter.sellerStatuses?.includes("ALL") ? [] : SELLER_STATUS_OPTIONS.filter((item: any) => !props.filter.sellerStatuses?.includes(item.value))}
                            getOptionLabel={(option: any) => {
                                return getSellerStatusLabel(option?.value);
                            }}
                            renderInput={(params) =>
                                <TextField
                                    classes={{ root: classes.customTextField }}
                                    {...params}
                                    variant="outlined"
                                    placeholder={props.filter.sellerStatuses?.length > 0 ? "" : "Chọn trạng thái"}
                                />
                            }
                            multiple={true}
                            onChange={(e: any, optionSelected: any) => onChangeStatus(optionSelected)}
                            value={props.filter.sellerStatuses?.includes("ALL")
                                ? [SELLER_STATUS_OPTIONS[0]]
                                : SELLER_STATUS_OPTIONS.filter((item: any) => props.filter?.sellerStatuses?.includes(item.value))
                            }
                        /> */}
                        <select
                            className="sapo-textbox input-dropdown sapo-btn-blank mt-5"
                            onChange={(e: any) => onChangeStatus(e)}
                            value={props.filter.sellerStatuses?.length > 0 ? props.filter.sellerStatuses[0] : null}
                        >
                            {
                                SELLER_STATUS_OPTIONS.map((option: any) => (
                                    <option value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                    </Grid>
                </Grid>

                <Grid>
                    <Grid item xs={12} style={{ marginTop: '1rem' }}>
                        <button className="btn sapo-btn-default" onClick={handleFilter}>Lọc</button>
                        <button className="btn sapo-btn-default ml-15" onClick={resetFilter}>Xóa bộ lọc</button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <div className="sellers-filter">
            <div className="filter-header">
                <button className="btn btn-filter" aria-describedby={id} onClick={handleTogglePopover}>
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

                <div className="group-input-query">
                    <svg id="next-search-reverse" className="next-icon next-icon--size-16" width="100%" height="100%"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path></svg></svg>
                    <input
                        type="text"
                        className="input-query sapo-textbox"
                        placeholder="Tìm kiếm theo tên, mã, email của seller"
                        id="keyword"
                        onKeyUp={_onKeyUp}
                    />
                </div>
            </div>
        </div>
    )
}
export default SellersFilter;