import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import {
	Image,
	ImageBackground,
	ImageSourcePropType,
	Text,
	View,
} from "react-native";

const TabIcon = ({
	label,
	icon,
	focused,
}: {
	label: string;
	icon: ImageSourcePropType;
	focused: boolean;
}) => {
	return focused ? (
		<ImageBackground
			source={images.highlight}
			className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden gap-2"
		>
			<Image source={icon} className="size-5" tintColor="#151312" />
			<Text className="text-secondary text-base font-semibold">
				{label}
			</Text>
		</ImageBackground>
	) : (
		<View className="size-full justify-center items-center mt-4 rounded-full">
			<Image source={icon} className="size-5" tintColor="#A8B5DB" />
		</View>
	);
};

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0F0D23",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					borderWidth: 1,
					borderColor: "#0F0D23",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							label="Home"
							icon={icons.home}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							label="Search"
							icon={icons.search}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="bookmarks"
				options={{
					title: "Bookmarks",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							label="Bookmarks"
							icon={icons.save}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							label="Profile"
							icon={icons.person}
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
