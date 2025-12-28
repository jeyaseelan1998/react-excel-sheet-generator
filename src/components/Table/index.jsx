import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { flattenDepth, get, isEmpty, map } from 'lodash';

import { ActionButtons } from './ActionButtons';
import { renderValue } from './CellValue';
import { downloadExcel } from '../../utils/excel';
import { RiFileExcel2Line, RiMenuAddFill } from "../Icons";
import Text from '../Text';
import api from '../../api/v1';
import Spinner from '../Spinner';

const Table = ({ rows = [], columns = [], url, actions, tableClass, thClass, xlsxExport = false, createBtn = false, fullRowLink }) => {
    const [list, setList] = useState(rows);
    const [fetching, setFetching] = useState(false);
    const [exporting, setExporting] = useState(false);
    const exportingList = useRef([]);

    const getList = async () => {
        setFetching(true);
        try {
            const response = await api.get(url + "?order=date_desc");
            setList(get(response, "data.list"));
        } catch (error) {
            toast.error(get(error, "message"));
        }
        setFetching(false);
    }

    useEffect(() => {
        if (rows.length === 0)
            getList();
    }, [])

    const exportXLSX = async () => {
        setExporting(true);
        try {
            // const response = await api.get(url + "?order=date_desc&deleted=0&limit=0&offset=0");
            // const list = get(response, "data.list", []);

            const updatedList = map(list, (item) => {
                const { services, ...rest } = item;
                return map(services, (service) => ({ ...service, ...rest }))
            })
            const rows = flattenDepth(updatedList, 1);
            await downloadExcel({ columns: get(xlsxExport, 'columns', []), rows });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        setExporting(false);
        exportingList.current = [];
    }

    return (
        <div className={`text-center position-relative${(xlsxExport || createBtn) ? ' py-5 mt-3' : ''}`}>
            {
                xlsxExport !== false && (
                    <button onClick={exportXLSX} className='btn btn-success position-absolute top-0 right-5 d-flex align-items-center' disabled={exporting}>
                        {
                            exporting && (
                                <Spinner />
                            )
                        }
                        {
                            !exporting && (
                                <>
                                    <span className='pe-2'>Export</span>
                                    <RiFileExcel2Line />
                                </>
                            )
                        }
                    </button>
                )
            }
            {
                createBtn && (
                    <Link to='/bill-entry/create' className='btn btn-info position-absolute top-0 end-0 d-flex align-items-center'>
                        <span className='pe-2'>Create</span>
                        <RiMenuAddFill />
                    </Link>
                )
            }
            {
                fetching === true && (
                    <div className='d-flex justify-content-center pt-5'>
                        <Spinner />
                    </div>
                )
            }
            {
                fetching === false && list.length === 0 && (
                    <Text className="h5 pt-3">No records found</Text>
                )
            }
            {
                fetching === false && list.length > 0 && (
                    <div className='overflow-auto'>
                        <table className={tableClass ? tableClass : "table table-striped  text-center bg-light"}>
                            <thead className={thClass ? thClass : 'table-dark'}>
                                <tr className='text-nowrap'>
                                    {
                                        map(columns, (col) => (
                                            <th key={col.key} scope="col">{col.header}</th>
                                        ))
                                    }
                                    {
                                        !isEmpty(actions) && (
                                            <th scope="col">ACTIONS</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    map(list, (row, index) => {
                                        return (
                                            <tr key={index} className={`position-relative ${get(row, 'deleted') === 1 ? 'opacity-50' : ''}`}>
                                                {
                                                    map(columns, (col, idx) => {
                                                        return (
                                                            <td key={idx} className='text-nowrap'>{renderValue(col, row)}</td>
                                                        )
                                                    })
                                                }
                                                <ActionButtons row={row} actions={actions} list={list} setList={setList} url={url} fullRowLink={fullRowLink} />
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default Table;