import { Stack, TextField, Button } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from 'yup'

export const Create = () => {
    const formik = useFormik({
        initialValues: {
            from: '',
            to: '',
            title: '',
            body: ''
        },
        onSubmit: async (values) => {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts/", values)
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            body: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            from: Yup.date().required('required').min(new Date(new Date("05.05.2023").getTime() - 24 * 60 * 60 * 1000), "c 5 мая"),
            to: Yup.date().required('required').when('from', (from, Yup) => from && Yup.min(from, 'to>from'))

        })
    })
    return <div>
        <Stack spacing={2} component="form" onClick={formik.handleSubmit}>
            <TextField helperText={formik.errors.title} error={Boolean(formik.touched.title && formik.errors.title)} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} name="title" label="title" variant="outlined" />
            <TextField helperText={formik.errors.body} error={Boolean(formik.touched.body && formik.errors.body)} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} name="body" label="body" variant="outlined" />
            <TextField helperText={formik.errors.from} error={Boolean(formik.touched.from && formik.errors.from)} type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.from} name="from" variant="outlined" />
            <TextField helperText={formik.errors.to} error={Boolean(formik.touched.to && formik.errors.to)} type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.to} name="to" variant="outlined" />

            <Button type={"submit"} variant="contained">send</Button>
        </Stack>


    </div>
}