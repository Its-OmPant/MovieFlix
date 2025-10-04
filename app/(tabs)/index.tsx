import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import TrendingMovie from "@/components/TrendingMovie";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	Text,
	View,
} from "react-native";
import "../../globals.css";

export default function Index() {
	const router = useRouter();

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: "" }));

	const {
		data: trendingMovies,
		loading: trendingMoviesLoading,
		error: trendingMoviesError,
	} = useFetch(getTrendingMovies);

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />
			<ScrollView
				className="flex-1"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					minHeight: "100%",
				}}
			>
				<Image
					source={icons.logo}
					className="w-12 h-10 mx-auto mt-20 mb-8"
				/>

				{moviesLoading || trendingMoviesLoading ? (
					<ActivityIndicator size={"large"} color={"#0000ff"} />
				) : moviesError || trendingMoviesError ? (
					<Text className="mt-6 text-red-400 self-center">
						Error:{" "}
						{moviesError?.message || trendingMoviesError?.message}
					</Text>
				) : (
					<View className="px-6">
						<View className="bg-slate-900 h-16 rounded-full">
							<SearchBar
								onPress={() => router.push("/search")}
								placeholder="Type here to search.."
							/>
						</View>

						{trendingMovies && (
							<View className="my-10">
								<Text className="text-white fold-bold">
									Trending Movies
								</Text>

								<FlatList
									data={trendingMovies}
									horizontal
									renderItem={({ item, index }) => (
										<TrendingMovie
											movie={item}
											index={index}
										/>
									)}
									keyExtractor={(item) =>
										item.movie_id.toString()
									}
									showsHorizontalScrollIndicator={false}
									ItemSeparatorComponent={() => (
										<View className="w-4" />
									)}
								/>
							</View>
						)}

						<Text className="mt-2 text-white fold-bold">
							Latest Movies
						</Text>

						<FlatList
							scrollEnabled={false}
							data={movies}
							renderItem={({ item }) => <Card {...item}></Card>}
							keyExtractor={(item) => item.id.toString()}
							numColumns={3}
							columnWrapperStyle={{
								justifyContent: "flex-start",
								gap: 18,
								marginBottom: 25,
							}}
							className="mt-4 mb-40"
						/>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
