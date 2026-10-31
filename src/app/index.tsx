import { memo, useCallback } from 'react';
import { useWindowDimensions, View, StatusBar, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Carousel } from 'react-native-reanimated-carousel';

type Produto = {
  id: string;
  title?: string;
  produto?: string;
  valor?: number;
  ativo?: boolean;
};

const PRODUTOS: Produto[] = [
  { id: '1', title: 'Saco de Arroz', produto: 'Arroz - Parbolizado', valor: 100, ativo: false },
  { id: '2', title: 'Card 2', produto: 'Arroz', valor: 100, ativo: false },
  { id: '3', title: 'Card 3', produto: 'Arroz', valor: 100, ativo: false },
  { id: '4', title: 'Card 4', produto: 'Arroz', valor: 100, ativo: true },
];

const PARALLAX = { parallaxScrollingScale: 0.1, parallaxScrollingOffset: 50 };

const Card = memo(function Card({ title, produto, valor, ativo }: Produto) {
  return (
    <View className="m-2 rounded-xl border border-black bg-white p-2 shadow-xl">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold">{title}</Text>
        <Text className="rounded-full bg-green-400 p-3 text-md font-semibold">
          {ativo ? 'Ativo' : 'Inativo'}
        </Text>
      </View>

      <Text className="mt-2 text-md font-semibold text-gray-500">Produto: {produto}</Text>

      <View className="mt-4 rounded-xl bg-gray-200 p-4 shadow-xl">
        <Text className="text-2xl font-bold text-gray-900">R$ {valor}</Text>
        <Text className="mt-1 text-sm text-gray-500">valor total</Text>
      </View>

      <Pressable className="mt-5 w-full rounded-xl bg-blue-500 p-5">
        <Text className="text-center font-semibold text-white">Ver detalhes</Text>
      </Pressable>
    </View>
  );
});

export default function App() {
  const { width } = useWindowDimensions();

  const renderItem = useCallback(({ item }: { item: Produto }) => <Card {...item} />, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <SafeAreaView className="flex-1 bg-primaria">
          <View className="h-[250px] bg-black">
            <Carousel
              loop
              autoplay={true}
              width={width}
              heigth={250}
              data={PRODUTOS}
              mode="parallax"
              modeConfig={PARALLAX}
              renderItem={renderItem}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
