import React from 'react';
import { get, map } from 'lodash';
import { dateFormat } from './format';

import { FaRegEdit, BiTrash } from "../Icons";
import { Link } from 'react-router-dom';

const Table = ({ rows = [], columns = [], actions }) => {
    return (
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

                                <td className='position-relative'>
                                    {
                                        actions && actions.map((ac, idx) => {
                                            return (
                                                <>
                                                    {
                                                        get(ac, "type") === "edit" && (
                                                            <Link key={idx} className='btn btn-sm' to={`${get(ac, 'path')}/${get(row, get(ac, 'key', 'id'))}`}>
                                                                <FaRegEdit />
                                                            </Link>
                                                        )
                                                    }
                                                    {
                                                        get(ac, "type") === "trash" && (
                                                            <button key={idx} className='btn btn-sm' onClick={ac.onClickF}>
                                                                <BiTrash />
                                                            </button>
                                                        )
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;