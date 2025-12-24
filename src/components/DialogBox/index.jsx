import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery-slim';
import ModalBase from './ModalBase';
import style from './style.module.css';

export default function DialogBox(props) {
    const ref = useRef(null);
    const { title, content, buttons, children, type, className = "", onClose = () => { }, mediaDialog = '', dialogClass = '' } = props;
    const [openClass, setOpenClass] = useState("");
    const [closeClass, setcloseClass] = useState("");

    const keyUp = (e) => {
        if (e.key === "Escape") {
            onCloseHandler();
        }
    }

    const onCloseHandler = () => {
        setcloseClass(" " + style.dialogRemove);
        setTimeout(() => {
            onClose();
        }, 650)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenClass(" " + style.dialogOpen)
        }, 50)
        $(document).on('keyup', keyUp);
        return () => {
            clearTimeout(timer);
            $(document).off('keyup', keyUp);
        }
    }, [])

    if (type === "fullscreen") {
        return (
            <ModalBase>
                <div className={`${mediaDialog ? `${mediaDialog}` : `${style.dialogBoxOverlay} ${style.fullScreen}${className ? " " + className : ""}${openClass}${closeClass}`} `}>
                    {content && <>{content(onCloseHandler)}</>}
                    {children && <>{children}</>}
                </div>
            </ModalBase>
        )
    }

    return (
        <>
            <ModalBase>
                <div ref={ref} className={`${mediaDialog ? `${mediaDialog}` : `${style.dialogBoxOverlay}${className ? " " + className : ""}${style[dialogClass] ? " " + style[dialogClass] : ""}${openClass}${closeClass}`}`}>
                    <div className={style.dialogBox}>
                        <div className={style.dialogHeader}>
                            <h5 className={style.dialogTitle}>{title}</h5>
                            {
                                onClose && <button className={`btn btn-sm ${style.dialogClose}`} onClick={onCloseHandler}>&#215;</button>
                            }
                        </div>
                        {content && <div className={style.dialogContent}>{content(onCloseHandler)}</div>}
                        {children && <div className={style.dialogContent}>{children}</div>}
                        <div className={style.dialogFooter}>{buttons}</div>
                    </div>
                </div>
            </ModalBase>
        </>
    )
}