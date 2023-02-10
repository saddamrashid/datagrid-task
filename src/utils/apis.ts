import axios from "axios";
import { BASE_URL } from '../constants';

const getTransactions = () => axios.get(`${BASE_URL}/transactions`).then((res) => res.data);

export { getTransactions };