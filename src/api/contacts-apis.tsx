import { Contact, Token, User } from "../entities";
import { Err, None, Ok, Result, Some } from "ts-results";
import { update_contacts } from "./utils";

export enum Error {
  PersistFailure,
  FetchFailure,
  DeleteFailure,
  UpdateFailure,
  RefreshFailure,
  LoginFailure,
  RegisterFailure,
  GetAllContactsFailure,
}

export async function login(
  username: string,
  password: string
): Promise<Result<[User, Token], Error>> {
  let login_response: Result<[User, Token], Error> = Err(Error.LoginFailure);
  try {
    const user = { username: username, password: password };
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status !== 200) {
      return Err(Error.LoginFailure);
    }
    const data = await response.json();
    let response_user: User = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      password: None,
      contacts: [],
    };
    let response_token: Token = { token: data.token };

    // fetch all contacts for a given user and fill it in here.
    let result = await getAllContacts(
      response_user.id.toString(),
      response_token.token.toString()
    );
    if (result.err) {
      return Err(Error.LoginFailure);
    }
    const fetched_contacts = result.unwrap();
    response_user.contacts = fetched_contacts;

    login_response = Ok([response_user, response_token]);
  } catch (error) {
    console.log(error);
  } finally {
    return login_response;
  }
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<Result<[User, Token], Error>> {
  let register_response: Result<[User, Token], Error> = Err(
    Error.RegisterFailure
  );
  try {
    const user = { username: username, password: password, email: email };
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status !== 200) {
      return Err(Error.LoginFailure);
    }
    const data = await response.json();
    let response_user: User = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      password: None,
      contacts: [],
    };
    let response_token: Token = {
      token: data.token,
    };

    // fetch all contacts for a given user and fill it in here.
    let result = await getAllContacts(
      response_user.id.toString(),
      response_token.token.toString()
    );
    if (result.err) {
      return Err(Error.LoginFailure);
    }
    const fetched_contacts = result.unwrap();
    response_user.contacts = fetched_contacts;

    register_response = Ok([response_user, response_token]);
  } catch (error) {
    console.log(error);
    register_response = Err(Error.LoginFailure);
  }
  return register_response;
}

export function createContact(contact: Contact): Result<Contact, Error> {
  // TODO: Implement processing and persistence of contact through api call to backend
  // The backend will
  // 1. check if the contact already exists based on supplied information
  // 2. if the contact is unique, it will attempt to persist it, otherwise it will fail
  console.log(contact);
  return Ok(contact);
}

export function fetchContacts(): Result<Contact[], Error> {
  let contacts: Contact[] = [
    {
      id: Some("123"),
      firstName: Some("joe"),
      lastName: Some("bob"),
      email: Some("fake@fake.com"),
      tel: Some("1231231234"),
    },
    {
      id: Some("1234"),
      firstName: Some("joe"),
      lastName: Some("bob"),
      email: Some("fake@fake.com"),
      tel: Some("1231231234"),
    },
    {
      id: Some("12345"),
      firstName: Some("joe"),
      lastName: Some("bob"),
      email: Some("fake@fake.com"),
      tel: Some("1231231234"),
    },
  ];
  return Ok(contacts);
}

export async function updateContact(
  user: User,
  contact: Contact,
  biscuit: Token
): Promise<Result<Contact, Error>> {
  let update_response: Result<Contact, Error> = Err(Error.UpdateFailure);
  try {
    // Attempt to delete the contact by id on the backend
    if (user.id.none || contact.id.none || biscuit.token.none) {
      return Err(Error.DeleteFailure);
    }
    const user_id: string = user.id.val;
    const contact_id: string = contact.id.val;
    const token: string = biscuit.token.val;
  } catch (error) {
    console.log(error);
    update_response = Err(Error.UpdateFailure);
  }
  return update_response;
}

export async function deleteContact(
  user: User,
  contact: Contact,
  biscuit: Token
): Promise<Result<Contact, Error>> {
  let delete_response: Result<Contact, Error> = Err(Error.DeleteFailure);
  try {
    // Attempt to delete the contact by id on the backend
    if (user.id.none || contact.id.none || biscuit.token.none) {
      return Err(Error.DeleteFailure);
    }
    const user_id: string = user.id.val;
    const contact_id: string = contact.id.val;
    const token: string = biscuit.token.val;

    const response = await fetch(
      `http://localhost:8080/users/${user_id}/contacts/${contact_id}`,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.status !== 200) {
      return Err(Error.DeleteFailure);
    }

    const data = await response.json();
    const deleted_contact: Contact = {
      id: data.id ? Some(data.id) : None,
      firstName: data.firstName ? Some(data.firstName) : None,
      lastName: data.lastName ? Some(data.lastName) : None,
      email: data.email ? Some(data.email) : None,
      tel: data.tel ? Some(data.tel) : None,
    };
    delete_response = Ok(deleted_contact);
  } catch (error) {
    console.log(error);
    delete_response = Err(Error.DeleteFailure);
  }
  return delete_response;
}

export async function refreshContacts(
  user_id: string,
  token: string,
  contacts: Contact[]
): Promise<Result<Contact[], Error>> {
  let response: Result<Contact[], Error> = Err(Error.RefreshFailure);
  try {
    // First fetch all the contacts so that we can
    let fetched_contacts: Contact[] = [];
    const get_all_contacts_result = await getAllContacts(user_id, token);
    if (get_all_contacts_result.err) {
      return Err(Error.RefreshFailure);
    }
    fetched_contacts = get_all_contacts_result.unwrap();

    // Next let's do a comparison with existing contacts by id,
    // only appending the list where it's needed. We do not do
    // a synchronize here, this is exposed as another function
    // that will be called elswhere at strategic points in the code.
    const res = update_contacts(contacts, fetched_contacts);
    if (res.err) {
      return Err(Error.RefreshFailure);
    }
    let updated_contacts: Contact[] = res.unwrap();
    response = Ok(updated_contacts);
  } catch (error) {
    console.log(error);
    response = Err(Error.RefreshFailure);
  }
  return response;
}

export async function getAllContacts(
  user_id: string,
  token: string
): Promise<Result<Contact[], Error>> {
  let response_contacts: Result<Contact[], Error> = Err(
    Error.GetAllContactsFailure
  );
  try {
    let fetched_contacts: Contact[] = [];
    const response = await fetch(
      `http://localhost:8080/users/${user_id}/contacts`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.status !== 200) {
      return Err(Error.LoginFailure);
    }
    const data = await response.json();

    // @ts-ignore
    data.forEach((element) => {
      console.log(element);
      const contact: Contact = {
        id: Some(element.id),
        firstName: Some(element.firstName),
        lastName: Some(element.lastName),
        email: Some(element.email),
        tel: Some(element.email),
      };
      fetched_contacts = [...fetched_contacts, contact];
    });
    response_contacts = Ok(fetched_contacts);
  } catch (error) {
    console.log(error);
    response_contacts = Err(Error.GetAllContactsFailure);
  }
  return response_contacts;
}
