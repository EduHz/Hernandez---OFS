import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

console.log(axios.get(baseUrl));

const getAll = () => {
  return axios.get(baseUrl).catch((error) => {
    console.log('error en get all');
  });
};

const create = (addPerson) => {
  return axios.post(baseUrl, addPerson).catch((error) => {
    console.log('error en create');
  });
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch((error) => {
    console.log('error en remove');
  });
};

const update = (id, personObj) => {
  return axios.put(`${baseUrl}/${id}`, personObj).catch((error) => {
    console.log('error en el update');
  });
};

const personService = {
  getAll,
  create,
  remove,
  update,
};

export default personService;
