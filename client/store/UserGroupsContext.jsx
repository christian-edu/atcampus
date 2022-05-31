import { createContext, useState } from 'react';

export const UserGroupsContext = createContext({
  groups: [],
  loading: false,
  error: false,
  group: {},
  fetchData: () => {},
  getGroupById: () => {},
});

export function UserGroupsContextProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/user/groups');
      const data = await res.json();
      if (!res.ok)
        throw new Error('Det oppsto en feil med å hente gruppene dine');
      setGroups(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getGroupById = (uuid) => groups?.find((group) => group.uuid === uuid);

  const initialState = {
    groups,
    loading,
    fetchData,
    getGroupById,
    error,
  };

  return (
    <UserGroupsContext.Provider value={initialState}>
      {children}
    </UserGroupsContext.Provider>
  );
}
