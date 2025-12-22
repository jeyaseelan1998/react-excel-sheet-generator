import { get } from 'lodash';
import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import Select from 'react-select';

import { BiTrash } from "../../components/Icons";
import { Center, Text } from '../../components';
import { required } from '../../utils/validate';
import MetaTag from '../../components/MetaTag';

import style from "./style.module.css";

const options = [
    { value: 'SPARE', label: 'SPARE' },
    { value: 'ACC', label: 'ACC' },
    { value: 'IC', label: 'IC' },
    { value: 'GAS CHARGING', label: 'GAS CHARGING' },
    { value: 'CONTRACT', label: 'CONTRACT' }
]

const ServiceItem = ({ values, name }) => {
    return (
        <div className='row'>
            <div className="mb-3 col-6">
                <label htmlFor={`${name}billEntryDescription`} className="form-label">Description</label>
                <Field name={`${name}.description`} component="input" required type='text' className="form-control" id={`${name}billEntryDescription`} />
            </div>
            <div className="mb-3 col-6">
                <Field name={`${name}.category`} validate={required}>
                    {({ input, meta }) => (
                        <>
                            <label className="form-label">Category</label>
                            <Select
                                name={input.name}
                                options={options}
                                value={options.find(i => i.value === get(values, `${name}.category`))}
                                onChange={obj => input.onChange(obj.value)}
                            />
                            {meta.touched && meta.error && <span className='text-danger'>{meta.error}</span>}
                        </>
                    )}
                </Field>
            </div>
            <div className="mb-3 col-6">
                <label htmlFor={`${name}billEntryQty`} className="form-label">QTY</label>
                <Field name={`${name}.qdt`} component="input" required type='number' className="form-control" id={`${name}billEntryQty`} />
            </div>
            {
                get(values, `${name}.category`) !== 'CONTRACT' && (
                    <div className="mb-3 col-6">
                        <label htmlFor={`${name}billEntryAmount`} className="form-label">Amount</label>
                        <Field name={`${name}.amount`} component="input" required type='text' className="form-control" id={`${name}billEntryAmount`} />
                    </div>
                )
            }
            {
                get(values, `${name}.category`) === 'CONTRACT' && (
                    <div className="mb-3 col-6">
                        <label htmlFor={`billEntryAmc`} className="form-label">AMC</label>
                        <Field name={`${name}.amc`} component="input" required type='text' className="form-control" id={`billEntryAmc`} />
                    </div>
                )
            }
        </div>
    )
}

const Repeater = ({ values, fields }) => {
    return (

        <div className='mb-3'>
            <Text className='bold'>Service List</Text>
            {
                fields.map((name, index) => {
                    return (
                        <div key={index} className='p-3 border border-2 my-3 rounded position-relative'>
                            <ServiceItem values={values} name={name} fields={fields} />
                            {
                                index !== 0 && (
                                    <button type='button' className={`btn btn-danger ${style.delete}`} onClick={() => fields.remove(index)}>
                                        <BiTrash />
                                    </button>
                                )
                            }
                        </div>
                    )
                })
            }
            <button type='button' className='btn btn-warning' onClick={() => fields.push({})}>Add Service</button>
        </div>

    )
}

const BillEntryForm = () => {

    const onSubmit = (data) => {
        console.log(data);

    }

    return (
        <>
            <MetaTag title="Create Bill Entry" />
            <Center>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    initialValues={{
                        services: [{}]
                    }}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit} className='row py-5 needs-validation'>
                            <div className="mb-3 col-3">
                                <label htmlFor="billEntryDate" className="form-label">Date</label>
                                <Field name="date" component="input" required type='date' className="form-control" id="billEntryDate" />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="billEntryEngineerName" className="form-label">Engineer Name</label>
                                <Field name="engineer_name" component="input" required type='text' className="form-control" id="billEntryEngineerName" />
                            </div>
                            <div className="mb-3 col-3">
                                <label htmlFor="billEntryBillNo" className="form-label">Bill No.</label>
                                <Field name="bill_no" component="input" required type='text' className="form-control" id="billEntryBillNo" />
                            </div>

                            <div className='mb-3 pt-3 border border-success rounded'>
                                <FieldArray name="services" >
                                    {
                                        ({ fields }) => (
                                            <Repeater values={values} fields={fields} />
                                        )
                                    }
                                </FieldArray>
                            </div>

                            <div className="mb-3 col-6">
                                <label htmlFor="billEntryCustomerName" className="form-label">Customer Name</label>
                                <Field name="customer_name" component="input" required type='text' className="form-control" id="billEntryCustomerName" />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="billEntryPhoneNumber" className="form-label">Phone Number</label>
                                <Field name="phone_number" component="input" required type='text' className="form-control" id="billEntryPhoneNumber" />
                            </div>
                            <div className="mb-3 col-12">
                                <label htmlFor="billEntryCallType" className="form-label">Call Type</label>
                                <Field name="call_type" component="input" required type='text' className="form-control" id="billEntryCallType" />
                            </div>
                            <div className="mb-3 col-12">
                                <label htmlFor="billEntryNotes" className="form-label">Notes</label>
                                <Field name="notes" component="textarea" className="form-control" id="billEntryNotes" />
                            </div>

                            <div className='col-12 text-center'>
                                <button type="submit" className='btn btn-info mt-3'>Submit</button>
                            </div>
                        </form>
                    )}
                />
            </Center>
        </>
    )
}

export default BillEntryForm;