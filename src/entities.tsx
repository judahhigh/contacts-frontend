import { Option } from "ts-results";

export type Contact = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: string;
};

export type User = {
  id: Option<string>,
  username: Option<string>;
  email: Option<string>;
  password: Option<string>,
  contacts: Contact[]
}

export type Token = {
  token: Option<string>,
}

export default function initContact(): Contact {
  return {};
}
