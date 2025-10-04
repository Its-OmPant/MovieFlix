import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmarks = () => {
	return (
		<SafeAreaView className="bg-primary flex-1 justify-center items-center">
			<Text className="text-white">Bookmarks Page</Text>
		</SafeAreaView>
	);
};

export default Bookmarks;
