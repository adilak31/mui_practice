import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Post } from "../widgets/table"
import { Status } from "./Status"

export const DetailPage = () => {
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
    if (status === "success") {
        return <div>{detailInfo.title}</div>

    }
    else if (status === 'error') {
        return <div>error</div>
    }
    else if (status === 'loading') {
        return <div>loading</div>
    }
    else {
        return <></>
    }

}
