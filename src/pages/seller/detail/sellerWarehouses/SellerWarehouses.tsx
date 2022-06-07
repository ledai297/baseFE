import { makeStyles, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { District } from '../../../../services/district';
import { Province } from '../../../../services/province';
import sellerService from '../../../../services/seller';
import { SellerWarehouseDto } from '../../../../services/seller/type/SellerWarehouseDto';
import { SellerWarehouseModel } from '../../../../services/seller/type/SellerWarehouseModel';
import { WardModel } from '../../../../services/ward/type/ward';

interface IProps {
    sellerId: any
}

const SellerWarehouses: React.FC<IProps> = (props: IProps) => {
    const [ sellerWarehouses, setSellerWarehouses ] = useState<Array<SellerWarehouseDto>>([]);

    useEffect(() => {
        fetchSellerWarehouses();
    }, []);

    const fetchSellerWarehouses = async () => {
        try {
            const response = await sellerService.filterSellerWarehouses(props.sellerId);
            const { sellerWarehouses, reference } = response;
            let sellerWarehouseDtos: SellerWarehouseDto[] = [];
            sellerWarehouses.forEach((warehouse: SellerWarehouseModel, index: number) => {
                const ward = reference.wards.find((w: WardModel) => w.provinceId === warehouse.provinceId && w.districtId === warehouse.districtId && w.id === warehouse.wardId);
                const district = reference.districts.find((d: District) => d.provinceId === warehouse.provinceId && d.id === warehouse.districtId);
                const province = reference.provinces.find((p: Province) => p.id === warehouse.provinceId);
                const address = `${warehouse.line1}, ${ward?.name}, ${district?.name}, ${province?.name}`;

                const sellerWarehouse = new SellerWarehouseDto();
                sellerWarehouse.id = warehouse.id;
                sellerWarehouse.label = warehouse.label;
                sellerWarehouse.address = address;
                sellerWarehouse.phoneNumber = warehouse.contactPhoneNumber;
                sellerWarehouse.status = warehouse.status;
                sellerWarehouse.index = index + 1;
                sellerWarehouseDtos.push(sellerWarehouse);
            });

            setSellerWarehouses(sellerWarehouseDtos);
        } catch (error) {

        }
    }

    return (
        <div className='seller-warehouse'>
            <MaterialTable
                columns={[
                    {
                        title: 'STT',
                        field: 'index',
                        cellStyle: {
                            width: '5%'
                        },
                        headerStyle: {
                            width: '5%'
                        },
                    },
                    {
                        title: 'Tên kho',
                        field: 'label',
                        // cellStyle: {
                        //     width: '35%'
                        // },
                        // headerStyle: {
                        //     width: '35%'
                        // }
                    },
                    {
                        title: 'SĐT',
                        field: 'phoneNumber',
                    },
                    {
                        title: 'Địa chỉ',
                        field: 'address',
                        cellStyle: {
                            width: '40%'
                        },
                        headerStyle: {
                            width: '40%'
                        },
                    },
                    {
                        title: 'Trạng thái',
                        cellStyle: {
                            textAlign: 'center',
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                        render: (rowData: SellerWarehouseDto) => {
                            return (
                                <div style={{ color: rowData.status === 'ACTIVE' ? 'rgba(68, 173, 104, 1)' : 'rgba(143, 143, 143, 1)' }}>
                                    {rowData.status === 'ACTIVE' ? 'Hiện' : 'Ẩn'}
                                </div>
                            );
                        }
                    },
                ]}
                data={sellerWarehouses}
                options={{
                    selection: false,
                    search: false,
                    paging: false,
                    sorting: false,
                    headerStyle: { position: 'sticky', top: 0, backgroundColor: '#E7E9EB', fontSize: "13px" },
                    maxBodyHeight: '37vh',
                    toolbar: false,
                    rowStyle: { fontSize: '13px' }
                }}
                components={{
                    Container: props => <Paper {...props} elevation={0} className="table-material" />
                }}
            />
        </div>
    )
}
export default SellerWarehouses;