import { useEffect, useState } from "react";

const useFetch = <T>(
	fetcherFunction: () => Promise<T>,
	autoFetch: boolean = true
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			const result = await fetcherFunction();

			setData(result);
		} catch (error) {
			// @ts-ignore
			setError(
				error instanceof Error
					? error
					: new Error("An Error Occured: ", error)
			);
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setLoading(false);
		setError(null);
	};

	useEffect(() => {
		if (autoFetch) {
			fetchData();
		}
	}, []);

	return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
