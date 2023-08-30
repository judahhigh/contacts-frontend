import createStore from "teaful";
import { Contact } from "./entities";

interface InitStore {
  contacts: Contact[];
}

export const { useStore } = createStore<InitStore>({
  contacts: [],
});
