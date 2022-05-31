import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GroupLinks from './components/GroupLinks';
import GroupMembers from './components/GroupMembers';
import Questions from './components/Questions';
import ProfileMenu from './components/shared/ProfileMenu';
import Footer from './components/shared/Footer';
import TopNavBar from './components/shared/TopNavBar';
import BottomNavBar from './components/shared/BottomNavBar';
import GroupPage from './components/GroupPage';
import SearchGroupResults from './components/SearchGroupResults';
import GroupCriteriaPage from './components/GroupCriteriaPage';
import LeftNavBar from './components/shared/LeftNavBar';
import { EditGroupProfile } from './components/EditGroupProfile';
import BackButton from './components/shared/BackButton';
import { Login } from './components/Login';
import { ShowCriteriaPage } from './components/ShowCriteriaPage';
import { useLoader } from './useLoader';
import { fetchJSON } from './fetchJSON';
import React, { useContext, useEffect } from 'react';
import { GroupChat } from './components/GroupChat';
import { UserGroupsContext } from './store/UserGroupsContext';
import SearchUser from './components/SearchUser';

export const UserInfoContext = React.createContext();

const App = () => {
  const { data: userData } = useLoader(() => fetchJSON('/api/v1/user'));

  const { fetchData } = useContext(UserGroupsContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <UserInfoContext.Provider value={userData}>
        <BrowserRouter>
          <TopNavBar />
          <main className='bg-dark-6 flex'>
            <LeftNavBar />
            <div className='w-full h-screen overflow-scroll'>
              <div className='container mx-auto py-16 w-full'>
                <div className='hidden lg:block mb-8'>
                  <BackButton />
                </div>
                <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/' element={<GroupLinks />} />
                  <Route
                    path={'/searchGroup'}
                    element={<GroupCriteriaPage lookingForGroup={true} />}
                  />
                  <Route
                    path='/searchGroup/searchGroupResults'
                    element={<SearchGroupResults />}
                  />
                  <Route
                    path='/createGroup'
                    element={<GroupCriteriaPage createdGroup={true} />}
                  />
                  <Route path='/groups/:id' element={<GroupPage />} />
                  <Route
                    path='/groups/:id/members'
                    element={<GroupMembers />}
                  />
                  <Route path='/groups/:id/chat' element={<GroupChat />} />
                  <Route
                    path='/groups/specific/groupCriteria'
                    element={<ShowCriteriaPage />}
                  />
                  <Route
                    path='/groups/:id/profile'
                    element={<EditGroupProfile />}
                  />
                  <Route
                    path='/groups/:id/members/search'
                    element={<SearchUser />}
                  />
                  <Route path='/questions' element={<Questions />} />
                  <Route path='/profile' element={<ProfileMenu />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </main>
          <BottomNavBar />
        </BrowserRouter>
      </UserInfoContext.Provider>
    </>
  );
};

export default App;
