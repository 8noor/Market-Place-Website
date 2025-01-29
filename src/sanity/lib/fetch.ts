import { createClient } from "next-sanity";

// Define the types for the client configuration
const client = createClient({
  projectId: "e8zn4o7p",
  dataset: "production",
  useCdn: false, // Set to false to fetch fresh data always
  apiVersion: "2021-03-25",
  token:
    "skpOiD2zoGORDMibQNMzCF3WpZFrCLmH2z9648XdJOz08gDjazzIZd2lD0Q8P2lXnK1lJZYTuP7rmHW2HPaJ6vEJa3LhTFSY0YdjJgkEnYzEFQSJ3jqSJXeVZtssohjDuGnC2hHV6LMkfd8dSa3BGtUNBZ9Hu3LS4NymsXii1J7H8K6knJic",
});

// Define the type for the fetch parameters
interface SanityFetchParams {
  query: string;
  params?: Record<string, unknown>; // Use a more specific type than `any`
}

// Adjusted function with typed parameters
export async function sanityFetch({ query, params = {} }: SanityFetchParams) {
  return await client.fetch(query, params);
}
