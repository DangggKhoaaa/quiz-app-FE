import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./home/LoginScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from "./home/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitle: 'Home',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="Đăng nhập"
          component={LoginScreen}
          options={{
            headerTitle: 'Đăng nhập',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24
            }
          }}
        />
        <Stack.Screen
          name="Đăng ký"
          component={SignupScreen}
          options={{
            headerTitle: 'Đăng ký',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


