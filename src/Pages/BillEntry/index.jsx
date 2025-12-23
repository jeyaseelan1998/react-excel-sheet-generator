import React, { useEffect, useState } from 'react';
import MetaTag from '../../components/MetaTag';
import { Center } from '../../components';
import HeaderSpacer from '../../Layout/Header/HeaderSpacer';
import api from '../../api/v1';
import { toast } from 'react-toastify';
import { get, map, flattenDepth } from 'lodash';
import Table from '../../components/Table';
import { COLUMNS, LIST_COLUMNS } from './Helper';
import { RiMenuAddFill, RiFileExcel2Line } from "../../components/Icons";
import { Link } from 'react-router-dom';
import { downloadExcel } from '../../utils/excel';

const BillEntryList = () => {
    const [list, setList] = useState([]);

    const getList = async () => {
        try {
            const response = await api.get("/bill-entry")
            setList(get(response, "data.list"));
        } catch (error) {
            toast.error(get(error, "message"));
        }
    }

    useEffect(() => {
        getList();
    }, [])

    const exportExsx = async () => {
        try {
            const updatedList = map(list, (item) => {
                const { services, ...rest } = item;
                return map(services, (service) => ({ ...service, ...rest }))
            })
            const rows = flattenDepth(updatedList, 1);
            downloadExcel({ columns: COLUMNS, rows });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MetaTag title="" />
            <HeaderSpacer />
            <Center>
                <div className='py-5 mt-2 text-center position-relative'>
                    <button onClick={exportExsx} className='btn btn-success position-absolute top-0 right-5 d-flex align-items-center'>
                        <span className='pe-2'>Export</span>
                        <RiFileExcel2Line />
                    </button>
                    <Link to='/bill-entry/create' className='btn btn-info position-absolute top-0 end-0 d-flex align-items-center'>
                        <span className='pe-2'>Create</span>
                        <RiMenuAddFill />
                    </Link>
                    <div className='overflow-auto'>
                        <Table
                            columns={LIST_COLUMNS}
                            rows={list}
                            export
                            create
                            actions={[
                                {
                                    type: "edit",
                                    key: "bill_no",
                                    path: "/bill-entry"
                                },
                                // {
                                //     type: "trash",
                                //     onClick: () => { }
                                // }
                            ]}
                        />
                    </div>
                </div>
            </Center>
        </>
    )
}

export default BillEntryList;