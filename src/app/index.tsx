import { Image, ScrollView, View } from "react-native";

const imagens = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/400/300?random=${i + 1}`
);

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="items-center gap-4 p-4">
        {imagens.map((imagem, index) => (
          <Image
            key={index}
            source={{ uri: imagem }}
            className="w-full  h-60 rounded-md"
          />
        ))}
      </View>
    </ScrollView>
  );
}
