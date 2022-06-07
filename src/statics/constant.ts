export const CONSTANT = {
    MEDIA_TYPE: {
        PRODUCT: "Product"
    },
    FILE_STATUS: {
        WAITING: "WAITING",
        PROCESSING: "PROCESSING",
        SUCCESS: "SUCCESS",
        FAIL: "FAIL"
    },
    FILE_ACTION: {
        DOWNLOAD: "Download",
        UPLOAD: "Upload",
        UPDATE_VARIANTS: "UpdateVariants"
    },
    VARIANT_STATUS: {
        ACTIVATED: "ACTIVATED",
        DEACTIVATED: "DEACTIVATED",
        DELETED: "DELETED"
    },
    NO_IMAGE_URL: "/no-image.png",
    IMAGE_ALLOW: [
        'image/jpg',
        'image/png',
        'image/jpeg'
    ],
    ORDER_STATUSES: [
        {
            value: 'CART',
            label: 'Giỏ hàng'
        },
        {
            value: 'ORDERED',
            label: 'Đã đặt hàng',
        },
        {
            value: 'PACKED',
            label: 'Đã đóng gói',
        },
        {
            value: 'PICKED',
            label: 'Đang giao hàng'
        },
        {
            value: 'COMPLETED',
            label: 'Hoàn tất'
        },
        {
            value: 'CANCELLED',
            label: 'Hủy'
        }
    ],
    PAYMENT_METHODS: [
        {
            value: 'COD',
            label: 'Tiền mặt',
        }
    ],
    PAYMENT_STATUSES: [
        {
            value: 'UNPAID',
            label: 'Chưa thanh toán'
        },
        {
            value: 'PARTIAL',
            label: 'Thanh toán một phần'
        },
        {
            value: 'PAID',
            label: 'Đã thanh toán'
        }
    ],
    ORDER_PROCESSES: {
        CONFIRMING: {
            value: 'CONFIRMING',
            label: 'Đang xác nhận',
            step: 1,
        },
        PREPARE_PRODUCT: {
            value: 'PREPARE_PRODUCT',
            label: 'Chuẩn bị hàng',
            step: 2,
        },
        SHIPPING: {
            value: 'SHIPPING',
            label: 'Đang giao hàng',
            step: 3,
        },
        COMPLETED: {
            value: 'COMPLETED',
            label: 'Hoàn tất',
            step: 4,
        }
    },
    MAX_LINE_ITEMS: 9999,
    MIN_ORDER_VALUE: 0,
    MAX_FILE_UPLOAD_SIZE: 1, //MB
    VENDORS: {
        VNSHOP: {
            id: 1,
            code: 'VNSHOP',
        }
    },
    FORWARDERS: {
        SHIP60: {
            id: 1,
            code: 'SHIP60',
        }
    },
    USER_ROLES: {
        ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
        ROLE_ADMIN: 'ROLE_ADMIN',
        ROLE_MARKET_VISITOR: 'ROLE_MARKET_VISITOR'
    },
    FULFILLMENT_STATUS: {
        DRAFT: 'DRAFT',
        PACKED: 'PACKED',
        PICKED: 'PICKED',
        RECEIVED: 'RECEIVED',
        CANCELLED: 'CANCELLED'
    },
    SALE_AUTHORITIES: {
        SALE_EMPLOYEE: {
            label: 'Nhân viên',
            value: 'ROLE_SALE_EMPLOYEE'
        },
        SALE_GROUP_LEADER: {
            label: 'Trưởng nhóm',
            value: 'ROLE_SALE_GROUP_LEADER'
        },
        SALE_MANAGER: {
            label: 'Trưởng phòng',
            value: 'ROLE_SALE_MANAGER'
        }
    },
    SALE_DETAIL_TABS: {
        SALE_ORDERS: 0,
        SALE_SIGNBOARD_CONTRACTS: 1,
        SALE_MERCHANTS: 2,
        SALE_DETAIL: 3
    }
}
