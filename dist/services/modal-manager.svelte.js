import { mount, unmount } from 'svelte';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal.svelte';
class ModalManager {
    #openCount = $state(0);
    get openCount() {
        return this.#openCount;
    }
    show(Component, ...props) {
        return this.open(Component, ...props).onClose;
    }
    open(Component, ...props) {
        let modal = {};
        let onClose;
        const deferred = new Promise((resolve) => {
            onClose = async (...args) => {
                await unmount(modal);
                this.#openCount--;
                // make sure bits-ui clean up finishes before resolving
                setTimeout(() => resolve(args?.[0]), 10);
            };
            modal = mount(Component, {
                target: document.body,
                props: {
                    ...(props?.[0] ?? {}),
                    onClose,
                },
            });
            this.#openCount++;
        });
        return {
            onClose: deferred,
            close: (...args) => onClose(args[0]),
        };
    }
    showDialog(options) {
        return this.show(ConfirmModal, options);
    }
}
export const modalManager = new ModalManager();
