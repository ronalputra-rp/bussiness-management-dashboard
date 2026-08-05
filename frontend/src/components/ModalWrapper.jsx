import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useModalBlur } from "../App";

/**
 * Wrap any modal content with this component.
 * - Renders the modal via portal to <body> so it stays sharp while the app blurs.
 * - Registers itself with ModalBlurContext so App can blur the whole layout.
 * - Fixes tall modals being cut off at the top: uses my-auto + overflow-y-auto,
 *   so content is centered when it fits and scrolls from the top when it doesn't.
 * - Closes on backdrop click or Escape key.
 */
function ModalWrapper({ onClose, children, maxWidth = "max-w-sm", contentClassName = "p-6" }) {
    const { open, close } = useModalBlur();

    useEffect(() => {
        open();
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => {
            close();
            window.removeEventListener("keydown", handler);
        };
    }, [open, close, onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex justify-center overflow-y-auto p-4 bg-black/40"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className={`my-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full ${maxWidth} ${contentClassName} animate-[fadeInUp_0.22s_ease_both]`}>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default ModalWrapper;
