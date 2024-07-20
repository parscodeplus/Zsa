"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RIJ7hsj9nLs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { JSX, SVGProps } from "react"
import { InsertDurationForm } from "@/components/insert-duration"
import  {CustomFeaturesAccordion} from "@/components/admin-panel/ui/custom-feature/CustomFeaturesAccordion"
import React from "react"
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

export default function Login() {
  const [features, setFeatures] = React.useState<Feature[]>(mockFeatures);

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
      <CustomFeaturesAccordion featureGroups={featureGroups} onToggleFeature={handleToggleFeature} />;
    
        {/* <InsertDurationForm /> */}
      {/* <div className="flex flex-col items-center space-y-2">
        <Link href="#" className="flex items-center space-x-2" prefetch={false}>
          <HomeIcon className="h-6 w-6" />
          <span className="font-bold">shadcn</span>
        </Link>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Login</Button>
          <Separator />
          <Link href="#" className="w-full" prefetch={false}>
            <Button variant="outline" className="w-full">
              Login with GitHub
            </Button>
          </Link>
          <Link href="#" className="w-full" prefetch={false}>
            <Button variant="outline" className="w-full">
              Create new account
            </Button>
          </Link>
        </div>
      </div> */}
    </div>
  )
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}