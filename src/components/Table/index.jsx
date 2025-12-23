import React from 'react';
import { get, map } from 'lodash';

const Table = ({ rows = [], columns = [] }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr className='table-dark text-nowrap'>
                    {
                        map(columns, (col) => (
                            <th key={col.key} scope="col">{col.header}</th>
                        ))
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
                                        const value = get(row, key, def);
                                        return (
                                            <td key={idx} className='text-nowrap'>{value}</td>
                                        )
                                    })
                                }

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;