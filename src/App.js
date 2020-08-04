import React, { useState, useEffect } from "react"; 
import { makeStyles } from "@material-ui/core/styles";
import { Router, Switch, Route, useHistory } from 'react-router-dom';  
import 'react-toastify/dist/ReactToastify.css'; 

import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import { interceptor } from './interceptor'; 
import utils from './helper/utils'; 

import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage'; 
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import CustomerList from './pages/CustomerList/CustomerList';
import NewCustomer from './pages/NewCustomer/NewCustomer';
import LoanType from './pages/LoanType/LoanType';
import NewLoanType from './pages/NewLoanType/NewLoanType';
import EditLoanType from './pages/EditLoanType/EditLoanType';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },   
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));



export default function App (props) {
  const history = useHistory();
  const [isHideSpinner, setIsHideSpinner] = useState(0);  
  const authExList = [
    'api/user/login',
    'api/user/',
  ]; 
  
  interceptor(authExList, (authData)=>{ 
    const {loaderIsHide, redirectTo} = authData;
    setIsHideSpinner(loaderIsHide);    
    if(redirectTo!=''){
      history.push(redirectTo);
    }
  });
  
  // this way equal to componentDidMount()
  useEffect(() => {  
    setIsHideSpinner(true); 
  },[]);
  
  const { window } = props;
  const classes = useStyles();   

  const container = window !== undefined ? () => window().document.body : undefined;

  return ( 
    <Router history={history}>
      <Switch> 
        <Route exact path="/signin" component={SignIn} />
        <Route path="/" exact component={HomePage} />
        <Route path="/customer-list" exact component={CustomerList} />
        <Route path="/new-customer" exact component={NewCustomer} />
        <Route path="/loantype-list" exact component={LoanType} />
        <Route path="/new-loan-type" exact component={NewLoanType} />
        <Route path="/edit-loan-type/:id" exact component={EditLoanType} />

        <Route component={ErrorPage} />
      </Switch>
      {isHideSpinner?'':<LoadingSpinner />}
    </Router>  
  );
}