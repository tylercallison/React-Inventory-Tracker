import Index from "screens/Index.js";
import Profile from "views/Profile.js";
import Regions from "views/Regions.js";
import Organization from "views/Organization.js";
import Polls from "views/Polls.js";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/dashboard",
    },
    {
        path: "/polls",
        name: "Polls",
        icon: "fas fa-chart-bar text-blue",
        component: Polls,
        layout: "/dashboard",
    },
    {
        path: "/regions",
        name: "Regions",
        icon: "ni ni-pin-3 text-orange",
        component: Regions,
        layout: "/dashboard",
    },
    {
        path: "/organization",
        name: "Members",
        icon: "fas fa-cubes text-red",
        component: Organization,
        layout: "/dashboard",
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/dashboard",
    },
];

export default routes;
