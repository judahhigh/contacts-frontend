import { Contact, User } from "./entities";
import { atom } from "recoil";
import { Option, None } from 'ts-results';

export const contactsState = atom<Contact[]>({
  key: "contactsState",
  default: [],
});

export const tokenState = atom<Option<String>>({
  key: "token",
  default: None
})

export const userState = atom<Option<User>>({
  key: "user",
  default: None
})