import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Components
import CategoryPills from "../../components/CategoryPills";
import BigHospitalCard from "../../components/BigHospitalCard";

// Data
import { hospitalsNearby, Hospital } from "../../services/mockData";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredData =
    activeCategory === "All"
      ? hospitalsNearby
      : hospitalsNearby.filter((h) => h.type === activeCategory);

  // --- THE NEW BNB HEADER ---
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Pill - Tuned for Medical Context */}
      <View style={styles.searchWrapper}>
        <TouchableOpacity style={styles.searchPill} activeOpacity={0.9}>
          <Ionicons
            name="search"
            size={20}
            color="#1F2937"
            style={styles.searchIcon}
          />
          <View style={styles.searchTextContainer}>
            <Text style={styles.searchTitle}>Find your doctor...</Text>
            <Text style={styles.searchSubtitle}>General • Dental • Ortho</Text>
          </View>

          {/* Filter Button */}
          <View style={styles.filterButton}>
            <Ionicons name="options-outline" size={16} color="#111" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.pillsSection}>
        <CategoryPills
          categories={["All", "Hospital", "Clinic", "Diagnostics"]}
          activeCategory={activeCategory}
          onCategoryPress={setActiveCategory}
        />
      </View>

      <Text style={styles.sectionTitle}>
        {activeCategory === "All"
          ? "Nearby Healthcare"
          : `Nearby ${activeCategory}s`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList<Hospital>
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BigHospitalCard
            name={item.name}
            rating={item.rating}
            time={item.time}
            location={item.location}
            type={item.type}
            status={item.status}
            image={item.image}
            onPress={() =>
              navigation.navigate("HospitalDetails", { id: item.id })
            }
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Clean White background like Airbnb
  },
  listContent: {
    paddingHorizontal: 20, // Wider luxurious padding
    paddingBottom: 100,
  },
  headerContainer: {
    paddingTop: 10,
    marginBottom: 10,
  },

  // Search Pill Styles
  searchWrapper: {
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30, // Fully rounded pill
    paddingVertical: 10,
    paddingHorizontal: 16,
    // Airbnb-style Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  searchSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  pillsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
});
