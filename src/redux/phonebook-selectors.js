import { createSelector } from '@reduxjs/toolkit';

const getContacts = (state) => state.contacts;

const getFilter = (state) => state.filter;

const getItems = (state) => state.contacts.items;

const getVisibleContacts = createSelector([getFilter, getItems], (filter, items) => {
  const normalizedFilter = filter.toLowerCase();
  if (items) {
    return items.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  }
});

export { getContacts, getVisibleContacts };
