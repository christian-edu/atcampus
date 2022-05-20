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
import { EditRoles } from './components/EditRoles';
import BackButton from './components/shared/BackButton';
import Breadcrumbs from './components/shared/Breadcrumbs';

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
                <Route path={'/'} element={<Navigate to='/groups' replace />} />
                <Route path={'/groups'} element={<GroupLinks />} />
                <Route
                  path={'/groups/search-group'}
                  element={<SearchGroup />}
                />
                <Route
                  path={'/groups/search-groups/results'}
                  element={<SearchGroupResults />}
                />
                <Route
                  path={'/groups/create-group'}
                  element={<GroupCriteriaPage createdGroup={true} />}
                />
                <Route path={'/groups/:name'} element={<GroupPage />} />
                <Route
                  path={'/groups/:name/criterias'}
                  element={<GroupCriteriaPage editGroup={true} />}
                />
                <Route
                  path={'/groups/:name/members'}
                  element={<GroupMembers />}
                />
                <Route
                  path={'/group/editProfile'}
                  element={<EditGroupProfile />}
                />
                <Route path={'/group/editRoles'} element={<EditRoles />} />
                <Route
                  path={'/groups/:name/members/search-users'}
                  element={<SearchUser />}
                />
                <Route
                  path={'/groups/:name/members/search-users/results'}
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
