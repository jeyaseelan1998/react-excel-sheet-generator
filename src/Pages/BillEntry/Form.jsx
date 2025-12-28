import { get, map } from 'lodash';
import { toast } from 'react-toastify';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import Select from 'react-select';
import arrayMutators from 'final-form-arrays';

import { Center, Spinner, Text } from '../../components';
import { isNumberOnly, required } from '../../utils/validate';
import { categoryOptions, COLUMNS } from './Helper';
import api from '../../api/v1';
import Table from '../../components/Table';
import MetaTag from '../../components/MetaTag';
import DialogBox from '../../components/DialogBox';
import Repeater from '../../components/Fields/Repeater';
import DatePickerField from '../../components/Fields/DatePicker';

const ServiceItem = ({ values, name, form }) => {
    const category = get(values, `${name}.category`);

    useEffect(() => {
        if (category === 'CONTRACT') {
            form.change(`${name}.amount`, '');
        } else {
            form.change(`${name}.amc`, '');
        }
    }, [category])

    return (
        <div className='row'>
            <div className="mb-3">
                <label htmlFor={`${name}billEntryDescription`} className="form-label">Description</label>
                <Field name={`${name}.description`} component="input" type='text' className="form-control" id={`${name}billEntryDescription`} />
            </div>
            <div className="mb-3">
                <Field name={`${name}.category`} validate={required}>
                    {({ input, meta }) => (
                        <>
                            <label className="form-label">Category*</label>
                            <Select
                                required
                                name={input.name}
                                options={categoryOptions}
                                value={categoryOptions.find(i => i.value === get(values, `${name}.category`))}
                                onChange={obj => input.onChange(obj.value)}
                            />
                            {meta.touched && meta.error && <span className='text-danger'>{meta.error}</span>}
                        </>
                    )}
                </Field>
            </div>
            <div className="mb-3">
                <label htmlFor={`${name}billEntryQty`} className="form-label">Quantity*</label>
                <Field name={`${name}.qty`} component="input" className="form-control" id={`${name}billEntryQty`} validate={isNumberOnly} required />
            </div>
            {
                category !== 'CONTRACT' && (
                    <div className="mb-3">
                        <label htmlFor={`${name}billEntryAmount`} className="form-label">Amount* <span className='small align-middle'>(in rupees)</span></label>
                        <Field name={`${name}.amount`} component="input" type='text' className="form-control" id={`${name}billEntryAmount`} validate={isNumberOnly} required />
                    </div>
                )
            }
            {
                category === 'CONTRACT' && (
                    <div className="mb-3">
                        <label htmlFor={`billEntryAmc`} className="form-label">AMC* <span className='small align-middle'>(in rupees)</span></label>
                        <Field name={`${name}.amc`} component="input" type='text' className="form-control" id={`billEntryAmc`} validate={isNumberOnly} required />
                    </div>
                )
            }
        </div>
    )
}

const BillEntryForm = () => {
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(false);
    const [popup, setPopup] = useState(false);
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        "services": [{}],
        "date": new Date().toISOString()
    })

    const onSubmit = async (data) => {
        setFetching(true);
        try {
            let response;
            if (id) {
                response = await api.patch(`/bill-entry/${id}`, data);
            } else {
                response = await api.post("/bill-entry", data);
            }
            const status = response.status;
            if (status === 200) {
                toast.success("Bill Entry created");
                navigate("/bill-entry");
            }
        } catch (error) {
            toast.error(get(error, 'response.data.message') || error.message);
        }
        setFetching(false);
    }

    const getBillEntry = async () => {
        try {
            const response = await api.get(`/bill-entry?bill_no=${id}`);
            setInitialValues(get(response, "data.list.0"));
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (id) {
            getBillEntry();
        }
    }, [id]);

    return (
        <>
            <MetaTag title={`${id ? 'Update' : 'Create'} Bill Entry`} />
            <Center>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    initialValues={initialValues}
                    render={({ handleSubmit, values, valid, form }) => {

                        const onHandlePreview = () => {
                            const { services, ...rest } = values;
                            const rows = map(services, (service) => ({ ...service, ...rest }));
                            setPopup(rows);
                        }

                        return (
                            <form onSubmit={handleSubmit} className='row py-5 px-3 px-sm-0 needs-validation'>
                                <Text className="d-inline pe-3 m-0 fst-italic text-danger mb-3">*Make sure to fill Mandatory fields</Text>
                                <div className="mb-5 col-12 d-flex align-items-center justify-content-end">
                                    <Text className="d-inline pe-3 m-0 fw-bold">Bill Entry Date*</Text>
                                    <Field name="date" component={DatePickerField} className="form-control" validate={required} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryEngineerName" className="form-label">Engineer Name*</label>
                                    <Field name="engineer_name" component="input" type='text' className="form-control" id="billEntryEngineerName" validate={required} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryBillNo" className="form-label">Bill No.*</label>
                                    <Field name="bill_no" component="input" type='text' className="form-control" id="billEntryBillNo" disabled={id} validate={isNumberOnly} required />
                                </div>
                                <div className='mb-3 pt-3 border rounded border-success'>
                                    <Repeater
                                        values={values}
                                        form={form}
                                        title="Service List"
                                        render={({ values, name, form }) => {
                                            return (
                                                <ServiceItem values={values} name={name} form={form} />
                                            )
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryCustomerName" className="form-label">Customer Name*</label>
                                    <Field name="customer_name" component="input" type='text' className="form-control" id="billEntryCustomerName" validate={required} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryPhoneNumber" className="form-label">Phone Number*</label>
                                    <Field name="phone_number" component="input" type='text' className="form-control" id="billEntryPhoneNumber" validate={isNumberOnly} required />
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="billEntryCallType" className="form-label">Call Type</label>
                                    <Field name="call_type" component="input" type='text' className="form-control" id="billEntryCallType" />
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="billEntryNotes" className="form-label">Notes</label>
                                    <Field name="notes" component="textarea" className="form-control" id="billEntryNotes" />
                                </div>
                                <div className='text-center mt-3'>
                                    <button type='button' className="btn btn-info px-3" disabled={!valid} onClick={onHandlePreview}>
                                        Preview
                                    </button>
                                </div>
                                {
                                    popup && (
                                        <Suspense fallback={<Spinner />}>
                                            <DialogBox
                                                dialogClass="big"
                                                title="Preview"
                                                onClose={() => setPopup(false)}
                                                content={() => {
                                                    return (
                                                        <div className='d-flex h-100 flex-column'>
                                                            <div className='overflow-auto'>
                                                                <Table
                                                                    rows={popup}
                                                                    columns={COLUMNS}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                }}

                                                buttons={(onCloseHandler) => {
                                                    return (
                                                        <>
                                                            <button type="button" className="btn btn-secondary me-3" onClick={onCloseHandler}>Close</button>
                                                            {
                                                                !fetching && (
                                                                    <button type='button' className="btn btn-info w-25" disabled={!valid} onClick={handleSubmit}>
                                                                        Submit
                                                                    </button>
                                                                )
                                                            }
                                                            {
                                                                fetching && (
                                                                    <div className="btn btn-info opacity-50 w-25 d-flex justify-content-center">
                                                                        <Spinner />
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }}
                                            />
                                        </Suspense>
                                    )
                                }
                            </form>
                        )
                    }}
                />
            </Center>
        </>
    )
}

export default BillEntryForm;