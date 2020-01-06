export const LOGIN_STATUS_NORMAL = 'login';
export const LOGIN_STATUS_FORGET = 'forget';
export const LOGIN_STATUS_CHANGE_PASSWORD = 'change-password';
export const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

// API TYPE
export const API_TYPE_ADD = 'POST';
export const API_TYPE_UPDATE = 'PUT';
export const API_TYPE_DELETE = 'DELETE';
export const API_TYPE_GET = 'GET';

export const CREATED_BY_CUSTOMER = 'CREATED_BY_CUSTOMER';
export const STATUS_ORDER_NEW = 1;
export const STATUS_ORDER_ERROR = 33;
export const STATUS_MANIFEST_NEW = 1;

// MANIFEST STATUS
export const PUBLISH_MANIFEST = 'Publish manifest to ILT';

export const maxSizeImport = 5000;

//US Country ID
export const US_COUNTRY = 82;

// NOTIFY
export const SUCCESS_TITLE_NOTIFY_EN = 'Success';
export const SUCCESS_TITLE_NOTIFY_VI = 'Thành công';
export const ERROR_TITLE_NOTIFY_EN = 'Error';
export const ERROR_TITLE_NOTIFY_VI = 'Lỗi';
export const ADD_SUCCESS_NOTIFY_EN = 'Added success!';
export const ADD_SUCCESS_NOTIFY_VI = 'Thêm thành công!';
export const EDIT_SUCCESS_NOTIFY_EN = 'Updated success!';
export const EDIT_SUCCESS_NOTIFY_VI = 'Thay đổi thành công!';
export const DELETE_SUCCESS_NOTIFY_EN = 'Deleted success!';
export const DELETE_SUCCESS_NOTIFY_VI = 'Xóa thành công!';
export const SEARCH_ERROR_NOTIFY_EN = 'An error has occurred in the search process.';
export const SEARCH_ERROR_NOTIFY_VI = 'Một lỗi xảy ra trong quá trình tìm kiếm';
export const LOGIN_SUCCESS_NOTIFY_EN = 'Login was success!';
export const LOGIN_SUCCESS_NOTIFY_VI = 'Đăng nhập thành công!';
export const SENDPASS_SUCCESS_NOTIFY_EN = 'Send request success!';
export const SENDPASS_SUCCESS_NOTIFY_VI = 'Gửi yêu cầu thành công!';
export const CHANGEPASS_SUCCESS_NOTIFY_EN = 'Change password was success!';
export const CHANGEPASS_SUCCESS_NOTIFY_VI = 'Thay đổi mật khẩu thành công!';
export const CHECKMAIL_SUCCESS_NOTIFY_EN = 'Check your email to change your password.';
export const CHECKMAIL_SUCCESS_NOTIFY_VI = 'Kiểm tra email để thay đổi mật khẩu.';
export const BAGNO_SUCCESS_NOTIFY_VI = 'Mã túi là: ';
export const BAGNO_SUCCESS_NOTIFY_EN = 'Bag no: ';

// Manifest status
export const listCustomerManifest = [
    {
        value: 1,
        label: 'Create by customer',
    }, {
        value: 2,
        label: 'Publish manifest to ILT',
    }
];


// Transport type
export const listTransportModal = [
    {
        value: 1,
        label: 'Transhipment',
    }, {
        value: 2,
        label: 'InBound',
    }, {
        value: 3,
        label: 'OutBound'
    },
];

// Tracking type
export const lstTracking = [
    {
        value: 1,
        label: 'Trackable',
    }, {
        value: 2,
        label: 'Non-Trackable',
    }, {
        value: 3,
        label: 'E-Packet',
    }
];

// Tracking type
export const lstService = [
    {
        value: 1,
        label: 'Normal',
    },
    {
        value: 2,
        label: 'Express',
    }
];

// Package type EC for US
export const lstPackageTypeECForUS = [
    {
        value: 1,
        label: 'Bag',
    },
    {
        value: 2,
        label: 'Box',
    },
    {
        value: 3,
        label: 'Carton',
    },
    {
        value: 4,
        label: 'Container',
    },
    {
        value: 5,
        label: 'Crate',
    },
    {
        value: 6,
        label: 'Envelope',
    },
    {
        value: 7,
        label: 'Pail',
    },
    {
        value: 8,
        label: 'Pallet',
    },
    {
        value: 9,
        label: 'Satchel',
    },
    {
        value: 10,
        label: 'Tube',
    }
];

// Package type EX for US
export const lstPackageTypeEXForUS = [
    {
        value: 2,
        label: 'Box',
    },
    {
        value: 5,
        label: 'Crate',
    },
    {
        value: 10,
        label: 'Tube',
    },
    {
        value: 11,
        label: 'Letter',
    },
    {
        value: 12,
        label: 'IBC Pak',
    },
    {
        value: 13,
        label: 'Metal Film Can',
    },
    {
        value: 14,
        label: 'Other',
    }
];

//Currency
export const lstCurrency = [
    {
        value: 1,
        label: 'VND',
    },
    {
        value: 2,
        label: 'USD',
    }
];

//Contents
export const lstContent = [
    {
        value: 1,
        label: 'Parcel',
    },
    {
        value: 2,
        label: 'Mail',
    }
];

// Tracking list

export const trackTables_EN = [
    {
        key: 0,
        name: 'All',
        icon: 'icon-all',
        color: '#fa541c',
        count: 0,
    }, {
        key: 1,
        name: 'Booking',
        icon: 'icon-book',
        color: '#722ed1',
        count: 0,
    }, {
        key: 2,
        name: 'Truck Transit',
        icon: 'icon-truck',
        color: '#1890ff',
        count: 0,
    }, {
        key: 3,
        name: 'Flying',
        icon: 'icon-Plane-',
        color: '#2f54eb',
        count: 0,
    }, {
        key: 4,
        name: 'Dest Country',
        icon: 'icon-map-marker-radius',
        color: '#faad14',
        count: 0,
    }, {
        key: 5,
        name: 'Delivered',
        icon: 'icon-check',
        color: '#52c41a',
        count: 0,
    }
]

export const trackTables_VI = [
    {
        key: 0,
        name: 'Tất cả',
        icon: 'icon-all',
        color: '#fa541c',
        count: 0,
    }, {
        key: 1,
        name: 'Đặt hàng',
        icon: 'icon-book',
        color: '#722ed1',
        count: 0,
    }, {
        key: 2,
        name: 'Quá cảnh đường bộ',
        icon: 'icon-truck',
        color: '#1890ff',
        count: 0,
    }, {
        key: 3,
        name: 'Đang bay',
        icon: 'icon-Plane-',
        color: '#2f54eb',
        count: 0,
    }, {
        key: 4,
        name: 'Quốc gia đến',
        icon: 'icon-map-marker-radius',
        color: '#faad14',
        count: 0,
    }, {
        key: 5,
        name: 'Đã giao',
        icon: 'icon-check',
        color: '#52c41a',
        count: 0,
    }
]

// Tracking list

export const transhipmentTables_EN = [
    {
        key: 0,
        name: 'Customer Created',
        count: 0,
    },
    {
        key: 1,
        name: 'Booking',
        count: 0,
    }, {
        key: 2,
        name: 'Pickup',
        count: 0,
    }, {
        key: 3,
        name: 'Border',
        count: 0,
    }, {
        key: 4,
        name: 'Truck Transit',
        count: 0,
    }, {
        key: 5,
        name: 'Office Exchange',
        count: 0,
    }, {
        key: 6,
        name: 'Airport',
        count: 0,
    }, {
        key: 7,
        name: 'Dest Country',
        count: 0,
    }, {
        key: 8,
        name: 'Dest Branch',
        count: 0,
    }, {
        key: 9,
        name: 'Delivery',
        count: 0,
    }
]

export const transhipmentTables_VI = [
    {
        key: 0,
        name: 'Khách hàng tạo',
        count: 0,
    },
    {
        key: 1,
        name: 'Đặt hàng',
        count: 0,
    }, {
        key: 2,
        name: 'Lấy hàng',
        count: 0,
    }, {
        key: 3,
        name: 'Biên giới',
        count: 0,
    }, {
        key: 4,
        name: 'Quá cảnh đường bộ',
        count: 0,
    }, {
        key: 5,
        name: 'Văn phòng giao dịch',
        count: 0,
    }, {
        key: 6,
        name: 'Sân bay',
        count: 0,
    }, {
        key: 7,
        name: 'Quốc gia đến',
        count: 0,
    }, {
        key: 8,
        name: 'Chi nhánh đến',
        count: 0,
    }, {
        key: 9,
        name: 'Giao hàng',
        count: 0,
    }
]

// Manifest status
export const cardsFee_EN = [
    {
        key: 0,
        title: 'Buying Fees',
        action: 'Add more',
        type: 'buy'
    }, {
        key: 1,
        title: 'Selling Fees',
        action: 'Add more',
        type: 'sell'
    }
];

export const cardsFee_VI = [
    {
        key: 0,
        title: 'Chi phí mua',
        action: 'Thêm mới',
        type: 'buy'
    }, {
        key: 1,
        title: 'Chi phí bán',
        action: 'Thêm mới',
        type: 'sell'
    }
];

export const errorsImport = [
    {
        error_status: 1,
        name: 'is duplicate'
    }, {
        error_status: 2,
        name: 'is not empty'
    }, {
        error_status: 3,
        name: 'is float type'
    }, {
        error_status: 4,
        name: 'is integer type'
    }, {
        error_status: 5,
        name: 'is not date type'
    }, {
        error_status: 6,
        name: 'is must be 13 character'
    }, {
        error_status: 7,
        name: 'is require number type'
    }, {
        error_status: 8,
        name: 'is exist'
    }
];

export const listFileItem_EN = [
    'Tracking No',
    'Origin Country',
    'Origin State',
    'Destination Country',
    'Destination City',
    'Destination State',
    'Addresses of Senders',
    'Origin Zipcode',
    'Building Name of Recipients',
    'Addresses of Recipients',
    'Name of Recipients',
    'Contact Name of Recipients',
    'Phone of Recipients',
    'Email of Recipients',
    'Destination Zipcode',
    'Service Type',
    'Tracking Type',
    'Package Name',
    'Package Length',
    'Package Width',
    'Package Height',
    'Package Volume',
    'Package Type',
    'Commodity Description',
    'Commodity Unit Value',
    'Commodity Unit Volume',
    'Commodity Currency',
    'Commodity Country',
    'Internal Note',
    'Payment Method',
    'Content',
];

export const listMessage_EN = [
    ' is not empty',
    ' is require number type',
    ' is must be 13 numbers long',
    ' Duplicate',
];

export const listFileItem_VI = [
    'Mã tracking',
    'Quốc gia nơi đi',
    'Bang nơi đi',
    'Quốc gia nơi đến',
    'Thành phố nơi đến',
    'Bang nơi đến',
    'Địa chỉ người gửi',
    'PortalCode nơi đi',
    'Tên tòa nhà người nhận',
    'Địa chỉ người nhận',
    'Tên người nhận',
    'Tên liên hệ người nhận',
    'Số điện thoại người nhận',
    'Email người nhận',
    'PortalCode nơi đến',
    'Loại dịch vụ',
    'Loại tracking',
    'Tên bưu kiện',
    'Chiều dài bưu kiện',
    'Chiều rộng bưu kiện',
    'Chiều cao bưu kiện',
    'Trọng lượng bưu kiện',
    'Loại bưu kiện',
    'Mô tả hàng hóa',
    'Giá trị hàng hóa',
    'Khối lượng hàng hóa',
    'Đơn vị tiền tệ',
    'Nước sản xuất',
    'Ghi chú',
    'Phương thức thanh toán',
    'Loại hàng',
];

export const listMessage_VI = [
    ' không được rỗng',
    ' bắt buộc kiểu số',
    ' bắt buộc 13 ký tự',
    ' bị trùng',
];

export const initIdStatusCreatedByCustomer = '27';