import { useRoutes } from "react-router"
import { Create } from "../Create"
import { Edit } from "../Edit"
import { TablePage } from "../widgets/table"
import { DetailPage } from "./DetailPage"

export const Router = () => {
    const router = useRoutes([
        { path: "", element: <TablePage /> },
        { path: ":id", element: <DetailPage /> },
        { path: "edit/:id", element: <Edit /> },
        { path: "create", element: <Create /> }
    ])
    return router
} 