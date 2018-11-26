import Create from "../views/Create/Create";
import Createquestion from "../views/Createquestion/Createquestion";
import Poll from "../views/Poll/Poll";
import Stats from "../views/Stats/Stats";


const dashboardRoutes = [
  {
    path: "/create",
    name: "CREATE",
    icon: "pe-7s-graph",
    component: Create,
    exact : "exact",
    isshow:true
  },

  {
    path: "/poll",
    name: "POLL",
    icon: "pe-7s-graph",
    component: Poll,
    exact : '',
    isshow:true
  },
  {
    path: "/stats",
    name: "STATS",
    icon: "pe-7s-graph",
    component: Stats,
    exact : '',
    isshow:true
  },
  {
    path: "/createquestion",
    name: "Createquestion",
    exact : '',
    icon: "pe-7s-graph",
    component: Createquestion,
    isshow:false
  },
  
  
];

export default dashboardRoutes;
