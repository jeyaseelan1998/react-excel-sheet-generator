import React, { Fragment } from 'react';
import { get, map } from 'lodash';
import { dateFormat } from './format';

import { FaRegEdit, BiTrash, FaEye } from "../Icons";
import { Link } from 'react-router-dom';
import Text from '../Text';

const Table = ({ rows = [], columns = [], actions }) => {
    return (
        <>
            {
                rows && rows.length === 0 && (
                    <Text className="h5 pt-3">No records found</Text>
                )
            }
            {
                rows && rows.length > 0 && (
                    <table className="table table-striped">
                        <thead>
                            <tr className='table-dark text-nowrap'>
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
                                        <tr key={index}>
                                            {
                                                map(columns, (col, idx) => {
                                                    const key = get(col, 'key');
                                                    const def = get(col, 'default');
                                                    const type = get(col, 'type');
                                                    let value = get(row, key, def);

                                                    if (type === "date") {
                                                        value = dateFormat(value);
                                                    }
                                                    if (type === "length") {
                                                        value = (value || []).length;
                                                    }

                                                    return (
                                                        <td key={idx} className='text-nowrap'>{value}</td>
                                                    )
                                                })
                                            }

                                            {
                                                actions && (
                                                <td className='position-relative'>
                                                    {
                                                        actions.map((ac, idx) => {
                                                            return (
                                                                <Fragment key={idx}>
                                                                    {
                                                                        get(ac, "type") === "view" && (
                                                                            <button className='btn btn-sm' onClick={() => ac.onClick(get(row, get(ac, 'key', 'id')))}>
                                                                                <FaEye />
                                                                            </button>
                                                                        )
                                                                    }
                                                                    {
                                                                        get(ac, "type") === "edit" && (
                                                                            <Link className='btn btn-sm' to={`${get(ac, 'path')}/${get(row, get(ac, 'key', 'id'))}`}>
                                                                                <FaRegEdit />
                                                                            </Link>
                                                                        )
                                                                    }
                                                                    {
                                                                        get(ac, "type") === "trash" && (
                                                                            <button className='btn btn-sm' onClick={ac.onClick}>
                                                                                <BiTrash />
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