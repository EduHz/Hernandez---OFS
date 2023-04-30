import axios from "axios";
const baseUrl = "/api/persons";

console.log(axios.get(baseUrl));

const getAll = async () => {
  try {
    return await axios.get(baseUrl);
  } catch (error) {
    console.log("error en get all");
  }
};

const create = async (addPerson) => {
  try {
    return await axios.post(baseUrl, addPerson);
  } catch (error) {
    console.log("error en create");
  }
};

const remove = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.log("error en remove");
  }
};


const personService = {
  getAll,
  create,
  remove,
};

export default personService;
