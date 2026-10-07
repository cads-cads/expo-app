import { Link } from "expo-router";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
  return (
   //<View className="flex-1 items-center justify-center gap-4 bg-slate-100">
      <View className="w-30 overflow-hidden border-4 border-red-300  h-60 flex-row  m-2 rounded-md justify-between  items-center justify-center  bg-black">
          <TextInput 
            className="flex-1  mx-2  h-10 rounded-t-sm  bg-white"
          />
          <Pressable 
                className="pl-2 mr-2 rounded-sm py-2  w-20 h-10 bg-blue-600  flex  justify-center items-center">
              <Text >Enviar</Text>
          </Pressable>
      </View>
   //</View>
  );
}


