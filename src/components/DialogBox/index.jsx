import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery-slim';
import ModalBase from './ModalBase';
import { RiCloseLine } from "../Icons";
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
                    <div className='d-flex h-100 w-100 flex-column overflow-hidden position-relative'>
                        {
                            onClose && (
                                <button className='btn btn-sm btn-light align-self-end mb-2' onClick={onCloseHandler}>
                                    <RiCloseLine />
                                </button>
                            )
                        }
                        {content && <>{content(onCloseHandler)}</>}
                        {children && <>{children}</>}
                    </div>
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
                        <div className={style.dialogFooter}>{buttons(onCloseHandler)}</div>
                    </div>
                </div>
            </ModalBase>
        </>
    )
}