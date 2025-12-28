import { toast } from 'react-toastify';
import React, { Fragment } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { find, get, isEmpty, isString, map } from 'lodash';

import api from '../../api/v1';
import { FaRegEdit, BiTrash, FaEye, IoMdClose, FaRecycle } from "../Icons";

import style from "./style.module.css";

const getActionsConfig = (list, url, setList, isSuperAdmin) => [
    {
        type: "VIEW",
        key: "id",
        path: url + '/view'
    },
    {
        type: "POPUP_VIEW",
        key: "id",
        onClick: (id, key = 'id', callBack = () => { }) => {
            const obj = list.find(i => i[key] === id);
            const { services, ...rest } = obj || {};
            const row = map(services, (service) => ({ ...service, ...rest }));
            callBack(row);
        }
    },
    {
        type: "EDIT",
        key: "id",
        path: url
    },
    {
        type: "RESTORE",
        key: "id",
        onClick: async (id, key) => {
            try {
                const response = await api.patch(`${url}/${id}`, { deleted: 0 });

                if (response.status === 200) {
                    toast.success("Bill Entry restored");
                    setList(prevList => prevList.map(item => item[key] === id ? { ...item, deleted: 0 } : item));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    },
    {
        type: "DELETE",
        key: "id",
        onClick: async (id, key) => {
            try {
                const response = await api.patch(`${url}/${id}`, { deleted: 1 });
                if (response.status === 200) {
                    toast.info("Bill Entry deleted");
                    setList(prevList => prevList.map(item => item[key] === id ? { ...item, deleted: 1 } : item));
                }
            } catch (error) {
                console.log(error);
                toast.error(get(error, 'response.data.message', error.message));
            }
        }
    },
    {
        type: "TRASH",
        key: "id",
        hasPermission: isSuperAdmin,
        onClick: async (id, key) => {
            try {
                const response = await api.delete(`${url}/${id}`);
                if (response.status === 200) {
                    toast.info("Bill Entry permanently deleted");
                    setList(prevList => prevList.filter(item => item[key] !== id));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }
];

export const ActionButtons = ({ row = [], actions = [], list, setList, url, fullRowLink }) => {
    const { isSuperAdmin } = useOutletContext();

    const updatedAction = map(actions, (action) => {
        if (isString(action) === true) {
            return find(getActionsConfig(list, url, setList, isSuperAdmin), { type: action });
        }
        const config = find(getActionsConfig(list, url, setList, isSuperAdmin), { type: get(action, 'type') });
        return { ...config, ...action };
    })

    return (
        <>
            {
                fullRowLink && (
                    <Link className={style.fullRowLink} to={`${get(fullRowLink, 'url', url)}/${get(row, get(fullRowLink, 'key', 'id'))}`} />
                )
            }
            {
                !isEmpty(updatedAction) && (
                    <td className={`d-flex justify-content-center ${style.actionButtons}`}>
                        {
                            updatedAction.map((ac, idx) => {
                                if (get(ac, 'hasPermission') === false) return null;
                                return (
                                    <Fragment key={idx}>
                                        {
                                            get(ac, "type") === "VIEW" && (
                                                <Link className='btn btn-sm link-primary position-relative ' to={`${get(ac, 'path')}/${get(row, get(ac, 'key', 'id'))}`}>
                                                    <FaEye />
                                                </Link>
                                            )
                                        }
                                        {
                                            get(ac, "type") === "POPUP_VIEW" && (
                                                <button className='btn btn-sm link-primary position-relative ' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')), get(ac, 'key', 'id'), get(ac, 'callback'))}>
                                                    <FaEye />
                                                </button>
                                            )
                                        }
                                        {
                                            get(ac, "type") === "EDIT" && (
                                                <Link className='btn btn-sm link-primary position-relative ' to={`${get(ac, 'path')}/${get(row, get(ac, 'key', 'id'))}`}>
                                                    <FaRegEdit />
                                                </Link>
                                            )
                                        }
                                        {
                                            get(ac, "type") === "DELETE" && get(row, 'deleted') === 0 && (
                                                <button className='btn btn-sm link-danger position-relative ' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')), get(ac, 'key', 'id'))}>
                                                    <BiTrash />
                                                </button>
                                            )
                                        }
                                        {
                                            get(ac, "type") === "RESTORE" && get(row, 'deleted') === 1 && (
                                                <button className='btn btn-sm link-success position-relative ' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')), get(ac, 'key', 'id'))}>
                                                    <FaRecycle />
                                                </button>
                                            )
                                        }
                                        {
                                            get(ac, "type") === "TRASH" && get(row, 'deleted') === 1 && (
                                                <button className='btn btn-sm link-danger position-relative ' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')), get(ac, 'key', 'id'))}>
                                                    <IoMdClose />
                                                </button>
                                            )
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </td>
                )
            }
        </>
    )
}
