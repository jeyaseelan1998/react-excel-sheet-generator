import React from 'react';

const Modal = ({
    triggerLabel = "Popup",
    popupDisabled = false,
    title = "Modal title",
    children,
    yesLabel = "Save changes",
    noLabel = "Close",
    onClose = () => { },
    id = "staticBackdrop",  // Must be Unique
}) => {
    return (
        <>
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#${id}`} disabled={popupDisabled}>
                {triggerLabel}
            </button>
            <div className="modal fade" tabIndex="-1" id={id} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{noLabel}</button>
                            {
                                typeof yesLabel === 'string' && (
                                    <button type="button" className="btn btn-primary">{yesLabel}</button>
                                )
                            }
                            {
                                typeof yesLabel !== 'string' && (
                                    yesLabel
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;