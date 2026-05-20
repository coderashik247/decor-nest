import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";


export const router = createBrowserRouter([
    {
        path:"/",
        Component: RootLayouts
    }
])