import { globals } from "@/constants/globals";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const formatTimeFromRuntime = (runtime: number | null): string => {
	if (!runtime) {
		return "n/a";
	}
	const hours = Math.trunc(runtime / 60);
	const minutes = runtime % 60;

	return `${hours}hr ${minutes}m`;
};

const MovieInfo = ({ label, value }: MovieInfoProp) => {
	return (
		<View className="flex-col gap-2">
			<Text className="text-white text-lg mt-4">{label}</Text>
			<Text className="text-light-200 text-md ">{value ?? "n/a"}</Text>
		</View>
	);
};
const MovieDetails = () => {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const {
		data: movieDetails,
		loading,
		error,
	} = useFetch(() => fetchMovieDetails(id as string));

	return (
		<SafeAreaView className="bg-primary flex-1">
			{loading && (
				<ActivityIndicator
					size={"large"}
					color="#0000ff"
					className="mt-16"
				/>
			)}

			{error && (
				<View className="flex h-full justify-center items-center">
					<Text className="text-red-400 text-lg w-3/5 font-semibold ">
						Unable to fetch Movie details. Please try after sometime
					</Text>
				</View>
			)}

			{movieDetails && (
				<ScrollView contentContainerClassName="w-full">
					<Image
						source={{
							uri: `${globals.TMBD_IMAGE_BASEPATH}${movieDetails.poster_path}`,
						}}
						className="w-full h-[600px]"
						resizeMode="stretch"
					/>

					<View className="px-4 py-1">
						<Text
							className="text-white text-xl font-bold mt-4 mb-2"
							numberOfLines={2}
						>
							{movieDetails.title}
						</Text>
						<ScrollView
							className="flex-row my-2"
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{movieDetails?.release_date && (
								<View className="flex-row gap-2 mr-3 items-center bg-slate-700 px-2 py-1 rounded-md ">
									<Image
										source={icons.calender}
										className="size-4"
									/>
									<Text className="text-white">
										{movieDetails.release_date}
									</Text>
								</View>
							)}
							{movieDetails?.runtime && (
								<View className="flex-row gap-2 mr-3 items-center bg-slate-700 px-2 py-1 rounded-md ">
									<Image
										source={icons.clock}
										className="size-4"
									/>
									<Text className="text-white">
										{formatTimeFromRuntime(
											movieDetails.runtime
										)}
									</Text>
								</View>
							)}
							{movieDetails?.vote_average && (
								<View className="flex-row gap-2 mr-3 items-center  bg-slate-700 px-2 py-1 rounded-md ">
									<Image
										source={icons.star}
										className="size-4"
									/>
									<Text className="text-white">
										{Math.round(
											movieDetails?.vote_average ?? 0
										)}{" "}
										/ 10
									</Text>
									{movieDetails?.vote_count && (
										<Text className="text-light-200">
											({movieDetails?.vote_count} votes)
										</Text>
									)}
								</View>
							)}
						</ScrollView>
						{movieDetails?.overview && (
							<MovieInfo
								label="Overview"
								value={movieDetails.overview}
							/>
						)}

						{movieDetails?.genres && (
							<MovieInfo
								label="Genres"
								value={
									movieDetails?.genres
										?.map((g) => g.name)
										.join(" - ") || "N/A"
								}
							/>
						)}

						{movieDetails?.budget && movieDetails?.revenue && (
							<View className="flex-row gap-4 w-3/5">
								<MovieInfo
									label="Budget"
									value={`$${Math.round(movieDetails?.budget / 1_000_000)} million`}
								/>
								<MovieInfo
									label="Revenue"
									value={`$${Math.round(movieDetails?.revenue / 1_000_000)} million`}
								/>
							</View>
						)}
					</View>
					<TouchableOpacity
						className="flex-row gap-3 bg-accent justify-center items-center  py-4 mx-4 mt-6 mb-10 rounded-md "
						onPress={router.back}
					>
						<Image
							source={icons.arrow}
							className="size-5 rotate-180"
							tintColor="#fff"
						/>
						<Text className="text-white">Go Back</Text>
					</TouchableOpacity>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default MovieDetails;
