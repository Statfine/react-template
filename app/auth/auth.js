import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from '../components/LoadingIndicator'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.getIn(['app', 'logined']),
  authenticatingSelector: state => state.getIn(['app', 'logined']),
  wrapperDisplayName: 'UserIsAuthenticated',
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

// 需登录后才能打开的页面,否则重定向到 /login
export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/',
})

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => !state.getIn(['app', 'logined']),
  predicate: user => user.isAdmin,
  wrapperDisplayName: 'UserIsAdmin',
})

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: (state) => !state.getIn(['app', 'logined']),
  wrapperDisplayName: 'UserIsNotAuthenticated',
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

// 未登录才能打开，否则重新向到 ／
export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
})