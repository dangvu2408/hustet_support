import React, {useState, useEffect} from "react";
import './CourseDialog.css';

function CourseDialog({show, onClose, title, children}) {
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            // Cho dialog vào DOM trước đã
            setTimeout(() => setActive(true), 10); // delay nhẹ để browser render lần đầu
        } else {
            setActive(false);
            const timer = setTimeout(() => setIsVisible(false), 200); // chờ animation tắt
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!isVisible) return null;

    return (
        <div className={`custom-dialog-overlay ${active ? "show" : ""}`} onClick={onClose}>
            <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal_header">
                    <div className="modal_title">
                        <div className="ection_head_modal">
                            <button type="button" className="close_dialog_btn" onClick={onClose}>
                                <span class="ant-btn-icon">
                                    <span role="img" aria-label="close" class="anticon anticon-close">
                                        <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </button>
                            <h2>{title}</h2>
                        </div>
                    </div>
                </div>
                
                <div className="dialog_content">
                    {children}
                </div>
                
            </div>
        </div>
    );
}

export default CourseDialog;