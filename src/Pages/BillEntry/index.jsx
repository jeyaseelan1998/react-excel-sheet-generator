import React, { useEffect, useState, Suspense } from 'react';
import MetaTag from '../../components/MetaTag';
import { Center, Spinner } from '../../components';
import api from '../../api/v1';
import { toast } from 'react-toastify';
import { get, map, flattenDepth } from 'lodash';
import Table from '../../components/Table';
import { COLUMNS, PREVIEW_LIST_COLUMNS } from './Helper';
import { RiMenuAddFill, RiFileExcel2Line, RiCloseLine } from "../../components/Icons";
import { Link } from 'react-router-dom';
import { downloadExcel } from '../../utils/excel';
import DialogBox from '../../components/DialogBox';

const BillEntryList = () => {
    const [list, setList] = useState([]);
    const [popup, setPopup] = useState(false);

    const getList = async () => {
        try {
            const response = await api.get("/bill-entry?order=date_desc")
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
                            columns={PREVIEW_LIST_COLUMNS}
                            rows={list}
                            export
                            create
                            actions={[
                                {
                                    type: "view",
                                    key: "bill_no",
                                    onClick: (bill_no) => {
                                        const row = list.find(i => i.bill_no === bill_no);
                                        const { services, ...rest } = row;
                                        const rows = map(services, (service) => ({ ...service, ...rest }));
                                        setPopup(rows);
                                    }
                                },
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
                        {
                            popup !== false && (
                                <Suspense fallback={<Spinner />}>
                                    <DialogBox type="fullscreen" onClose={() => setPopup(false)}
                                        content={(onCloseHandler) => {

                                            return (
                                                <div className='d-flex h-100 flex-column'>
                                                    <button className='btn btn-sm btn-light align-self-end mb-2' onClick={onCloseHandler}>
                                                        <RiCloseLine />
                                                    </button>
                                                    <div className='overflow-auto'>
                                                        <Table
                                                            rows={popup}
                                                            columns={COLUMNS}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    />
                                </Suspense>
                            )
                        }
                    </div>
                </div>
            </Center>
        </>
    )
}

export default BillEntryList;