import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebScreen from '../screens/WebScreen';
import PracticeScreen from '../screens/PracticeScreen';


/////////////////////////////////////////////////

export default createBottomTabNavigator(
  {
    Home: WebScreen
  },
  /**
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        //let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName2 = 'md-information-circle';
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          //IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
          iconName2 = 'md-options';
        } else if (routeName === 'Practice') {
          iconName = `ios-link`;
		  iconName2 = 'md-link';
        }

        You can return any component that you like here!
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? {iconName} : {iconName2}}
         />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
  **/
);
