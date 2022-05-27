import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GroupLinks from './components/GroupLinks';
import SearchGroup from './components/SearchGroup';
import GroupMembers from './components/GroupMembers';
import Questions from './components/Questions';
import ProfileMenu from './components/shared/ProfileMenu';
import Footer from './components/shared/Footer';
import TopNavBar from './components/shared/TopNavBar';
import BottomNavBar from './components/shared/BottomNavBar';
import GroupPage from './components/GroupPage';
import SearchUser from './components/SearchUser';
import SearchGroupResults from './components/SearchGroupResults';
import SearchUserResults from './components/SearchUserResults';
import GroupCriteriaPage from './components/GroupCriteriaPage';
import LeftNavBar from './components/shared/LeftNavBar';
import { EditGroupProfile } from './components/EditGroupProfile';
import BackButton from './components/shared/BackButton';
import Breadcrumbs from './components/shared/Breadcrumbs';
import {Login} from "./components/Login";
import {ShowCriteriaPage} from "./components/ShowCriteriaPage";



const App = () => {



  return (
    <>
      <BrowserRouter>
        <TopNavBar />
        <main className='bg-dark-6 flex'>
          <LeftNavBar />
          <div className='w-full h-screen overflow-scroll'>
            <div className='container mx-auto py-16 w-full'>
              <div className='hidden lg:block mb-8'>
                <BackButton />
              </div>
              <Breadcrumbs />
              <Routes>
                <Route path={'/'} element={<GroupLinks />} />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/searchGroup'} element={<SearchGroup />} />
                <Route
                  path={'/searchGroup/searchGroupResults'}
                  element={<SearchGroupResults />}
                />
                <Route
                  path={'/createGroup'}
                  element={<GroupCriteriaPage createdGroup={true} />}
                />
                <Route path={'/group/specific'} element={<GroupPage />} />
                <Route
                  path={'/groups/specific/groupCriteria'}
                  element={<ShowCriteriaPage/>}
                />
                <Route path={'/group/members'} element={<GroupMembers />} />
                <Route
                  path={'/groups/specific/editProfile'}
                  element={<EditGroupProfile />}
                />
                <Route
                  path={'/group/members/searchUser'}
                  element={<SearchUser />}
                />
                <Route
                  path={'/group/members/searchUser/searchUserResults'}
                  element={<SearchUserResults />}
                />
                <Route path={'/questions'} element={<Questions />} />
                <Route path={'/profile'} element={<ProfileMenu />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </main>
        <BottomNavBar />
      </BrowserRouter>
    </>
  );
};

export default App;
