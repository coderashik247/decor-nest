import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Coverage from "../pages/Home/Coverage/Coverage";


export const router = createBrowserRouter([
    {
        path:"/",
        Component: RootLayouts,
        children:[
            {
                path:"/",
                Component: Home
            },
            {
                path:'/services',
                Component: Services
            },
            {
                path:'/coverage',
                element: <Coverage></Coverage>,
            }
        ]
    }
])