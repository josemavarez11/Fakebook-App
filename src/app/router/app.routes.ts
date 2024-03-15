import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('../views/login-view/login-view.page').then((m) => m.LoginPage),

  },
  {
    path: 'feed',
    loadComponent: () => import('../views/feed-view/feed-view.page').then( m => m.FeedViewPage)
  },
  {
    path: 'register',
    loadComponent: () => import('../views/register-view/register-view.page').then( m => m.RegisterViewPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('../views/welcome-view/welcome-view.page').then( m => m.WelcomeViewPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('../views/change-password-view/change-password-view.page').then( m => m.ChangePasswordViewPage)
  },
  {
    path: 'change-email',
    loadComponent: () => import('../views/change-email-view/change-email-view.page').then( m => m.ChangeEmailViewPage)
  },
  {
    path: 'change-name',
    loadComponent: () => import('../views/change-name-view/change-name-view.page').then( m => m.ChangeNameViewPage)
  },
  {
    path: 'delete-account',
    loadComponent: () => import('../views/delete-account-view/delete-account-view.page').then( m => m.DeleteAccountViewPage)
  },
  {
    path: 'user-settings',
    loadComponent: () => import('../views/user-settings-view/user-settings-view.page').then( m => m.UserSettingsViewPage)
  },
  {
    path: 'search',
    loadComponent: () => import('../views/search-view/search-view.page').then( m => m.SearchViewPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('../views/notifications-view/notifications-view.page').then( m => m.NotificationsViewPage)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('../views/user-profile-view/user-profile-view.page').then( m => m.UserProfileViewPage)
  },
  {
    path: 'new-post',
    loadComponent: () => import('../views/new-post-view/new-post-view.page').then( m => m.NewPostViewPage)
  },
  {
    path: 'log-out',
    loadComponent: () => import('../views/log-out/log-out.page').then( m => m.LogOutPage)
  },
  {
    path: 'user-profile-friend',
    loadComponent: () => import('../views/user-profile-friend/user-profile-friend.page').then( m => m.UserProfileFriendPage)
  },

];
