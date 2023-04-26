import React from 'react';
import { ManageUsers } from '../Form';
import UsersList from './UsersList';
import { Logout } from '../Login';
import AppHeader from '../AppHeader';

/**
 * Users Component - Component that generates Users section for PASS
 *
 * @memberof GlobalComponents
 * @name UserSection
 */

const UserSection = () => (
  <>
    <AppHeader />
    <Logout />
    <ManageUsers />
    <UsersList />
  </>
);

export default UserSection;
