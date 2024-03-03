import axios from "axios";

// Because of our situation, both the frontend and the backend are at the same address,
// we can declare baseUrl as a relative URL.
// This means we can leave out the part declaring the server host and port.
// const baseURL = import.meta.env.VITE_BACKEND_BASEURL;

const getContacts = async () => {
  const request = axios.get(`/api/persons`);
  const response = await request;
  return response.data;
};

const createContact = async (newContact) => {
  const request = axios.post(`/api/persons`, newContact);
  const response = await request;
  return response.data;
};

const modifyContact = async (contact) => {
  const request = axios.put(`/api/persons/${contact.id}`, contact);
  const response = await request;
  return response.data;
};

const removeContact = async (contact) => {
  const request = axios.delete(`/api/persons/${contact.id}`);
  const response = await request;
  console.log(`Deleted contact with ID: ${contact.id}`);
  console.log(response.data);
};

export default {
  getContacts,
  createContact,
  modifyContact,
  removeContact,
};
