import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingMovie = ({
	movie: { movie_id, poster_url, title },
	index,
}: TrendingCardProps) => {
	return (
		<Link href={`/movies/${movie_id}`} asChild className="my-6">
			<TouchableOpacity className="w-48 mx-8 h-72 relative">
				<Image
					source={{ uri: poster_url }}
					className="w-48 h-60 rounded-xl"
					resizeMode="cover"
				/>
				<Text className="text-white text-md font-bold mt-2 line-clamp-2">
					{title}
				</Text>
				<View className="absolute bottom-10 -left-10 px-3 py-1">
					<MaskedView
						maskElement={
							<Text className="text-5xl font-black text-white">
								{index + 1}
							</Text>
						}
					>
						<Image
							source={images.rankingGradient}
							className="size-16"
							resizeMode="cover"
						></Image>
					</MaskedView>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default TrendingMovie;
