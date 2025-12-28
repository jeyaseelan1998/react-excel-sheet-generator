import { Link } from 'react-router-dom';
import React, { useState, Suspense } from 'react';

import { Center, Spinner } from '../../components';
import { COLUMNS, PREVIEW_LIST_COLUMNS } from './Helper';
import Table from '../../components/Table';
import MetaTag from '../../components/MetaTag';
import DialogBox from '../../components/DialogBox';

const BillEntryList = () => {
    const [popup, setPopup] = useState(false);

    return (
        <>
            <MetaTag title="Bill Entry" />
            <Center>
                <Table
                    columns={PREVIEW_LIST_COLUMNS}
                    xlsxExport={{ columns: COLUMNS }}
                    createBtn
                    url='/bill-entry'
                    fullRowLink={{
                        url: '/bill-entry',
                        key: 'bill_no'
                    }}
                    actions={[
                        // {
                        //     type: "VIEW",
                        //     key: "bill_no",
                        // },
                        {
                            type: "POPUP_VIEW",
                            key: "bill_no",
                            callback: (bill) => {
                                setPopup(bill);
                            }
                        },
                        {
                            type: "EDIT",
                            key: "bill_no",
                        },
                        {
                            type: "RESTORE",
                            key: "bill_no",
                        },
                        {
                            type: "DELETE",
                            key: "bill_no",
                        },
                        {
                            type: "TRASH",
                            key: "bill_no",
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
            </Center>
        </>
    )
}

export default BillEntryList;