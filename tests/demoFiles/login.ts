import { Page } from '@playwright/test';

export class LoginElements {
   username = "username";
   password = "password";
   loginBtn = "Submit";
}   

export class LoginData {
    validUsername = "student";
    validPassword = "Password123";
    invalidUsername = "incorrectUser";
    invalidPassword = "incorrectPassword";
}

export class assertionElements {
    loginUrl = "https://practicetestautomation.com/practice-test-login/";
    loggedInUrl = "https://practicetestautomation.com/logged-in-successfully/";
    loginText = "Logged In Successfully";

    logoutURL = "https://practicetestautomation.com/practice-test-login/";
    logoutText = "Log out";
    logoutBtn = "Log out";
}

export class additionalAssertions {
    
}