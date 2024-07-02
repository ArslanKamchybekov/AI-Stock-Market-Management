import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {useGetKpisQuery} from "@/state/api";
import { Palette } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {ResponsiveContainer, BarChart, Bar, AreaChart, XAxis,YAxis,Tooltip,Area, Line, LineChart, CartesianGrid, Legend} from "rechart";




const Row1 = () => {
    const {palette} = useTheme();
    const {data} = useGetKpisQuery();
   //the bar graph for revenue in row 1 box 3
    const revenue = useMemo(()=> {

        return 
            data &&
            data[0].monthlyData.map(({month,revenue, }) => {
                return {
                    name : month.substring(0,3), 
                    revenue: revenue, 
                   
                }
            }
        )
    }, [data]);
     //revenue and expenses in box 1 row 1
    const revenueExpenses = useMemo(()=> {

        return 
            data &&
            data[0].monthlyData.map(({month,revenue, expenses }) => {
                return {
                    name : month.substring(0,3), 
                    revenue: revenue, 
                    expenses: expenses
                }
            }
        )
    }, [data]);

     // profit and revenue in row 1 box 2
    const revenueProfit = useMemo(()=> {

        return 
            data &&
            data[0].monthlyData.map(({month,revenue, expenses }) => {
                return {
                    name : month.substring(0,3), 
                    revenue: revenue, 
                    profit: (revenue - expenses).toFixed(2),
                }
            }
        )
    }, [data]);
    return(
        <>
         
         <DashboardBox gridArea="a">
            <BoxHeader
            title="Revenue and Expenses"
            subtitle="top line represent revenue, bottom line represent expenses"
            sideText="+4%"
            />
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                  width={500}
                    height={400}
                 data={revenueExpenses}
                 margin={{

                     top: 15,
                     right: 25,
                     left: -10,
                     bottom: 60,
                      
                }}
                >
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" 
                        stopColor={palette.primary[300]}
                        stopOpacity={0.5}
                        />
                        <stop 
                        offset="95%" 
                        stopColor={palette.primary[300]}
                        stopOpacity={0}
                        />
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" 
                        stopColor={palette.primary[300]}
                        stopOpacity={0.5}
                        />
                        <stop 
                        offset="95%" 
                        stopColor={palette.primary[300]}
                        stopOpacity={0}
                        />
                        </linearGradient>
                        
                     </defs>
                     <XAxis dataKey="name" tickline={false} style={{ fontSize: "10px"}}/>
                     <YAxis  tickline={false} axisLine={{strokeWidth: "0"}} style={{ fontSize: "10px"}} domain={[8000,23000]} />
                     <Tooltip />
                     <Area 
                         type="monotone" 
                         dataKey="revenue" 
                         dot={true}
                         stroke={palette.primary.main} 
                         fillOpacity={1} 
                         fill ="url(colorRevenue)"
                    />
                    <Area 
                         type="monotone" 
                         dataKey="expenses" 
                         dot={true}
                         stroke={palette.primary.main} 
                         fillOpacity={1} 
                         fill ="url(colorExpenses)"/>
               </AreaChart>
            </ResponsiveContainer>
        </DashboardBox>
        
         <DashboardBox gridArea="b">
         <BoxHeader
            title="Profit and Revenue"
            subtitle="top line represent revenue, bottom line represent expenses"
            sideText="+4%"
            />
           <ResponsiveContainer width="100%" height="100%">
              <LineChart
                  
                 data={revenueProfit}
                 margin={{

                     top: 20,
                     right: 0,
                     left: -10,
                     bottom: 55,
                      
                }}
                >
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                     <XAxis 
                     dataKey="name" 
                     tickline={false} 
                     style={{ fontSize: "10px"}}/>
                     <YAxis 
                     YAxisId="left" 
                     tickline={false} 
                     axisLine={false} 
                     style={{ fontSize: "10px"}} 
                      />
                      <YAxis 
                     YAxisId="right" 
                     orientation = "right"
                     tickline={false} 
                     axisLine={false} 
                     style={{ fontSize: "10px"}}
                     />
                     <Tooltip />
                     <Legend height= {20} wrapperStyle={{
                        margin: '0 0 10px 0'

                     }}/>
                     <Line
                         YAxisId="left"
                         type = "monotone"
                         dataKey = "profit"
                         Stroke= {palette.tertiary[500]}
                    />
                    <Line 
                         YAxisId="left"
                         type = "monotone"
                         dataKey = "profit"
                         Stroke= {palette.primary.main}
                         />
               </LineChart>
            </ResponsiveContainer>

         </DashboardBox>
         
         <DashboardBox gridArea="c">
         
         <ResponsiveContainer width="100%" height="100%">
         <BoxHeader
            title="Revenue month by Month"
            subtitle="graph representing the revenue month by Month"
            sideText="+4%"
            />
        <BarChart>
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        
        
        >
        
            <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" 
                      stopColor={palette.primary[300]}
                      stopOpacity={0.8}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={palette.primary[300]}
                        stopOpacity={0}
                    />
                    </linearGradient>
            </defs>
                
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickline={false} 
          style={{fontSize:"10px"}}/>
          <YAxis
          axisLine={false} 
          tickline={false} 
          style={{fontSize:"10px"}}
           />
          <Tooltip />
          
          <Bar dataKey="revenue" fill="url(#colorRevenue)" />
        </BarChart>
      </ResponsiveContainer>


         </DashboardBox>
        </>




    );
}


export default Row1;
