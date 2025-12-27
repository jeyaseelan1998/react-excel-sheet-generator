import { toast } from 'react-toastify';
import { Link, useOutletContext } from 'react-router-dom';
import { get, map, flattenDepth } from 'lodash';
import React, { useEffect, useState, Suspense } from 'react';

import { downloadExcel } from '../../utils/excel';
import { Center, Spinner } from '../../components';
import { COLUMNS, PREVIEW_LIST_COLUMNS } from './Helper';
import { RiMenuAddFill, RiFileExcel2Line } from "../../components/Icons";
import api from '../../api/v1';
import Table from '../../components/Table';
import MetaTag from '../../components/MetaTag';
import DialogBox from '../../components/DialogBox';

const BillEntryList = () => {
    const [list, setList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [popup, setPopup] = useState(false);
    const { isSuperAdmin } = useOutletContext();

    const getList = async () => {
        setFetching(true);
        try {
            const response = await api.get("/bill-entry?order=date_desc")
            setList(get(response, "data.list"));
        } catch (error) {
            toast.error(get(error, "message"));
        }
        setFetching(false);
    }

    useEffect(() => {
        getList();
    }, [])

    const exportXLSX = async () => {
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
            <MetaTag title="Bill Entry" />
            <Center>
                <div className='py-5 mt-2 text-center position-relative'>
                    <button onClick={exportXLSX} className='btn btn-success position-absolute top-0 right-5 d-flex align-items-center'>
                        <span className='pe-2'>Export</span>
                        <RiFileExcel2Line />
                    </button>
                    <Link to='/bill-entry/create' className='btn btn-info position-absolute top-0 end-0 d-flex align-items-center'>
                        <span className='pe-2'>Create</span>
                        <RiMenuAddFill />
                    </Link>
                    {
                        fetching === true && (
                            <div className='d-flex justify-content-center pt-5'>
                                <Spinner />
                            </div>
                        )
                    }
                    {
                        fetching === false && (
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
                                        {
                                            type: "restore",
                                            key: "bill_no",
                                            onClick: async (bill_no) => {
                                                try {
                                                    const response = await api.patch(`/bill-entry/${bill_no}`, { deleted: 0 });
                                                    if (response.status === 200) {
                                                        toast.info("Bill Entry restored");
                                                        setList(prevList => prevList.map(item => item.bill_no === bill_no ? { ...item, deleted: 0 } : item));
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                    toast.error(error.message);
                                                }
                                            }
                                        },
                                        {
                                            type: "delete",
                                            key: "bill_no",
                                            onClick: async (bill_no) => {
                                                try {
                                                    const response = await api.patch(`/bill-entry/${bill_no}`, { deleted: 1 });
                                                    if (response.status === 200) {
                                                        toast.info("Bill Entry deleted");
                                                        setList(prevList => prevList.map(item => item.bill_no === bill_no ? { ...item, deleted: 1 } : item));
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                    toast.error(error.message);
                                                }
                                            }
                                        },
                                        {
                                            type: "trash",
                                            key: "bill_no",
                                            hasPermission: isSuperAdmin,
                                            onClick: async (bill_no) => {
                                                try {
                                                    const response = await api.delete(`/bill-entry/${bill_no}`);
                                                    if (response.status === 200) {
                                                        toast.info("Bill Entry permanently deleted");
                                                        setList(prevList => prevList.filter(item => item.bill_no !== bill_no));
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                    toast.error(error.message);
                                                }
                                            }
                                        }
                                    ]}
                                />
                                {
                                    popup !== false && (
                                        <Suspense fallback={<Spinner />}>
                                            <DialogBox type="fullscreen" onClose={() => setPopup(false)}
                                                content={() => {
                                                    return (
                                                        <div className='overflow-auto text-center'>
                                                            <Table
                                                                // tableClass="table table-bordered border-primary"
                                                                // thClass="table-light table-bordered border-primary"
                                                                rows={popup}
                                                                columns={COLUMNS}
                                                            />
                                                        </div>
                                                    )
                                                }}
                                            />
                                        </Suspense>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </Center>
        </>
    )
}

export default BillEntryList;