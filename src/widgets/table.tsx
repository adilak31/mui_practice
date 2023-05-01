import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, OutlinedInput, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Status } from '../app/Status';

export interface Post {
    id: string
    title: string
    body: string
}

export const TablePage = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [status, setStatus] = useState<Status>('init')
    const fetchPosts = async () => {
        try {
            setStatus("loading")
            const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
            setPosts(response.data)
            setStatus("success")
        }
        catch (error) {
            setStatus("error")
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])


    return <div >
        {status === "loading" ?
            <div>
                {Array(10).fill(1).map((_, index) => <Skeleton key={index} height={70} animation="wave" />)}
            </div> : null
        }
        {status === "error" ?
            <div>error</div> : null}


        {status === 'success' && posts.length < 1 ? <div> пустой лист </div> : null}
        {status === 'success' && posts.length > 0 ?
            <TableContainer >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell> title</TableCell>
                            <TableCell > body</TableCell>
                            <TableCell>

                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow
                                key={post.id}
                            >
                                <TableCell >
                                    {post.id}
                                </TableCell>
                                <TableCell >{post.title}</TableCell>
                                <TableCell >{post.body}</TableCell>
                                <TableCell>
                                    <Button>
                                        <NavLink to={"/" + post.id}>
                                            ={'>'}
                                        </NavLink>

                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
            </TableContainer> : null}


    </div>


}