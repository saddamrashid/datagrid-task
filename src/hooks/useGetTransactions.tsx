import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../constants';

const useGetTransactions = ()=> {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {(async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BASE_URL}/transactions`);
        setData(response.data.data);
      } catch (e: any) {
        setError(e.message ?? "Request failed from server.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}

export default useGetTransactions;