import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface searchProps {
	placeholder: string;
	onPress: () => void;
	value?: string;
	onChange?: (text: string) => void;
}

const SearchBar = ({
	onPress,
	placeholder,
	value = "",
	onChange = () => {},
}: searchProps) => {
	return (
		<View className="flex-row items-center gap-2 mx-10 my-2 w-full">
			<Image source={icons.search} tintColor="#ab8bff" />
			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				placeholderTextColor="#ab8bff"
				value={value}
				onChangeText={onChange}
				className="w-4/5 h-full text-white"
			/>
		</View>
	);
};

export default SearchBar;
