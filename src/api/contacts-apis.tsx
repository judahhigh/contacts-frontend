import { Contact, Token, User } from "../entities";
import { Err, None, Ok, Result, Some } from "ts-results";

export enum Error {
  PersistFailure,
  FetchFailure,
  DeleteFailure,
  UpdateFailure,
  RefreshFailure,
  LoginFailure,
  RegisterFailure,
  GetAllContactsFailure,
  CreateFailure,
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
      id: Some(data.user.id),
      username: Some(data.user.username),
      email: Some(data.user.email),
      password: None,
      contacts: [],
    };
    let response_token: Token = { token: Some(data.token) };

    // fetch all contacts for a given user and fill it in here.
    if (response_user.id.none || response_token.token.none) {
      return Err(Error.LoginFailure);
    }
    let result = await getAllContacts(
      response_user.id.val.toString(),
      response_token.token.val.toString()
    );
    if (result.err) {
      return Err(Error.LoginFailure);
    }
    const fetched_contacts = result.unwrap();
    console.log("Fetched contacts", fetched_contacts);
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
      return Err(Error.RegisterFailure);
    }
    const data = await response.json();
    let response_user: User = {
      id: Some(data.user.id),
      username: Some(data.user.username),
      email: Some(data.user.email),
      password: None,
      contacts: [],
    };
    let response_token: Token = {
      token: Some(data.token),
    };

    // fetch all contacts for a given user and fill it in here.
    if (response_user.id.none || response_token.token.none) {
      return Err(Error.RegisterFailure)
    }
    let result = await getAllContacts(
      response_user.id.val,
      response_token.token.val
    );
    if (result.err) {
      return Err(Error.RegisterFailure);
    }
    const fetched_contacts = result.unwrap();
    response_user.contacts = fetched_contacts;

    register_response = Ok([response_user, response_token]);
  } catch (error) {
    console.log(error);
    register_response = Err(Error.RegisterFailure);
  }
  return register_response;
}

export async function createContact(
  contact: Contact,
  user: User,
  biscuit: Token
): Promise<Result<Contact, Error>> {
  let create_response: Result<Contact, Error> = Err(Error.CreateFailure);
  try {
    if (
      user.id.none ||
      biscuit.token.none ||
      contact.id.none ||
      contact.firstName.none ||
      contact.lastName.none ||
      contact.email.none ||
      contact.tel.none
    ) {
      return Err(Error.CreateFailure);
    }
    const user_id: string = user.id.val;
    const token: string = biscuit.token.val;
    const firstName: string = contact.firstName.val;
    const lastName: string = contact.lastName.val;
    const email: string = contact.email.val;
    const tel: string = contact.tel.val;

    // Attempt to retrieve the current requested contact from the db
    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      tel: tel,
    };
    const response = await fetch(
      `http://localhost:8080/users/${user_id}/contacts`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status !== 200) {
      return Err(Error.CreateFailure);
    }
    const data = await response.json();
    const response_contact: Contact = {
      id: Some(data.id),
      firstName: Some(data.first_name),
      lastName: Some(data.last_name),
      email: Some(data.email),
      tel: Some(data.tel),
    };
    create_response = Ok(response_contact);
  } catch (error) {
    console.log(error);
    create_response = Err(Error.CreateFailure);
  }
  return create_response;
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
    if (
      user.id.none ||
      contact.id.none ||
      contact.firstName.none ||
      contact.lastName.none ||
      contact.email.none ||
      contact.tel.none ||
      biscuit.token.none
    ) {
      return Err(Error.UpdateFailure);
    }
    console.log("IN FETCH USER: ", user);
    const user_id: string = user.id.val;
    const contact_id: string = contact.id.val;
    const firstName: string = contact.firstName.val;
    const lastName: string = contact.lastName.val;
    const email: string = contact.email.val;
    const tel: string = contact.tel.val;
    const token: string = biscuit.token.val;
    console.log(user_id, contact_id, firstName, lastName, email, tel);

    // Attempt to retrieve the current requested contact from the db
    const body = {
      id: contact_id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      tel: tel,
    };
    const response = await fetch(
      `http://localhost:8080/users/${user_id}/contacts`,
      {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status !== 200) {
      return Err(Error.DeleteFailure);
    }
    const data = await response.json();
    const response_contact: Contact = {
      id: Some(data.id),
      firstName: Some(data.first_name),
      lastName: Some(data.last_name),
      email: Some(data.email),
      tel: Some(data.tel),
    };
    update_response = Ok(response_contact);
    console.log(data);
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

    response = Ok(fetched_contacts);
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
