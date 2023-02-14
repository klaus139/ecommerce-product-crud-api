export interface Iproduct {
    name: string,
    desc: string,
    banner: string,
    type: string,
    unit: number,
    price: number,
    available: boolean,
    supplier: string,
}

// export type PaginatedData<T> = {
//     data: T[];
//     currentPage: number;
//     nextPage: number | null;
//     previousPage: number | null;
//     totalPages: number;
//   }
  

export type PaginatedData<T> = {
    data: T[];
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalPages: number;
    total: number; // new property
  }
  