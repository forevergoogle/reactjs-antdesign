    export const menus_EN = [
        {
            key: '01',
            name: 'Dashboard',
            to: '/',
            icon: 'home',
            sub_menu: [],
            display: true,
            exact: true,
        },
        {
            key: '02',
            name: 'Manifest',
            to: '/manifest',
            icon: 'profile',
            sub_menu: [],
            display: true,
            exact: true,
        },
        {
            key: '03',
            name: 'Order',
            to: '/order',
            icon: 'setting',
            sub_menu: [
                // {
                //     key: '0301',
                //     name: 'Tracking',
                //     to: '/order/tracking',
                //     icon: 'icon-5yuanquan',
                //     sub_menu: [],
                //     display: false,
                //     exact: false
                // },
                // {
                //     key: '0302',
                //     name: 'Transhipment',
                //     to: '/order/transhipment',
                //     icon: 'icon-5yuanquan',
                //     sub_menu: [],
                //     display: false,
                //     exact: false
                // },
                {
                    key: '0304',
                    name: 'Order List',
                    to: '/order/list',
                    icon: 'icon-5yuanquan',
                    sub_menu: [],
                    display: false,
                    exact: false
                },
                {
                    key: '0305',
                    name: 'Create Order',
                    to: '/order/create',
                    icon: 'icon-5yuanquan',
                    sub_menu: [],
                    display: false,
                    exact: false
                },
                {
                    key: '0303',
                    name: 'Import',
                    to: '/order/import',
                    icon: 'icon-5yuanquan',
                    sub_menu: [],
                    display: false,
                    exact: false
                },
            
            ],
            display: false,
            exact: false
        }
    ];

    export const menus_VI = [
        {
            key: '01',
            name: 'Bảng điều khiển',
            to: '/',
            icon: 'home',
            sub_menu: [],
            display: true,
            exact: true,
        },
        {
            key: '02',
            name: 'Bảng kê',
            to: '/manifest',
            icon: 'profile',
            sub_menu: [],
            display: true,
            exact: true,
        },
        {
            key: '03',
            name: 'Đơn hàng',
            to: '/order',
            icon: 'setting',
            sub_menu: [
                // {
                //     key: '0301',
                //     name: 'Theo dõi',
                //     to: '/order/tracking',
                //     icon: 'icon-5yuanquan',
                //     sub_menu: [],
                //     display: false,
                //     exact: false
                // },
                // {
                //     key: '0302',
                //     name: 'Trung chuyển',
                //     to: '/order/transhipment',
                //     icon: 'icon-5yuanquan',
                //     sub_menu: [],
                //     display: false,
                //     exact: false
                // },
                {
                    key: '0304',
                    name: 'Danh sách đơn hàng',
                    to: '/order/list',
                    icon: 'icon-5yuanquan',
                    sub_menu: [],
                    display: false,
                    exact: false
                },
                {
                    key: '0305',
                    name: 'Tạo đơn hàng',
                    to: '/order/create',
                    icon: 'icon-5yuanquan',
                    sub_menu: [],
                    display: false,
                    exact: false
                },
                {
                    key: '0303',
                    name: 'Nhập',
                    to: '/order/import',
                    icon: 'icon-5yuanquan',
                    sub_menu: [],
                    display: false,
                    exact: false
                }
            ],
            display: false,
            exact: false
        }
    ];