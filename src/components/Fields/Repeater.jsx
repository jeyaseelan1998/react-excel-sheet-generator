import React from 'react';
import { FieldArray } from 'react-final-form-arrays';

import { BiTrash } from "../Icons";
import Text from '../Text';

import style from "./style.module.css";

const Repeater = ({ values, form, title, content }) => {
    return (
        <FieldArray name="services">
            {
                ({ fields }) => (
                    <div className='mb-3'>
                        {
                            title && <Text className='fw-bold'>{title}</Text>
                        }
                        {
                            fields.map((name, index) => {
                                return (
                                    <div key={index} className='p-3 border border-2 my-3 rounded position-relative'>
                                        {
                                            content && content({ values, name, form })
                                        }
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
        </FieldArray>
    )
}

export default Repeater;