import { useState } from "react";

// components/AlertOverlay.tsx
interface WinnerOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

function WinnerOverlay({ isOpen, onClose }: WinnerOverlayProps) {
    const [open, setOpen] = useState(isOpen);

    function closeAction() {
        setOpen(false);
        onClose();
    }

    return (
        <>
            { open ? <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">System Alert</h3>
                        <p className="mb-6">Important notification: Action required!</p>
                        <button 
                            onClick={closeAction}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Acknowledge
                        </button>
                    </div>
                </div>
            </div> : null}
        </>
    );
}

export default WinnerOverlay;