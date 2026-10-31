import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Tarefa, TodoStore} from "@/types/tarefa";



export const useTodoStore = create<TodoStore>() (
  persist(
    (set, get) => ({
        tarefas: [],
        txt: "",

        adicionar() {
           const texto = get().txt.trim();
            if(!texto) return; 
            const nova: Tarefa= {
              id: Date.now().toString(),
              text: texto,
              concluida: false,
            };

            set((state) => ({
               tarefas: [nova, ...state.tarefas],
            })),
            set({ txt: "" });
        },//adicionar

        alternar(id: string) {
          set((state) => ({
             tarefas: state.tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t),
          }));
        },//alternar

        remover(id: string) {
          set((state) => ({
            tarefas: state.tarefas.filter(t => t.id !== id), 
          }));
        },//remover

        limpa() {
          set({  txt: ""});
        },

        setTxt(t: string) {
          set({ txt: t });
        },

    }), //set 
    {
      name: "store-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }

  )//persist
);//useTodoStore
     
