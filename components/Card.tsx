import { globals } from "@/constants/globals";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Card = ({
	id,
	poster_path,
	title,
	vote_average,
	release_date,
}: Movie) => {
	return (
		<Link href={`/movies/${id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				<Image
					source={{
						uri: poster_path
							? `${globals.TMBD_IMAGE_BASEPATH}${poster_path}`
							: globals.PLACEHOLDER_IMAGE_URL,
					}}
					className="w-full h-52 rounded-lg"
					resizeMode="cover"
				/>
				<Text className="text-white text-sm font-bold my-2 line-clamp-1">
					{title}
				</Text>
				<View className="flex-row justify-between items-center">
					<View className="flex-row gap-2">
						<Image source={icons.star} className="size-5" />
						<Text className="text-xs text-light-300 font-medium">
							{Math.round(vote_average / 2)}
						</Text>
					</View>
					<Text className="text-xs text-light-300 font-medium">
						{release_date?.split("-")[0] ?? "N/A"}
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default Card;
