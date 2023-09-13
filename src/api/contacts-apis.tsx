import { Contact, User, Token } from "../entities";
import { Ok, Err, Result, None } from "ts-results";

export enum Error {
  PersistFailure,
  FetchFailure,
  DeleteFailure,
  UpdateFailure,
  RefreshFailure,
  LoginFailure,
  RegisterFailure,
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

    // TODO: fetch all contacts for a given user and fill it in here.

    let response_token: Token = { token: data.token };
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

    // TODO: fetch all contacts for a given user and fill it in here.

    let response_token: Token = {
      token: data.token,
    };
    register_response = Ok([response_user, response_token]);
  } catch (error) {
    console.log(error);
    register_response = Err(Error.LoginFailure);
  }
  return register_response;
}

export function persistContact(contact: Contact): Result<Contact, Error> {
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
      id: "123",
      firstName: "joe",
      lastName: "bob",
      email: "fake@fake.com",
      tel: "1231231234",
    },
    {
      id: "234",
      firstName: "jim",
      lastName: "bob",
      email: "fake2@fake2.com",
      tel: "123498771234",
    },
    {
      id: "654",
      firstName: "kim",
      lastName: "bob",
      email: "fake3@fake2.com",
      tel: "33333333",
    },
  ];
  return Ok(contacts);
}

export function updateContact(contact: Contact): Result<Contact, Error> {
  return Ok(contact);
}

export function deleteContact(contact: Contact): Result<Contact, Error> {
  return Ok(contact);
}

export function refreshContacts(contacts: Contact[]): Result<Contact[], Error> {
  return Ok(contacts);
}
