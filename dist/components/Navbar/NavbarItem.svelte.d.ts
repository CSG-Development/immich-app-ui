import type { IconProps } from '../../types.js';
type Props = {
    title: string;
    href: string;
    active?: boolean;
    variant?: 'compact';
    isActive?: () => boolean;
    icon?: string | IconProps;
    activeIcon?: string | IconProps;
};
declare const NavbarItem: import("svelte").Component<Props, {}, "">;
type NavbarItem = ReturnType<typeof NavbarItem>;
export default NavbarItem;
