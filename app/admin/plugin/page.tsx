"use client";
import  {CustomFeaturesAccordion} from "@/components/admin-panel/ui/custom-feature/CustomFeaturesAccordion"
import * as React from "react"
import { useState } from "react"
import { Feature, FeatureGroup } from "@/components/admin-panel/ui/custom-feature/FeatureItem"
const mockFeatures: Feature[] = [
  {
    id: "1",
    title: "News",
    shortDesc: "Latest updates and news.",
    longDesc: "Detailed description about the news feature.",
    image: "https://via.placeholder.com/150",
    status: "FREE",
    isActive: false,
    groupId: "group1"
  },
  {
    id: "2",
    title: "Popular Feature",
    shortDesc: "This is a popular feature.",
    longDesc: "Detailed description about the popular feature.",
    image: "https://via.placeholder.com/150",
    status: "POPULAR",
    isActive: false,
    groupId: "group2"
  },
  {
    id: "3",
    title: "Marketing Tool",
    shortDesc: "Tool for marketing purposes.",
    longDesc: "Detailed description about the marketing tool.",
    image: "https://via.placeholder.com/150",
    status: "MARKETING",
    isActive: false,
    groupId: "group2"
  },
  {
    id: "4",
    title: "New Feature",
    shortDesc: "This is a new feature.",
    longDesc: "Detailed description about the new feature.",
    image: "https://via.placeholder.com/150",
    status: "NEW",
    isActive: false,
    groupId: "group1"
  },
  // Add more mock features as needed
];

const mockFeatureGroups: FeatureGroup[] = [
  {
    id: "group1",
    name: "Group 1",
    features: mockFeatures.filter(f => f.groupId === "group1"),
  },
  {
    id: "group2",
    name: "Group 2",
    features: mockFeatures.filter(f => f.groupId === "group2"),
  },
  // Add more groups as needed
];

 

const Page = () => {

  const [features, setFeatures] = useState<Feature[]>(mockFeatures);

  const handleToggleFeature = (id: string, isActive: boolean) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === id ? { ...feature, isActive } : feature
      )
    );
  };

  const featureGroups = mockFeatureGroups.map(group => ({
    ...group,
    features: features.filter(feature => feature.groupId === group.id)
  }));
  return (
    <div className="grid min-h-screen place-items-center gap-4 px-4">
 <CustomFeaturesAccordion featureGroups={featureGroups} onToggleFeature={handleToggleFeature} />
 </div>
  )
}

export default Page
