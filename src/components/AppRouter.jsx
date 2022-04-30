import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profilepage'
import ProtectedPage from '../pages/ProtectedPage'
import Registerpage from '../pages/Registerpage'
import DashboardPage from '../pages/DashboardPage'
import NewDraftPage from '../pages/NewDraftPage'
import ArticlePage from '../pages/ArticlePage'
import OutlinePage from '../pages/OutlinePage'


import ResetPasswordPage from '../pages/ResetPasswordPage'
import { useAuth } from '../contexts/AuthContext'

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/login' component={Loginpage} />
          <ProtectedRoute exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/protected-page' component={ProtectedPage} />
          <ProtectedRoute exact path='/dashboard-page' component={DashboardPage} />


          <ProtectedRoute exact path='/new-draft' component={NewDraftPage} />
          <ProtectedRoute exact path='/outline' component={OutlinePage} />

          <Route path='/user/:uid/article/:articleId' component={ArticlePage} />

          <ProtectedRoute exact path='/forgot-password' component={ForgotPasswordPage} />
          <ProtectedRoute exact path='/reset-password' component={ResetPasswordPage} />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props){
  const { currentUser } = useAuth()
  const location = useLocation()
  const { path } = props

  // do not show these pages to any logged in users, instead redirect to profile
  if(
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ){
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/profile'} />
    ) : (
      <Route {...props} />
    )
  }

  return currentUser ? <Route {...props}/> : <Redirect to={{
    pathname: '/login',
    state: {from: path}
  }}/>
}
