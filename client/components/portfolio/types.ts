/** Parsed intent returned by the query simulator and intent API. */
export interface QueryItem {
  text: string;
  pairs: Array<{ object: string; color: string }>;
  targets: string[];
  colors: string[];
  pipeline: string;
}
