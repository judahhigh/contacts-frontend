import { Contact, User, Token } from "./entities";
import { atom } from "recoil";
import { Option, None } from 'ts-results';

// @ts-ignore
const localStorageEffect = key => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  // @ts-ignore
  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const contactsState = atom<Contact[]>({
  key: "contactsState",
  default: [],
});

export const tokenState = atom<Option<Token>>({
  key: "token",
  default: None,
  effects: [
    localStorageEffect('current_token'),
  ]
})

export const userState = atom<Option<User>>({
  key: "user",
  default: None
})
