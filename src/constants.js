/*
 *  Copyright (c) 2020 Maverick Labs
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

export const API_URL = process.env.REACT_APP_API_URL;

export const AVAILABLE_LANGUAGES = [
  { label: "English", value: "en_IN" },
  { label: "हिंदी", value: "hi_IN" },
  { label: "ಕನ್ನಡ", value: "ka_IN" }
];

export const ATHLETE = "athlete";
export const COACH = "coach";
export const ADMIN = "ADMIN";
export const RESPONSE_STATUS_400 = 400;
export const API_ERROR_UNKNOWN = "Something went wrong";
export const API_SUCCESS = "Done";
export const SNACKBAR_ERROR = "error";
export const SNACKBAR_SUCCESS = "success";
export const SNACKBAR_INFO = "info";

export const PERMISSION_ADMIN_CREATE = "admins.create";
export const PERMISSION_ADMIN_DELETE = "admins.delete";
export const PERMISSION_ADMIN_EDIT = "admins.edit";
export const PERMISSION_ADMIN_ENABLED = "admins.enabled";
export const PERMISSION_ADMIN_LIST = "admins.list";
export const PERMISSION_ADMIN_SHOW = "admins.show";

export const PERMISSION_ATHLETE_CREATE = "athletes.create";
export const PERMISSION_ATHLETE_DELETE = "athletes.delete";
export const PERMISSION_ATHLETE_EDIT = "athletes.edit";
export const PERMISSION_ATHLETE_ENABLED = "athletes.enabled";
export const PERMISSION_ATHLETE_LIST = "athletes.list";
export const PERMISSION_ATHLETE_SHOW = "athletes.show";

export const PERMISSION_COACH_CREATE = "coaches.create";
export const PERMISSION_COACH_DELETE = "coaches.delete";
export const PERMISSION_COACH_EDIT = "coaches.edit";
export const PERMISSION_COACH_ENABLED = "coaches.enabled";
export const PERMISSION_COACH_LIST = "coaches.list";
export const PERMISSION_COACH_SHOW = "coaches.show";

export const RESOURCE_TYPE_FILE = "file";
export const RESOURCE_TYPE_TRAINING_SESSION = "session";
export const RESOURCE_TYPE_REGISTRATION_FORM = "registration";
export const RESOURCE_TYPE_CURRICULUM = "curriculum";

export const PERMISSION_REQUESTS_SHOW = "requests.show";
export const PERMISSION_REQUESTS_LIST = "requests.list";

export const localeEN_IN = "en_IN";
export const localeHI_IN = "hi_IN";
export const localeKA_IN = "ka_IN";

export const GENDER_CHOICES = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" }
];

export const VALID_PDF_EXTENSIONS = [".pdf"];
export const VALID_VIDEO_EXTENSIONS = [".mp4"];
export const VALID_IMAGE_EXTENSIONS = [".png", ".jpeg", ".jpg"];
export const VALID_FILE_EXTENSIONS =
  VALID_PDF_EXTENSIONS + VALID_IMAGE_EXTENSIONS + VALID_VIDEO_EXTENSIONS;

export const LOCAL_STORAGE_LOCALE = "locale";
export const LOCAL_STORAGE_USERNAME = "username";
export const LOCAL_STORAGE_USER_KEY = "user_key";
export const LOCAL_STORAGE_NGO_KEY = "ngo_key";
export const LOCAL_STORAGE_PERMISSIONS = "permissions";
export const LOCAL_STORAGE_NGO_NAME = "ngo_name";
export const LOCAL_STORAGE_FIRST_NAME = "first_name";
