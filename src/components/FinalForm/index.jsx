import { get } from 'lodash';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';

import v1Api from '../../api/v1';

const FinalForm = (
    initialValues = {},
    url = '/bill-entry',
    render,
    children,
    hasGetAction
) => {
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(false);
    const { id } = useParams();
    const [initialValuesObj, setInitialValuesObj] = useState(initialValues);

    const onSubmit = async (data) => {
        setFetching(true);
        try {
            let response;
            if (id) {
                response = await v1Api.patch(`${url}/${id}`, data);
            } else {
                response = await v1Api.post("${url}", data);
            }
            const status = response.status;
            if (status === 200) {
                toast.success("Bill Entry created");
                navigate("${url}");
            }
        } catch (error) {
            toast.error(get(error, 'response.data.message') || error.message);
        }
        setFetching(false);
    }

    const getFormValues = async () => {
        try {
            const response = await v1Api.get(`${url}?id=${id}`);
            setInitialValuesObj(get(response, "data.list.0"));
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (id && hasGetAction) {
            getFormValues();
        }
    }, [id, hasGetAction]);

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators
                }}
                initialValues={initialValuesObj}
                render={({ handleSubmit, values, valid, form }) => {
                    return (
                        <form onSubmit={handleSubmit} className='row py-5 px-3 px-sm-0 needs-validation'>
                            {
                                render && render({ handleSubmit, values, valid, form, fetching })
                            }
                            {
                                children && children
                            }
                        </form>
                    )
                }}
            />
        </div>
    )
}

export default FinalForm