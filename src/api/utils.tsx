import { Contact } from '../entities';
import {
    Err,
    Ok,
    Option,
    Result,
    } from 'ts-results';

// If any contact in the fetched list does not have an id, we want to return an error
export function update_contacts(
  og: Contact[],
  fetched: Contact[]
): Result<Contact[], string> {
  let updated: Contact[] = [];

  // Find all contacts in fetched, not in og, and wholesale
  // place them in updated contacts list.
  let contacts_not_in_og = fetched.filter((contact) => {
    const target_id: Option<string> = contact.id;
    if (target_id.none) {
      return Err(`fetched contact does not have id, contacts update failed.`);
    }
    const res: Contact[] = og.filter((og_contact) => {
      og_contact.id.some && og_contact.id === target_id;
    });
    res.length === 0 ? true : false;
  });
  updated = updated.concat(contacts_not_in_og);

  // Now update all contacts in og, also in fetch that
  // have changed
  og.forEach((og_contact) => {
    const target_id: Option<string> = og_contact.id;
    if (target_id.none) {
      return Err(`fetched contact does not have id, contacts update failed.`);
    }

    // If the contact is in fetch, add it, if not, simply put it back into the updated list.
    const res = fetched.find((fetched_contact) => {
      fetched_contact.id.some && fetched_contact.id.val === target_id.val;
    });
    if (res) {
      const updated_contact: Contact = res;
      updated = [...updated, updated_contact];
    } else {
      updated = [...updated, og_contact];
    }
  });

  return Ok(updated);
}
