// i had to create this file to add the transaction routes

import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";


export const api = createApi({
    
    
    tagTypes: ["Kpis", "Products", "Transactions"],
})

        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"],
});


export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;