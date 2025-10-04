export const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_API_TOKEN,
	HEADERS: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
	},
};

export const fetchMovies = async ({ query }: { query: string }) => {
	let endPoint = TMDB_CONFIG.BASE_URL;

	if (query) {
		endPoint += `/search/movie?query=${encodeURIComponent(query)}`;
	} else {
		endPoint += `/discover/movie?sort_by=popularity.desc`;
	}

	const response = await fetch(endPoint, {
		method: "GET",
		headers: TMDB_CONFIG.HEADERS,
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to fetch movies ", response.statusText);
	}

	const data = await response.json();
	return data.results;
};

export const fetchMovieDetails = async (
	movieId: string | number
): Promise<MovieDetails> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`,
			{
				method: "GET",
				headers: TMDB_CONFIG.HEADERS,
			}
		);

		if (!response.ok)
			throw new Error(
				"Failed to fetch Movie details, Error: ",
				// @ts-ignore
				response?.statusText
			);

		return await response.json();
	} catch (error) {
		console.log(error);
		throw error;
	}
};
