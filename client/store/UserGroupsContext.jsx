import { createContext, useState } from 'react';

export const UserGroupsContext = createContext({
  groups: [],
  loading: false,
  group: {},
  fetchData: () => {},
  getGroupById: () => {},
});

export function UserGroupsContextProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/v1/user/groups');
    const data = await res.json();
    console.log(data);
    setGroups(data);
    setLoading(false);
  };

  const getGroupById = (uuid) => groups?.find((group) => group.uuid === uuid);

  const initialState = {
    groups,
    loading,
    fetchData,
    getGroupById,
  };

  return (
    <UserGroupsContext.Provider value={initialState}>
      {children}
    </UserGroupsContext.Provider>
  );
}
