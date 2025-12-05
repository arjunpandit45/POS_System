import { createSlice } from "@reduxjs/toolkit"

const initialState = {
     orderId : "",
     customerName : "",
     customerPhone : "", 
     guests : 0,
     // tableNo : "" 
     table : null 
}

const customerSlice = createSlice({
     name : "customer",
     initialState,
     reducers : {
          setCustomer : ( state , action) => {
               const {name  ,phone , guests } = action.payload;
               // state.orderId = `${Date.now()}-${Math.random().toString(36).substring(2 ,5)}}`
               state.orderId = `${Date.now()}`
               state.customerName = name;
               state.customerPhone = phone;
               state.guests = guests;
          },
          
          removeCustomer : (state) => {
               state.customerName = "",
               state.customerPhone = "",
               state.guests = 0,
               // state.tableNo = ""
               state.table =  null
          },

          updateTable : (state , action) => {
               // state.tableNo = action.payload.tableNo;
               state.table = action.payload.table;
          }

     }
})

export const { setCustomer , removeCustomer , updateTable} = customerSlice.actions;
export default customerSlice.reducer;