import type { IconProps } from '../../types.js';
type Props = {
    title: string;
    active?: boolean;
    href: string;
    variant?: 'compact';
    isActive?: () => boolean;
    icon?: string | IconProps;
    activeIcon?: string | IconProps;
};
declare const NavbarItem: import("svelte").Component<Props, {}, "">;
type NavbarItem = ReturnType<typeof NavbarItem>;
export default NavbarItem;
