import {useTodoStore} from "@/store/useTodoStore";
import {useState} from "react";
import {TouchableOpacity} from "react-native";
import {FlatList, Pressable, Text, TextInput, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import type { Tarefa } from "@/store/useTodoStore";


const App = () => { 
  const adicionar = useTodoStore((s) => s.adicionar);
  const remover = useTodoStore((s) => s.remover);
  const alternar = useTodoStore((s) => s.alternar);
  const setTexto = useTodoStore((s) => s.setTxt );
  const tarefas = useTodoStore((s) => s.tarefas);
  const txt = useTodoStore((s) =>s.txt);

const rende = ({id, text, concluida}: Tarefa) => {
  return(
    <View className="flex-row justify-between items-center gap-2 w-full  bg-white p-3 rounded-md">
     <TouchableOpacity onPress={() => alternar(id)}>
      <Text className={`font-bold text-2xl ${ concluida ? 'line-through' : '' } `}>
        {concluida ? "OK" : ""} {text}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => remover(id)}  className="bg-primaria p-2 rounded-md">
        <Text className="text-2xl text-white font-bold">X</Text>
    </TouchableOpacity>
   </View>
  );
}

  return(
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primaria items-center p-3">
          <Text className="text-3xl text-white font-bold mb-5">Bem vindo ao todo list</Text>          
           {/* INPUT */}
          <View className="flex-row w-full  gap-2  mb-5">
              <TextInput
                value={txt}
                onChangeText={setTexto}
                className="bg-white flex-1 rounded-md pl-5"
                placeholder="Digite tarefa enter"
              
              />
              <Pressable onPress={adicionar} className="bg-black w-20 items-center justify-center p-3 rounded-xl">
                  <Text className="text-3xl text-white ">+</Text>
              </Pressable>
          </View>
          {/* FlatList */}
          <FlatList
            data={tarefas}
            keyExtractor={item => item.id }
            contentContainerClassName="gap-2 bg-blue"
            renderItem={({ item }) => rende(item) }
          
          />
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}

export default App;
