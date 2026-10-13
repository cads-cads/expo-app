import React, { useMemo, useState } from "react";
import {
   ScrollView, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View, ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Stream = {
  id: string;
  creator: string;
  title: string;
  category: string;
  viewers: string;
  color: string;
  initials: string;
  live: boolean;
};

const streams: Stream[] = [
  { id: "1", creator: "NinaPlays", title: "Zerando o boss hoje 🔥", category: "RPG", viewers: "2,4 mil", color: "#4D2A72", initials: "NP", live: true },
  { id: "2", creator: "GuiFPS", title: "Ranked até pegar Mestre", category: "FPS", viewers: "986", color: "#174E58", initials: "GF", live: true },
  { id: "3", creator: "PixelCafe", title: "Jogos indie e conversa", category: "Just Chatting", viewers: "421", color: "#7A3B38", initials: "PC", live: true },
  { id: "4", creator: "LuaCosplay", title: "Montando um cenário novo", category: "Criatividade", viewers: "178", color: "#55452A", initials: "LC", live: false },
];

const categories = ["Para você", "Seguindo", "Jogos", "Música", "Ao vivo"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Para você");
  const [search, setSearch] = useState("");
  const [followed, setFollowed] = useState<string[]>(["NinaPlays"]);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { user: "mod_ana", message: "Bem-vindos à live! 💜" },
    { user: "pedro123", message: "Salve, chat!" },
    { user: "gamerBR", message: "Esse jogo é muito bom" },
  ]);

  const visibleStreams = useMemo(() => streams.filter((stream) => {
    const matchesSearch = `${stream.creator} ${stream.title} ${stream.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory !== "Seguindo" || followed.includes(stream.creator);
    const matchesLive = activeCategory !== "Ao vivo" || stream.live;
    return matchesSearch && matchesCategory && matchesLive;
  }), [activeCategory, followed, search]);

  const toggleFollow = (creator: string) => {
    setFollowed((current) => current.includes(creator)
      ? current.filter((name) => name !== creator)
      : [...current, creator]);
  };

  const sendMessage = () => {
    const trimmed = chatMessage.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { user: "voce", message: trimmed }]);
    setChatMessage("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0B13" />
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logo}><Text style={styles.logoText}>L</Text></View>
          <Text style={styles.brand}>livewave</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={() => alert("Login será conectado na próxima etapa.")}>
          <Text style={styles.avatarText}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>SEU PRÓXIMO MOMENTO FAVORITO</Text>
        <Text style={styles.heroTitle}>Ao vivo. Do seu jeito.</Text>
        <Text style={styles.heroSubtitle}>Descubra criadores, acompanhe comunidades e entre na conversa.</Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar canais, jogos e criadores"
            placeholderTextColor="#8D8797"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[styles.categoryPill, activeCategory === category && styles.categoryPillActive]}
            >
              <Text style={[styles.categoryText, activeCategory === category && styles.categoryTextActive]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedStream ? (
          <View style={styles.playerPanel}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedStream(null)}>
              <Text style={styles.backText}>‹  Voltar às lives</Text>
            </TouchableOpacity>
            <View style={[styles.playerMock, { backgroundColor: selectedStream.color }]}>
              <View style={styles.playCircle}><Text style={styles.playTriangle}>▶</Text></View>
              <Text style={styles.playerLabel}>PRÉVIA DO PLAYER</Text>
              <Text style={styles.playerNote}>A reprodução real será conectada ao HLS nesta etapa.</Text>
            </View>
            <Text style={styles.streamTitle}>{selectedStream.title}</Text>
            <Text style={styles.muted}>{selectedStream.creator} · {selectedStream.category} · {selectedStream.viewers} espectadores</Text>
            <TouchableOpacity style={styles.followButton} onPress={() => toggleFollow(selectedStream.creator)}>
              <Text style={styles.followButtonText}>{followed.includes(selectedStream.creator) ? "✓ Seguindo" : "+ Seguir canal"}</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Chat da live</Text>
            <View style={styles.chatBox}>
              {messages.map((item, index) => (
                <Text key={`${item.user}-${index}`} style={styles.chatLine}>
                  <Text style={styles.chatUser}>{item.user}: </Text>{item.message}
                </Text>
              ))}
            </View>
            <View style={styles.chatComposer}>
              <TextInput
                value={chatMessage}
                onChangeText={setChatMessage}
                placeholder="Envie uma mensagem"
                placeholderTextColor="#8D8797"
                style={styles.chatInput}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
              />
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}><Text style={styles.sendText}>Enviar</Text></TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lives para descobrir</Text>
              <Text style={styles.liveCount}>{visibleStreams.filter((s) => s.live).length} AO VIVO</Text>
            </View>
            {visibleStreams.length === 0 ? (
              <View style={styles.emptyState}><Text style={styles.emptyTitle}>Nada por aqui ainda</Text><Text style={styles.muted}>Tente outra busca ou categoria.</Text></View>
            ) : visibleStreams.map((stream) => (
              <TouchableOpacity key={stream.id} style={styles.streamCard} onPress={() => setSelectedStream(stream)}>
                <View style={[styles.thumbnail, { backgroundColor: stream.color }]}>
                  <View style={styles.thumbnailGlow} />
                  <Text style={styles.thumbnailInitials}>{stream.initials}</Text>
                  {stream.live && <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>● AO VIVO</Text></View>}
                  <Text style={styles.viewerBadge}>{stream.viewers}</Text>
                </View>
                <View style={styles.streamInfo}>
                  <View style={styles.creatorAvatar}><Text style={styles.creatorAvatarText}>{stream.initials.slice(0, 1)}</Text></View>
                  <View style={styles.streamCopy}>
                    <Text style={styles.streamTitle} numberOfLines={2}>{stream.title}</Text>
                    <Text style={styles.muted}>{stream.creator}</Text>
                    <Text style={styles.categoryLabel}>{stream.category}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleFollow(stream.creator)} style={styles.miniFollow}>
                    <Text style={styles.miniFollowText}>{followed.includes(stream.creator) ? "✓" : "+"}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
        <View style={styles.footer}><Text style={styles.footerText}>LIVEWAVE · PROTÓTIPO INICIAL</Text><Text style={styles.footerSub}>Lives de demonstração · sem transmissão real ainda</Text></View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => { setSelectedStream(null); setActiveCategory("Para você"); }}><Text style={styles.navIcon}>⌂</Text><Text style={styles.navLabelActive}>Início</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveCategory("Ao vivo")}><Text style={styles.navIcon}>◉</Text><Text style={styles.navLabel}>Ao vivo</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveCategory("Seguindo")}><Text style={styles.navIcon}>♡</Text><Text style={styles.navLabel}>Seguindo</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => alert("Tela de perfil/login será adicionada na próxima etapa.")}><Text style={styles.navIcon}>◎</Text><Text style={styles.navLabel}>Perfil</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0E0B13" },
  header: { height: 62, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#292331" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  logo: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#9147FF", alignItems: "center", justifyContent: "center" },
  logoText: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  brand: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", letterSpacing: -0.5 },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#30283A", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#51465F" },
  avatarText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  content: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 28 },
  eyebrow: { color: "#B68AFF", fontSize: 10, letterSpacing: 2, fontWeight: "800" },
  heroTitle: { color: "#FFFFFF", fontSize: 32, lineHeight: 38, fontWeight: "900", letterSpacing: -1.2, marginTop: 8 },
  heroSubtitle: { color: "#AAA2B5", fontSize: 14, lineHeight: 21, marginTop: 8, maxWidth: 340 },
  searchBox: { marginTop: 20, height: 48, borderRadius: 13, backgroundColor: "#1D1824", borderWidth: 1, borderColor: "#342A40", flexDirection: "row", alignItems: "center", paddingHorizontal: 13 },
  searchIcon: { color: "#B68AFF", fontSize: 25, marginRight: 9 },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 13 },
  categoryRow: { gap: 8, paddingVertical: 18 },
  categoryPill: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20, backgroundColor: "#1D1824", borderWidth: 1, borderColor: "#332A3D" },
  categoryPillActive: { backgroundColor: "#9147FF", borderColor: "#9147FF" },
  categoryText: { color: "#B7AFC1", fontSize: 12, fontWeight: "700" },
  categoryTextActive: { color: "#FFFFFF" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4, marginBottom: 13 },
  sectionTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", marginTop: 18, marginBottom: 12 },
  liveCount: { color: "#FF6A8A", fontSize: 10, letterSpacing: 1, fontWeight: "900" },
  streamCard: { backgroundColor: "#17121D", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#2A2232", marginBottom: 15 },
  thumbnail: { height: 174, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  thumbnailGlow: { position: "absolute", width: 190, height: 190, borderRadius: 95, backgroundColor: "rgba(255,255,255,0.06)", top: -75, right: -20 },
  thumbnailInitials: { color: "rgba(255,255,255,0.88)", fontSize: 52, fontWeight: "900", letterSpacing: -3 },
  liveBadge: { position: "absolute", top: 12, left: 12, backgroundColor: "#F04468", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 5 },
  liveBadgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "900" },
  viewerBadge: { position: "absolute", right: 12, bottom: 12, backgroundColor: "rgba(10,8,14,0.72)", color: "#FFFFFF", overflow: "hidden", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 5, fontSize: 10, fontWeight: "700" },
  streamInfo: { flexDirection: "row", alignItems: "flex-start", padding: 13, gap: 10 },
  creatorAvatar: { width: 37, height: 37, borderRadius: 19, backgroundColor: "#342345", alignItems: "center", justifyContent: "center" },
  creatorAvatarText: { color: "#D8BFFF", fontSize: 17, fontWeight: "800" },
  streamCopy: { flex: 1 },
  streamTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", lineHeight: 20 },
  muted: { color: "#92899D", fontSize: 11, marginTop: 5 },
  categoryLabel: { color: "#C7B0E7", fontSize: 10, marginTop: 7, backgroundColor: "#2A2036", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  miniFollow: { width: 30, height: 30, borderRadius: 9, backgroundColor: "#30213F", alignItems: "center", justifyContent: "center" },
  miniFollowText: { color: "#CBAAFF", fontSize: 20, fontWeight: "700" },
  emptyState: { borderWidth: 1, borderColor: "#302638", borderRadius: 14, padding: 24, alignItems: "center" },
  emptyTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  footer: { paddingVertical: 28, alignItems: "center" },
  footerText: { color: "#8D7B9E", fontSize: 9, letterSpacing: 2, fontWeight: "900" },
  footerSub: { color: "#62596C", fontSize: 10, marginTop: 6 },
  bottomNav: { height: 65, backgroundColor: "#15101B", borderTopWidth: 1, borderTopColor: "#2B2233", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 4 },
  navItem: { alignItems: "center", justifyContent: "center", gap: 3, minWidth: 55 },
  navIcon: { color: "#B68AFF", fontSize: 21 },
  navLabel: { color: "#82798D", fontSize: 9, fontWeight: "600" },
  navLabelActive: { color: "#D9C0FF", fontSize: 9, fontWeight: "800" },
  playerPanel: { marginBottom: 20 },
  backButton: { alignSelf: "flex-start", paddingVertical: 8 },
  backText: { color: "#C7A8FF", fontSize: 13, fontWeight: "700" },
  playerMock: { height: 210, borderRadius: 14, alignItems: "center", justifyContent: "center", padding: 20, overflow: "hidden" },
  playCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.45)" },
  playTriangle: { color: "#FFFFFF", fontSize: 22, marginLeft: 4 },
  playerLabel: { color: "#FFFFFF", fontSize: 10, fontWeight: "900", letterSpacing: 2, marginTop: 12 },
  playerNote: { color: "#F0E7FA", fontSize: 10, marginTop: 6, textAlign: "center" },
  followButton: { backgroundColor: "#9147FF", borderRadius: 10, alignItems: "center", paddingVertical: 12, marginTop: 13 },
  followButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
  chatBox: { backgroundColor: "#17121D", borderWidth: 1, borderColor: "#2A2232", borderRadius: 12, padding: 12, gap: 10 },
  chatLine: { color: "#D9D2E2", fontSize: 12, lineHeight: 17 },
  chatUser: { color: "#C59BFF", fontWeight: "800" },
  chatComposer: { flexDirection: "row", gap: 8, marginTop: 9 },
  chatInput: { flex: 1, backgroundColor: "#211A2A", borderRadius: 10, paddingHorizontal: 12, color: "#FFFFFF", fontSize: 12, minHeight: 42 },
  sendButton: { backgroundColor: "#9147FF", paddingHorizontal: 13, borderRadius: 10, justifyContent: "center" },
  sendText: { color: "#FFFFFF", fontWeight: "800", fontSize: 12 },
});
