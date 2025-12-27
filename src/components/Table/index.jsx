import { get, map } from 'lodash';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderValue } from './CellValue';
import { FaRegEdit, BiTrash, FaEye, IoMdClose, FaRecycle } from "../Icons";
import Text from '../Text';

const Table = ({ rows = [], columns = [], actions, tableClass, thClass }) => {
    return (
        <>
            {
                rows && rows.length === 0 && (
                    <Text className="h5 pt-3">No records found</Text>
                )
            }
            {
                rows && rows.length > 0 && (
                    <table className={tableClass ? tableClass : "table table-striped  text-center"}>
                        <thead className={thClass ? thClass : 'table-dark'}>
                            <tr className='text-nowrap'>
                                {
                                    map(columns, (col) => (
                                        <th key={col.key} scope="col">{col.header}</th>
                                    ))
                                }
                                {
                                    actions && (
                                        <th scope="col">ACTIONS</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                map(rows, (row, index) => {
                                    return (
                                        <tr key={index} className={get(row, 'deleted') === 1 ? 'opacity-50' : ''}>
                                            {
                                                map(columns, (col, idx) => {
                                                    return (
                                                        <td key={idx} className='text-nowrap'>{renderValue(col, row)}</td>
                                                    )
                                                })
                                            }

                                            {
                                                actions && (
                                                    <td className='position-relative d-flex justify-content-center'>
                                                        {
                                                            actions.map((ac, idx) => {
                                                                if (get(ac, 'hasPermission') === false) return null;
                                                                return (
                                                                    <Fragment key={idx}>
                                                                        {
                                                                            get(ac, "type") === "view" && (
                                                                                <button className='btn btn-sm link-primary' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')))}>
                                                                                    <FaEye />
                                                                                </button>
                                                                            )
                                                                        }
                                                                        {
                                                                            get(ac, "type") === "edit" && (
                                                                                <Link className='btn btn-sm link-primary' to={`${get(ac, 'path')}/${get(row, get(ac, 'key', 'id'))}`}>
                                                                                    <FaRegEdit />
                                                                                </Link>
                                                                            )
                                                                        }
                                                                        {
                                                                            get(ac, "type") === "delete" && get(row, 'deleted') === 0 && (
                                                                                <button className='btn btn-sm link-danger' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')))}>
                                                                                    <BiTrash />
                                                                                </button>
                                                                            )
                                                                        }
                                                                        {
                                                                            get(ac, "type") === "restore" && get(row, 'deleted') === 1 && (
                                                                                <button className='btn btn-sm link-success' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')))}>
                                                                                    <FaRecycle />
                                                                                </button>
                                                                            )
                                                                        }
                                                                        {
                                                                            get(ac, "type") === "trash" && get(row, 'deleted') === 1 && (
                                                                                <button className='btn btn-sm link-danger' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')))}>
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
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default Table;