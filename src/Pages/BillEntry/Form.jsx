import { get, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BiTrash } from "../../components/Icons";
import { Center, Spinner, Text } from '../../components';
import { required } from '../../utils/validate';
import MetaTag from '../../components/MetaTag';
import Table from '../../components/Table';
import BSModal from '../../components/BSModal';
import { categoryOptions, COLUMNS } from './Helper';
import HeaderSpacer from '../../Layout/Header/HeaderSpacer';
import DatePickerField from '../../components/Fields/DatePicker';

import style from "./style.module.css";
import api from '../../api/v1';

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
                            <label className="form-label">Category</label>
                            <Select
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
                <label htmlFor={`${name}billEntryQty`} className="form-label">QTY</label>
                <Field name={`${name}.qty`} component="input" type='number' className="form-control" id={`${name}billEntryQty`} />
            </div>
            {
                category !== 'CONTRACT' && (
                    <div className="mb-3">
                        <label htmlFor={`${name}billEntryAmount`} className="form-label">Amount <span className='small align-middle'>(in rupees)</span></label>
                        <Field name={`${name}.amount`} component="input" type='text' className="form-control" id={`${name}billEntryAmount`} />
                    </div>
                )
            }
            {
                category === 'CONTRACT' && (
                    <div className="mb-3">
                        <label htmlFor={`billEntryAmc`} className="form-label">AMC <span className='small align-middle'>(in rupees)</span></label>
                        <Field name={`${name}.amc`} component="input" type='text' className="form-control" id={`billEntryAmc`} />
                    </div>
                )
            }
        </div>
    )
}

const Repeater = ({ values, fields, form }) => {
    return (
        <div className='mb-3'>
            <Text className='fw-bold'>Service List</Text>
            {
                fields.map((name, index) => {
                    return (
                        <div key={index} className='p-3 border border-2 my-3 rounded position-relative'>
                            <ServiceItem values={values} name={name} form={form} />
                            {
                                index !== 0 && (
                                    <button type='button' className={`btn btn-sm btn-danger ${style.delete}`} onClick={() => fields.remove(index)}>
                                        <BiTrash />
                                    </button>
                                )
                            }
                        </div>
                    )
                })
            }
            <button type='button' className='btn btn-warning' onClick={() => fields.push({})}>Add more</button>
        </div>
    )
}

const BillEntryForm = () => {
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(false);

    const onSubmit = async (data) => {
        setFetching(true);
        try {
            const response = await api.post("/bill-entry", data);
            const status = response.status;
            if (status === 200) {
                toast.success("Bill Entry created");
                navigate("/bill-entry");
                window.location.href = '/bill-entry';
            }
        } catch (error) {
            toast.error(get(error, 'response.data.message') || error.message);
        }
        setFetching(false);
    }

    return (
        <>
            <MetaTag title="Create Bill Entry" />
            <HeaderSpacer />
            <Center>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    initialValues={{
                        "services": [
                            {
                                "description": "Test 1",
                                "category": "CONTRACT",
                                "qty": "1",
                                "amc": "123"
                            },
                            {
                                "description": "test 2",
                                "category": "SPARE",
                                "qty": "2",
                                "amount": "500"
                            }
                        ],
                        "engineer_name": "Jeyaseelan",
                        "bill_no": "1526",
                        "customer_name": "Kavi",
                        "phone_number": "9392839283",
                        "call_type": "Arun sir",
                        "notes": "Test",
                        "date": new Date().toISOString()
                    }}
                    render={({ handleSubmit, values, valid, form }) => {
                        const { services, ...rest } = values;
                        const rows = map(services, (service) => ({ ...service, ...rest }));

                        return (
                            <form onSubmit={handleSubmit} className='row py-5 px-3 px-sm-0 needs-validation'>
                                <div className="mb-5 col-12 d-flex align-items-center justify-content-end">
                                    <Text className="d-inline pe-3 m-0 fw-bold">Bill Entry Date</Text>
                                    <Field name="date" component={DatePickerField} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryEngineerName" className="form-label">Engineer Name</label>
                                    <Field name="engineer_name" component="input" type='text' className="form-control" id="billEntryEngineerName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryBillNo" className="form-label">Bill No.</label>
                                    <Field name="bill_no" component="input" type='text' className="form-control" id="billEntryBillNo" />
                                </div>
                                <div className='mb-3 pt-3 border rounded border-success'>
                                    <FieldArray name="services" >
                                        {
                                            ({ fields }) => (
                                                <Repeater values={values} fields={fields} form={form} />
                                            )
                                        }
                                    </FieldArray>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryCustomerName" className="form-label">Customer Name</label>
                                    <Field name="customer_name" component="input" type='text' className="form-control" id="billEntryCustomerName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billEntryPhoneNumber" className="form-label">Phone Number</label>
                                    <Field name="phone_number" component="input" type='text' className="form-control" id="billEntryPhoneNumber" />
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="billEntryCallType" className="form-label">Call Type</label>
                                    <Field name="call_type" component="input" type='text' className="form-control" id="billEntryCallType" />
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="billEntryNotes" className="form-label">Notes</label>
                                    <Field name="notes" component="textarea" className="form-control" id="billEntryNotes" />
                                </div>
                                <div className='col-12 text-center'>
                                    <div className='mt-3'>
                                        <BSModal
                                            title='Preview'
                                            popupDisabled={valid === false}
                                            triggerLabel='Preview'
                                            yesLabel={
                                                <>
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
                                            }
                                            size="xl"
                                        >
                                            {
                                                valid === true && (
                                                    <Table
                                                        rows={rows}
                                                        columns={COLUMNS}
                                                    />
                                                )
                                            }
                                        </BSModal>
                                    </div>
                                </div>
                            </form>
                        )
                    }}
                />
            </Center>
        </>
    )
}

export default BillEntryForm;