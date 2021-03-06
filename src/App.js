/*
 *  Copyright (c) 2019 Maverick Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as,
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import "./App.css";
import authProvider from "./authProvider";
import themeReducer from "./themeReducer";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import customRoutes from "./routes";
import drfProvider from "./dataProvider";
import englishMessages from "./i18n/en_IN.js";
import hindiMessages from "./i18n/hi_IN.js";
import kannadaMessages from "./i18n/ka_IN.js";

import resources from "./resources";
import coaches from "./coaches";
import admins from "./admins";
import userGroups from "./userGroups";
import permissionGroups from "./permissionGroups";
import measurements from "./measurements";
import athletes from "./athletes";
import ngos from "./ngos";
import { ResourceWithPermissions } from "ra-auth-acl";
import measurementTypes from "./measurementTypes";
import { API_URL, localeHI_IN, localeKA_IN, localeEN_IN } from "./constants";
import errorSagas from "./dataProvider/errorSaga";
import readings from "./readings";
import requests from "./requests";

const i18nProvider = locale => {
  if (locale === localeHI_IN) {
    return hindiMessages;
  }
  if (locale === localeKA_IN) {
    return kannadaMessages;
  }
  if (locale === localeEN_IN) {
    return englishMessages;
  }

  return englishMessages;
};

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: "application/json"
    });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

class App extends Component {
  render() {
    return (
      <Admin
        title="Bridges of Sports"
        dataProvider={drfProvider(API_URL, httpClient)}
        customReducers={{ theme: themeReducer }}
        customRoutes={customRoutes}
        authProvider={authProvider}
        customSagas={[errorSagas]}
        dashboard={Dashboard}
        loginPage={Login}
        appLayout={Layout}
        locale={localeEN_IN}
        i18nProvider={i18nProvider}
      >
        {permissions => [
          <ResourceWithPermissions
            name="admins"
            permissions={permissions}
            {...admins}
          />,
          <ResourceWithPermissions
            name="requests"
            permissions={permissions}
            {...requests}
          />,
          <ResourceWithPermissions
            name="permission_groups"
            permissions={permissions}
            {...permissionGroups}
          />,
          <ResourceWithPermissions
            name="measurements"
            permissions={permissions}
            {...measurements}
          />,
          <ResourceWithPermissions
            name="resources"
            permissions={permissions}
            {...resources}
          />,
          <ResourceWithPermissions
            name="ngos"
            permissions={permissions}
            {...ngos}
          />,
          <ResourceWithPermissions
            name="athletes"
            permissions={permissions}
            {...athletes}
          />,
          <ResourceWithPermissions
            name="measurement_types"
            permissions={permissions}
            {...measurementTypes}
          />,
          <ResourceWithPermissions
            name="coaches"
            permissions={permissions}
            {...coaches}
          />,
          <ResourceWithPermissions
            name="user_groups"
            permissions={permissions}
            {...userGroups}
          />,
          <ResourceWithPermissions
            name="readings"
            permissions={permissions}
            {...readings}
          />,
          <Resource name="ping" />
        ]}
      </Admin>
    );
  }
}

export default App;
