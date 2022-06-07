type MenuItem = {
    id: number,
    name: string,
    path: string,
    icon: any,
    subMenus: Array<SubMenu> | null
};
type SubMenu = {
    path: string,
    name: string
}
export const menuItems: Array<MenuItem> = [
    {
        id: 11,
        name: 'Seller',
        path: '/admin/sellers',
        icon: "/images/icons/menu-admin-users-group-icon.svg",
        subMenus: [
            { path: '/admin/sellers', name: 'Danh sách seller' }
        ]
    },
    {
        id: 12,
        name: 'Tài khoản Admin',
        path: '/admin/users',
        icon: "/images/icons/menu-admin-users-group-icon.svg",
        subMenus: [
            { path: '/admin/users', name: 'Danh sách tài khoản' }
        ]
    }
];
