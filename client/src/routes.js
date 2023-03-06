/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Admins from "views/Admins.js"
import Users from "views/Users.js"
import Chanels from "views/Chanels.js"
import Radios from "views/Radios.js"
import News from "views/News.js"
import Profile from "views/Profile.js"
import AI_signals from "views/AI_signals.js"
import Settings from "views/Settings.js"
import States from "views/States.js"
var routes = [
  {
    path: "/admins",
    name: "Admins",
    icon: "",
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: "",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/chanels",
    name: "Chanels",
    icon: "",
    component: Chanels,
    layout: "/admin"
  },
  {
    path: "/radios",
    name: "Radios",
    icon: "",
    component: Radios,
    layout: "/admin"
  },
  {
    path: "/news",
    name: "News",
    icon: "",
    component: News,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/AI_signals",
    name: "AI signals",
    icon: "",
    component: AI_signals,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/states",
    name: "States",
    icon: "",
    component: States,
    layout: "/admin"
  }];
export default routes;
