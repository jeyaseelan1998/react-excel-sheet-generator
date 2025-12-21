import React from 'react';
import { Center, Text } from '../../components';
import { Field, Form } from 'react-final-form';
import { get } from 'lodash';
import { BiTrash } from 'react-icons/bi';

import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import style from "./style.module.css";

const required = value => (value ? undefined : 'Required');

const ServiceItem = ({ values, name }) => {
    return (
        <>
            <div className="mb-3 col-6">
                <label htmlFor="billEntryDescription" className="form-label">Description</label>
                <Field name={`${name}.description`} component="input" required type='text' className="form-control" id="billEntryDescription" />
            </div>
            <div className="mb-3 col-6">
                <Field name={`${name}.category`} validate={required}>
                    {({ input, meta }) => (
                        <>
                            <label htmlFor="billEntryCategory" className="form-label">Category</label>
                            <select {...input} id='billEntryCategory' className="form-select" aria-label="Default select example" required>
                                <option selected value={''}>Select</option>
                                <option value="SPARE">SPARE</option>
                                <option value="ACC">ACC</option>
                                <option value="IC">IC</option>
                                <option value="GAS CHARGING">GAS CHARGING</option>
                                <option value="CONTRACT">CONTRACT</option>
                            </select>
                            {meta.touched && meta.error && <span className='text-danger'>{meta.error}</span>}
                        </>
                    )}
                </Field>
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="billEntryQty" className="form-label">QTY</label>
                <Field name={`${name}.qdt`} component="input" required type='number' className="form-control" id="billEntryQty" />
            </div>
            {
                get(values, 'category') !== 'CONTRACT' && (
                    <div className="mb-3 col-6">
                        <label htmlFor="billEntryAmount" className="form-label">Amount</label>
                        <Field name={`${name}.amount`} component="input" required type='text' className="form-control" id="billEntryAmount" />
                    </div>
                )
            }
            {
                get(values, 'category') === 'CONTRACT' && (
                    <div className="mb-3 col-6">
                        <label htmlFor="billEntryAmc" className="form-label">AMC</label>
                        <Field name={`${name}.amc`} component="input" required type='text' className="form-control" id="billEntryAmc" />
                    </div>
                )
            }
        </>
    )
}

const Repeater = ({ values, fields }) => {
    return (

        <div className='mb-3'>
            <Text className='bold'>Service List</Text>
            {
                fields.map((name, index) => {
                    return (
                        <div key={index} className='row py-3 border border-2 my-3 rounded position-relative'>
                            <ServiceItem values={values} name={name} fields={fields} />
                            <button type='button' className={`btn btn-danger ${style.delete}`} onClick={() => fields.remove(index)}>
                                <BiTrash />
                            </button>
                        </div>
                    )
                })
            }
            <button type='button' className='btn btn-warning' onClick={() => fields.push({})}>Add Row</button>
        </div>

    )
}

const BillEntryForm = () => {

    const onSubmit = (data) => {
        console.log(data);

    }

    return (
        <Center>
            <Form
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators
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

                        <FieldArray name="services">
                            {
                                ({ fields }) => (
                                    <Repeater values={values} fields={fields} />
                                )
                            }
                        </FieldArray>

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
    )
}

export default BillEntryForm;