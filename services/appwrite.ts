import { globals } from "@/constants/globals";
import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_METRICS_TABLE_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_ARD!;

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setPlatform(PLATFORM);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		const results = await tablesDB.listRows({
			databaseId: DATABASE_ID,
			tableId: TABLE_ID,
			queries: [Query.equal("search_term", query)],
		});

		console.log("\n ENTRIES :", results, "\n");

		if (results.rows.length > 0) {
			const existingMovie = results.rows[0];

			await tablesDB.updateRow({
				databaseId: DATABASE_ID,
				tableId: TABLE_ID,
				rowId: existingMovie.$id,
				data: {
					count: existingMovie.count + 1,
				},
			});
		} else {
			const posterPath = movie?.poster_path
				? `${globals.TMBD_IMAGE_BASEPATH}${movie.poster_path}`
				: globals.PLACEHOLDER_IMAGE_URL;

			await tablesDB.createRow({
				databaseId: DATABASE_ID,
				tableId: TABLE_ID,
				rowId: ID.unique(),
				data: {
					search_term: query,
					count: 1,
					poster_url: posterPath,
					movie_id: movie.id,
					title: movie.title,
				},
			});
		}
	} catch (error) {
		console.log("Appwrite Service Error: ", error);
		throw error;
	}
};

export const getTrendingMovies = async (): Promise<
	TrendingMovie[] | undefined
> => {
	try {
		const response = await tablesDB.listRows({
			databaseId: DATABASE_ID,
			tableId: TABLE_ID,
			queries: [Query.orderDesc("count"), Query.limit(10)],
		});

		return response.rows as unknown as TrendingMovie[];
	} catch (error) {
		console.log(`Error while fetching trending movies: ${error}`);
		return undefined;
	}
};
