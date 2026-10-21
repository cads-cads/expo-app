import "../../global.css";
import { Stack } from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {router} from "expo-router";

export default function RootLayout() {
  return(
    <Stack initialRouteName="index" screenOptions={{ 

      headerStyle: {
        backgroundColor: "blue",
      },
      headerTitleStyle: {
        fontSize: 30,
        color: "white",
      },
      headerTitleAlign: "center",
      animation: "slide_from_right",
      animationDuration: 300
      }}>
      <Stack.Screen
          name="sobre"
          options={{
            title: "Sobre",
            headerTintColor: "white"
          }}
        />
      <Stack.Screen 
        name="index"
        options={{
          headerShown: true,
          headerTintColor: "white",
          title: "Index",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/sobre")}>
              <Ionicons 
                  name="information-circle-outline"
                  size={30}
                  color={"white"}/>
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  );
}
