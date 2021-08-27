export interface PagerModel {
  total:       number;
  currentPage: number;
  pageSize:    number;
  maxPage:     number;
  hasPrevious: boolean;
  paged:       boolean;
}
