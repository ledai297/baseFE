import { Card, CardContent, Paper, Tab, Tabs } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PopupCustom from '../../../components/PopupCustom/PopupCustom';
// import { ModalModel } from '../../../services/dto/ModalModel';
import sellerService from '../../../services/seller';
import { SellerDetailModel } from '../../../services/seller/type/SellerDetail';
import { SellerStatuses } from '../../../services/seller/type/SellerStatuses';
import ErrorUtils from '../../../utilities/ErrorUtils';
import { optionSnackbarError, optionSnackbarSuccess } from '../../../utilities/Option';
import SellerInfo from './sellerInfo/SellerInfo';
import SellerVariants from './sellerVariants/SellerVariants';
import SellerWarehouses from './sellerWarehouses/SellerWarehouses';
import "./sellerDetail.styles.scss";

interface IProps extends RouteComponentProps {

}

const SellerDetail: React.FC<IProps> = (props: IProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const sellerId = (props.match.params as any)?.id;
    const [ sellerDetail, setSellerDetail ] = useState<SellerDetailModel>(new SellerDetailModel());
    const [ currentTab, setCurrentTab ] = useState<string>("seller-variants");
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    // const modalRef = useRef<ModalModel>(new ModalModel());

    useEffect(() => {
        fetchSellerDetail();
    }, []);

    const goToSellerList = () => {
        props.history.push("/admin/sellers");
    }

    const _onChangeTab = (event: any, newValue: any) => {
        setCurrentTab(newValue);
    }

    const fetchSellerDetail = async () => {
        try {
            const response = await sellerService.fetchSellerDetail(sellerId);
            setSellerDetail(response)
        } catch (error) {

        }
    }

    const deactivateSeller = async () => {
        try {
            await sellerService.deactivateSeller(sellerId);
            fetchSellerDetail();
            enqueueSnackbar("Dừng hợp tác với seller thành công", optionSnackbarSuccess);
            setOpenModal(false);
        } catch (error) {
            const errorMessage = ErrorUtils.getErrorMessage(error);
            enqueueSnackbar(errorMessage, optionSnackbarError);
        }
    }

    const reactivateSeller = async () => {
        try {
            const response = await sellerService.reactivateSeller(sellerId);
            fetchSellerDetail();
            // enqueueSnackbar("Dừng hợp tác với seller thành công", optionSnackbarSuccess);
            setOpenModal(false);
        } catch (error) {
            const errorMessage = ErrorUtils.getErrorMessage(error);
            enqueueSnackbar(errorMessage, optionSnackbarError);
        }
    }

    const rejectSeller = async () => {
        try {
            const response = await sellerService.rejectSeller(sellerId);
            fetchSellerDetail();
            // enqueueSnackbar("Từ chối hợp tác với seller thành công", optionSnackbarSuccess);
            setOpenModal(false);
        } catch (error) {
            const errorMessage = ErrorUtils.getErrorMessage(error);
            enqueueSnackbar(errorMessage, optionSnackbarError);
        }
    }

    const approveSeller = async () => {
        try {
            const response = await sellerService.approveSeller(sellerId);
            fetchSellerDetail();
            // enqueueSnackbar("Từ chối hợp tác với seller thành công", optionSnackbarSuccess);
            setOpenModal(false);
        } catch (error) {
            const errorMessage = ErrorUtils.getErrorMessage(error);
            enqueueSnackbar(errorMessage, optionSnackbarError);
        }
    }

    const onDeactivateSeller = () => {
        setOpenModal(true);
        // modalRef.current.cancelLabel = "Hủy";
        // modalRef.current.confirmLabel = "Đồng ý";
        // modalRef.current.title = "Dừng hợp tác";
        // modalRef.current.description = (
        //     <div>Bạn chắc chắn muốn dừng hợp tác? Sản phẩm của <b>{sellerDetail.name}</b> sẽ không được bán nữa</div>
        // );
        // modalRef.current.onCancel = () => setOpenModal(false);
        // modalRef.current.onConfirm = () => deactivateSeller()
    }

    const renderGroupActions = () => {
        switch(sellerDetail.status) {
            case SellerStatuses.ACTIVE:
                // modalRef.current.cancelLabel = "Bạn có chắc chắn muốn dừng hợp tác"
                return (
                    <div className='w-100 sm-flex sm-justify-end mb-10'>
                        <div
                            className="btn sapo-btn-danger"
                            onClick={onDeactivateSeller}
                        >Dừng hợp tác</div>
                    </div>
                );
            case SellerStatuses.AWAITING:
                return (
                    <div className='w-100 sm-flex sm-justify-end mb-10'>
                        <div
                            className="btn sapo-btn-danger"
                            onClick={rejectSeller}
                        >Từ chối</div>
                        <div
                            className="btn sapo-btn-default ml-15"
                            onClick={approveSeller}
                        >Phê duyệt</div>
                    </div>
                )
            case SellerStatuses.INACTIVE:
                return (
                    <div className='w-100 sm-flex sm-justify-end mb-10'>
                        <div
                            className="btn sapo-btn-default"
                            onClick={reactivateSeller}
                        >Tiếp tục hợp tác</div>
                    </div>
                );
            case SellerStatuses.REJECTED:
                return null;
        }
    }

    return (
        <div className="seller-detail">
            <div className="pageList">
                <PageHeader
                    title={
                        <Fragment>
                            <div className="wrapper-title">
                                <div onClick={goToSellerList} className="redirect-link">{`<  Danh sách seller`}</div>
                                <div>Chi tiết seller</div>
                            </div>
                        </Fragment>
                    }
                />
            </div>

            {renderGroupActions()}

            <SellerInfo
                sellerDetail={sellerDetail}
            />

            <Paper className="mt-10">
                <Tabs
                    value={currentTab}
                    onChange={_onChangeTab}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="seller-variants" label="Danh sách sản phẩm" />
                    <Tab value="seller-order" label="Danh sách đơn hàng" />
                    <Tab value="seller-warehouses" label="Kho lấy hàng" />
                </Tabs>
            </Paper>
            
            <Card>
                <CardContent>
                    {
                        currentTab === 'seller-variants' && (
                            <SellerVariants
                                sellerId={sellerId}
                            />
                        )
                    }
                    {
                        currentTab === 'seller-warehouses' && (
                            <SellerWarehouses
                                sellerId={sellerId}
                            />
                        )
                    }
                </CardContent>
            </Card>

            {/* <PopupCustom
                handleCancel={modalRef.current.onCancel}
                open={openModal}
                handleConfirm={modalRef.current.onConfirm}
                onClose={() => setOpenModal(false)}
                title={modalRef.current.title}
                description={modalRef.current.description}
                loading={false}
            /> */}
        </div>
    )
}
export default SellerDetail;