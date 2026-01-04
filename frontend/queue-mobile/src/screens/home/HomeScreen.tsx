// src/screens/home/HomeScreen.tsx
import React, { useMemo, useState } from "react";
import { View } from "react-native";

import Screen from "../../components/Screen";
import SearchInput from "../../components/SearchInput";
import CategoryPills, { Category } from "../../components/CategoryPills";
import Section from "../../components/Section";
import HorizontalHospitalList from "../../components/HorizontalHospitalList";
import EmptyState from "../../components/EmptyState";

import { hospitalsNearby } from "../../services/mockData";
import { spacing } from "../../theme";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filteredHospitals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hospitalsNearby.filter((h) => {
      const matchCategory =
        activeCategory === "All" || h.type === activeCategory;
      const matchQuery =
        q.length === 0 ||
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  return (
    <Screen scroll>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search hospitals, clinics…"
      />

      <View style={{ marginTop: spacing.sm }}>
        <CategoryPills active={activeCategory} onChange={setActiveCategory} />
      </View>

      <Section title="Available today near Dehradun">
        {filteredHospitals.length ? (
          <HorizontalHospitalList data={filteredHospitals} />
        ) : (
          <EmptyState
            title="No hospitals found"
            subtitle="Try a different search or category"
          />
        )}
      </Section>

      {/* spacing so content doesn't hide behind tab */}
      <View style={{ height: spacing.xl }} />
    </Screen>
  );
}
