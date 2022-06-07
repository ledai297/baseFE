import { Card, CardContent, Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { SellerDetailModel } from '../../../../services/seller/type/SellerDetail';
import { SellerMainCategory } from '../../../../services/seller/type/SellerMainCatgory';
import { SellerStatuses } from '../../../../services/seller/type/SellerStatuses';
import "./sellerInfo.styles.scss";

interface IProps {
    sellerDetail: SellerDetailModel
}

const SellerInfo: React.FC<IProps> = (props: IProps) => {
    const renderSellerStatus = () => {
        let label = "";
        let statusClass = "";
        switch(props.sellerDetail?.status) {
            case SellerStatuses.ACTIVE:
                label = "Đang hoạt động";
                statusClass = "active";
                break;
            case SellerStatuses.AWAITING:
                label = "Đang chờ duyệt";
                statusClass = "awatting";
                break;
            case SellerStatuses.INACTIVE:
                label = "Dừng hợp tác";
                statusClass = "inactive";
                break;
            case SellerStatuses.REJECTED:
                label = "Đã từ chối";
                statusClass = "rejected";
                break;
            case SellerStatuses.DELETED:
                label = "Đã xóa";
                statusClass = "deleted";
                break;
            default:
                label = "Đang chờ duyệt";
                statusClass = "active";
                break;
        }

        return (
            <div className={`seller-status ${statusClass}`}>
                {label}
            </div>
        )
    }

    return (
        <Card className="seller-info">
            <CardContent>
                <div className='seller-info__title'>
                    <span className='title'>Thông tin chung</span>
                    {renderSellerStatus()}
                </div>

                <Grid container spacing={2}>
                    <Grid item xs={6} container>
                        <Grid item xs={4}>
                            <b>Tên seller</b>
                        </Grid>
                        <Grid item xs={8}>{props.sellerDetail?.name}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}>
                            <b>Tên chủ tài khoản</b>
                        </Grid>
                        <Grid item xs={8}>{props.sellerDetail?.sellerPaymentMethod?.accountOwnerName}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}>
                            <b>SĐT</b>
                        </Grid>
                        <Grid item xs={8}>{props.sellerDetail?.phoneNumber}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}>
                            <b>Số tài khoản</b>
                        </Grid>
                        <Grid item xs={8}>{props.sellerDetail?.sellerPaymentMethod?.bankAccountNumber}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}><b>Email đăng ký</b></Grid>
                        <Grid item xs={8}>{props.sellerDetail?.email}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}><b>Ngân hàng</b></Grid>
                        <Grid item xs={8}>{props.sellerDetail?.sellerPaymentMethod?.bankName}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}><b>Ngày tạo tài khoản</b></Grid>
                        <Grid item xs={8}>{moment(props.sellerDetail?.createdAt).local().format("DD/MM/YYYY")}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}><b>Chi nhánh</b></Grid>
                        <Grid item xs={8}>{props.sellerDetail?.sellerPaymentMethod?.branch}</Grid>
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={4}><b>Ngành hàng chính</b></Grid>
                        <Grid item xs={8}>{props.sellerDetail?.references?.categories?.map((c: SellerMainCategory) => c.label)?.join(", ")}</Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
export default SellerInfo;