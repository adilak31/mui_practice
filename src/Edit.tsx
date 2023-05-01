import { Button, Stack, TextField } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Status } from "./app/Status"
import { Post } from "./widgets/table"
import * as Yup from 'yup'

export const Edit = () => {
    const [detailInfo, setDetailInfo] = useState<Post>({} as Post)
    const [status, setStatus] = useState<Status>('init')
    const params = useParams()

    const fetchDetailInfo = async () => {
        try {
            setStatus('loading')
            const respons = await axios.get<Post>("https://jsonplaceholder.typicode.com/posts/" + params.id)
            setDetailInfo(respons.data)
            setStatus('success')
        }
        catch (error) {
            setStatus('error')

        }

    }
    useEffect(() => {
        fetchDetailInfo()
    }, [])
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        body: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

    });
    const formik = useFormik({
        initialValues: {
            title: detailInfo.title,
            body: detailInfo.body
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const respons = await axios.patch("https://jsonplaceholder.typicode.com/posts/" + params.id, values)
        },
        enableReinitialize: true
    })
    return <div>
        <Stack spacing={2} component="form" onClick={formik.handleSubmit}>
            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} name="title" label="title" variant="outlined" />
            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} name="body" label="body" variant="outlined" />
            <Button type={"submit"} variant="contained">send</Button>
        </Stack>
    </div>
}