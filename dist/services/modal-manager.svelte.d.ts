import { type Component, type ComponentProps } from 'svelte';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal.svelte';
type OnCloseData<T> = T extends {
    onClose: (data?: infer R) => void;
} ? R | undefined : T extends {
    onClose: (data: infer R) => void;
} ? R : never;
type ExtendsEmptyObject<T> = keyof T extends never ? never : T;
type StripValueIfOptional<T> = T extends undefined ? undefined : T;
type OptionalParamIfEmpty<T> = ExtendsEmptyObject<T> extends never ? [] | [Record<string, never> | undefined] : [T];
declare class ModalManager {
    #private;
    get openCount(): number;
    show<T extends object>(Component: Component<T>, ...props: OptionalParamIfEmpty<Omit<T, 'onClose'>>): Promise<StripValueIfOptional<OnCloseData<T>>>;
    open<T extends object, K = OnCloseData<T>>(Component: Component<T>, ...props: OptionalParamIfEmpty<Omit<T, 'onClose'>>): {
        onClose: Promise<StripValueIfOptional<K>>;
        close: (args_0: StripValueIfOptional<K>) => Promise<void>;
    };
    showDialog(options: Omit<ComponentProps<typeof ConfirmModal>, 'onClose'>): Promise<boolean>;
}
export declare const modalManager: ModalManager;
export {};
