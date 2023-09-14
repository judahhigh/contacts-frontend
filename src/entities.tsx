import { Option, None } from "ts-results";

export type Contact = {
  id: Option<string>;
  firstName: Option<string>;
  lastName: Option<string>;
  email: Option<string>;
  tel: Option<string>;
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
  return {
    id: None,
    firstName: None,
    lastName: None,
    email: None,
    tel: None
  };
}
