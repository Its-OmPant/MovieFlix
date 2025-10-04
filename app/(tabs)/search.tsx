import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovies({ query: searchQuery }), false);

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (searchQuery.trim()) {
				await loadMovies();
			} else {
				reset();
			}
		}, 350);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	useEffect(() => {
		if (searchQuery.trim() && movies && movies.length > 0 && movies[0]) {
			updateSearchCount(searchQuery.trim(), movies[0]);
		}
	}, [movies]);

	return (
		<SafeAreaView className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />

			<FlatList
				data={movies}
				renderItem={({ item }) => <Card {...item}></Card>}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 18,
					marginBottom: 25,
				}}
				contentContainerStyle={{
					paddingBottom: 80,
				}}
				className="mt-4 mb-4 px-6"
				ListHeaderComponent={
					<>
						<Image
							source={icons.logo}
							className="w-12 h-10 mx-auto mt-6 mb-8"
						/>

						<View className="bg-slate-900 h-16 rounded-full mb-6">
							<SearchBar
								onPress={() => {}}
								placeholder="Search movies.."
								value={searchQuery}
								onChange={(text: string) =>
									setSearchQuery(text)
								}
							/>
						</View>

						{moviesLoading && (
							<ActivityIndicator
								size="large"
								color="#0000ff"
								className="my-3"
							/>
						)}

						{moviesError && (
							<Text className="my-3 text-red-500">
								Error: {moviesError?.message}
							</Text>
						)}

						{!moviesLoading &&
							!moviesError &&
							searchQuery.trim() &&
							movies?.length > 0 && (
								<Text className="mb-4 text-white font-bold text-lg">
									Search Results for{" "}
									<Text className="text-accent">
										{searchQuery}
									</Text>
								</Text>
							)}
					</>
				}
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View>
							<Text className="text-sm text-gray-400 text-center mt-10">
								{searchQuery?.trim()
									? "No movies found"
									: "Search for a movie"}
							</Text>
						</View>
					) : null
				}
			/>
		</SafeAreaView>
	);
};

export default Search;
