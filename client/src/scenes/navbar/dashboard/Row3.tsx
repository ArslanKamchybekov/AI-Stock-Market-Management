import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"





const Row3 = (props: Props) => {
    const ( data: kpiData ) = useGetKpisQuery();
    const ( data: productData ) = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();
    console.log("transactionData:", transactionData);
    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={'${productData?.length} products'} 
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        " ":
                    }}
                >
                    <DataGrid />
                </Box>
            </DashboardBox>
        </>
    );
};