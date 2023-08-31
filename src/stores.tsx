import { Contact } from "./entities";
import { atom } from "recoil";

export const contactsState = atom<Contact[]>({
  key: "contactsState",
  default: [],
});
