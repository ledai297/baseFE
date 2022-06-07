import { makeStyles, Paper, TablePagination } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';
import sellerService from '../../../services/seller';
import { SellerFilterRequest } from '../../../services/seller/type/SellerFilterRequest';
import { SellerFilterModel } from '../../../services/seller/type/SellerFilterModel';
import SellersFilter from './SellersFilter';
import { PaginationResponseModel } from '../../../services/pagination/PaginationResponse';
import MaterialTable from 'material-table';
import CustomTablePaginationActions from '../../../components/CustomTablePaginationActions';
import moment from 'moment';
import { SellerStatuses } from '../../../services/seller/type/SellerStatuses';

interface IProps extends RouteComponentProps {

}

const useStyles = makeStyles({
    caption: {
        flexGrow: 'unset',
        marginRight: '10px',
    },
    toolbar: {
        justifyContent: 'flex-end',
    }
});

const SellerList: React.FC<IProps> = (props: IProps) => {
    const title = "Danh sách seller";
    const classes = useStyles();
    const [ sellers, setSellers ] = useState<Array<SellerFilterModel>>([]);
    const [ pagination, setPagination ] = useState<PaginationResponseModel>(new PaginationResponseModel());
    const [ filter, setFilter ] = useState<SellerFilterRequest>(new SellerFilterRequest());

    useEffect(() => {
        filterSellers(new SellerFilterRequest());
    }, []);

    useEffect(() => {
        filterSellers(filter);
    }, [filter.size, filter.page]);

    const filterSellers = async (request: SellerFilterRequest) => {
        try {
            const sellerRequest = {
                ...request,
                sellerStatuses: request.sellerStatuses?.includes("ALL") ? "" : request.sellerStatuses?.join(",")
            };
            const response = await sellerService.filterSellers(sellerRequest);
            setSellers(response.sellers);
            setPagination(response.pagination);
        } catch (error) {
        }
    }

    const handleChangePage = (e: any, page: number) => {
        setFilter({
            ...filter,
            page: page + 1
        });
    }

    const handleChangeRowsPerPage = (e: any) => {
        setFilter({
            ...filter,
            size: Number(e.target.value)
        });
    }

    const renderStatus = (status: string) => {
        switch(status) {
            case SellerStatuses.ACTIVE:
                return <div style={{ color: 'rgba(0, 137, 255, 1)' }}>Đang hoạt động</div>
            case SellerStatuses.AWAITING:
                return <div style={{ color: 'rgba(238, 140, 25, 1)' }}>Chờ duyệt</div>
            case SellerStatuses.INACTIVE:
                return <div style={{ color: 'rgba(234, 121, 119, 1)' }}>Dừng hoạt động</div>
            case SellerStatuses.REJECTED:
                return <div style={{ color: 'rgba(234, 121, 119, 1)' }}>Đã từ chối</div>
            case SellerStatuses.DELETED:
                return <div style={{ color: 'rgba(234, 121, 119, 1)' }}>Đã xóa</div>
            default:
                return "N/A";
        }
    }

    return (
        <div className="seller-list">
            <PageHeader title={title}></PageHeader>
            <Paper style={{ clear: "both" }}>
                <SellersFilter
                    setFilter={setFilter}
                    filter={filter}
                    filterSellers={filterSellers}
                />
                <MaterialTable
                    columns={[
                        {
                            title: 'Mã',
                            field: 'code',
                            headerStyle: {
                                // height: '70px',
                                width: '10%',
                                paddingLeft: '30px',
                            },
                            cellStyle: {
                                paddingLeft: '30px',
                                width: '10%',
                            }
                        },
                        {
                            title: 'Tên Seller',
                            render: (rowData) => {
                                return (
                                    <a href={`/admin/sellers/${rowData.id}`} style={{ color: "#098DFF", textDecoration: 'none' }}>
                                        {rowData.name}
                                    </a>
                                );
                            },
                            headerStyle: {
                                width: '30%',
                                textAlign: 'left'
                            },
                            cellStyle: {
                                width: '30%',
                                textAlign: 'left'
                            }
                        },
                        {
                            title: 'Email ',
                            field: 'email',
                            headerStyle: {
                                width: '15%',
                                textAlign: 'left'
                            },
                            cellStyle: {
                                width: '15%',
                                textAlign: 'left'
                            }
                        },
                        {
                            title: 'SĐT',
                            field: 'phoneNumber',
                            headerStyle: {
                                width: '15%',
                                textAlign: 'center'
                            },
                            cellStyle: {
                                width: '15%',
                                textAlign: 'center'
                            }
                        },
                        {
                            title: 'Ngày tạo',
                            headerStyle: {
                                width: '10%',
                                textAlign: 'center'
                            },
                            cellStyle: {
                                width: '10%',
                                textAlign: 'center'
                            },
                            render: (row: SellerFilterModel) => (
                                <div>{row.createdAt ? moment(row.createdAt).local().format("DD/MM/YYYY") : ""}</div>
                            )
                        },
                        {
                            title: 'Trạng thái',
                            headerStyle: {
                                width: '10%',
                                textAlign: 'right'
                            },
                            cellStyle: {
                                width: '10%',
                                textAlign: 'right'
                            },
                            render: (row: SellerFilterModel) => (
                                renderStatus(row.status)
                            )
                        },
                    ]}
                    data={sellers}
                    options={{
                        selection: false,
                        search: false,
                        paging: false,
                        sorting: false,
                        headerStyle: { position: 'sticky', top: 0, backgroundColor: '#E7E9EB', fontSize: "13px" },
                        maxBodyHeight: 'calc(100vh - 250px)',
                        toolbar: false,
                        rowStyle: { fontSize: '13px' }
                    }}
                    components={{
                        Container: props => <Paper {...props} elevation={0} className="table-material" />
                    }}
                />

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[50, 100, 200]}
                    count={pagination.total || 0}
                    rowsPerPage={pagination.size}
                    page={pagination.page - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={props => (
                        <CustomTablePaginationActions {...props} />
                    )}
                    classes={{ caption: classes.caption, toolbar: classes.toolbar }}
                />
            </Paper>
        </div>
    )
}
export default SellerList;