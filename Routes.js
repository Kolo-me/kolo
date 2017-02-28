'use strict';

 
import Home from './src/pages/Home';
import Login from './src/pages/login';
import Signup from './src/pages/signup';
import Addwords from './src/pages/Addwords'; 
import Profile from './src/pages/Profile'; 
import SellectGroup from './src/pages/SellectGroup'; 

class Routes {
  get(route, args) {
    if ("undefined" == typeof this[route]) {
      console.warn("No route found with name: " + route);
      return false;
    } else {
      return this[route].call(this, args);
    }
  }


  
    SellectGroup() {
    return {
      name: "SellectGroup",      
      component: SellectGroup,
 
    }
  }

   Home(fav) {
    var favorite;
    favorite=fav;
    return {
      name: "Home",  
      component: Home,
      passProps: { favorite: favorite },     
    }
  }
    Profile() {
    return {
      name: "Profile",      
      component: Profile,
 
    }
  }
    Login() {
    return {
      name: "Login",      
      component: Login,
 
    }
  }
  Signup() {
  return {
  name: "Signup",      
  component: Signup,
   }
  }
  Addwords() {
  return {
    name: "Addwords",      
    component: Addwords,
   }
  }

  
}

export default new Routes()
