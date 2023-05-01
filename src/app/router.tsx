import { useRoutes } from "react-router"
import { TablePage } from "../widgets/table"
import { DetailPage } from "./DetailPage"

export const Router = () => {
    const router = useRoutes([
        { path: "", element: <TablePage /> },
        { path: ":id", element: <DetailPage /> }
    ])
    return router
} 