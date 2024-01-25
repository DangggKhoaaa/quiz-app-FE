import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./home/LoginScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from "./home/SignupScreen";
import ClassName from "./home/ClassName";
import Subject from "./home/Subject";
import Quiz from "./home/Quiz";
import Question from "./home/Question";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Class" component={ClassName} options={{ headerShown: false }} />
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
        <Stack.Screen
          name="Môn học"
          component={Subject}
          options={{
            headerTitle: 'Môn học',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24
            }
          }}
        />
        <Stack.Screen
          name="Chương"
          component={Quiz}
          options={{
            headerTitle: 'Chương',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24
            }
          }}
        />
        <Stack.Screen
          name="Câu hỏi"
          component={Question}
          options={{
            headerTitle: 'Câu hỏi',
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


