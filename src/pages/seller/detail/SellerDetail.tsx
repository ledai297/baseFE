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
            enqueueSnackbar("D???ng h???p t??c v???i seller th??nh c??ng", optionSnackbarSuccess);
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
            // enqueueSnackbar("D???ng h???p t??c v???i seller th??nh c??ng", optionSnackbarSuccess);
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
            // enqueueSnackbar("T??? ch???i h???p t??c v???i seller th??nh c??ng", optionSnackbarSuccess);
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
            // enqueueSnackbar("T??? ch???i h???p t??c v???i seller th??nh c??ng", optionSnackbarSuccess);
            setOpenModal(false);
        } catch (error) {
            const errorMessage = ErrorUtils.getErrorMessage(error);
            enqueueSnackbar(errorMessage, optionSnackbarError);
        }
    }

    const onDeactivateSeller = () => {
        setOpenModal(true);
        // modalRef.current.cancelLabel = "H???y";
        // modalRef.current.confirmLabel = "?????ng ??";
        // modalRef.current.title = "D???ng h???p t??c";
        // modalRef.current.description = (
        //     <div>B???n ch???c ch???n mu???n d???ng h???p t??c? S???n ph???m c???a <b>{sellerDetail.name}</b> s??? kh??ng ???????c b??n n???a</div>
        // );
        // modalRef.current.onCancel = () => setOpenModal(false);
        // modalRef.current.onConfirm = () => deactivateSeller()
    }

    const renderGroupActions = () => {
        switch(sellerDetail.status) {
            case SellerStatuses.ACTIVE:
                // modalRef.current.cancelLabel = "B???n c?? ch???c ch???n mu???n d???ng h???p t??c"
                return (
                    <div className='w-100 sm-flex sm-justify-end mb-10'>
                        <div
                            className="btn sapo-btn-danger"
                            onClick={onDeactivateSeller}
                        >D???ng h???p t??c</div>
                    </div>
                );
            case SellerStatuses.AWAITING:
                return (
                    <div className='w-100 sm-flex sm-justify-end mb-10'>
                        <div
                            className="btn sapo-btn-danger"
                            onClick={rejectSeller}
                        >T??? ch???i</div>
                        <div
                            className="btn sapo-btn-default ml-15"
                            onClick={approveSeller}
                        >Ph?? duy???t</div>
                    </div>
                )
            case SellerStatuses.INACTIVE:
                return (
                    <div className='w-100 sm-flex sm-justify-end mb-10'>
                        <div
                            className="btn sapo-btn-default"
                            onClick={reactivateSeller}
                        >Ti???p t???c h???p t??c</div>
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
                                <div onClick={goToSellerList} className="redirect-link">{`<  Danh s??ch seller`}</div>
                                <div>Chi ti???t seller</div>
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
                    <Tab value="seller-variants" label="Danh s??ch s???n ph???m" />
                    <Tab value="seller-order" label="Danh s??ch ????n h??ng" />
                    <Tab value="seller-warehouses" label="Kho l???y h??ng" />
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