import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getContacts = () => {
  const request = axios.get(`${baseURL}`);
  return request.then((response) => {
    return response.data;
  });
};

const createContact = (newContact) => {
  const request = axios.post(`${baseURL}`, newContact);
  return request.then((response) => {
    return response.data;
  });
};

const modifyContact = (contact) => {
  const request = axios.put(`${baseURL}/${contact.id}`, contact);
  return request.then((response) => {
    return response.data;
  });
};

const removeContact = (contact) => {
  const request = axios.delete(`${baseURL}/${contact.id}`);
  return request.then((response) => {
    console.log(`Deleted contact with ID: ${contact.id}`);
    console.log(response.data);
  });
};

export default {
  getContacts,
  createContact,
  modifyContact,
  removeContact,
};
