export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
  };
}
