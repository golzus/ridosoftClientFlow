import fetch from "node-fetch";
import express from "express";
const app = express();
import cors from "cors";
import corsOptions from "./config/corsOption";
const PORT = process.env.PORT || 1000;
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("home");
});
 let customersDetails;
// async function mondayCustomers2() {
//   await fetch("https://api.monday.com/v2", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5MDk3Mjc3MiwiYWFpIjoxMSwidWlkIjo3MTQ5NzYyMiwiaWFkIjoiMjAyNS0wMy0yNlQxMDowMDozNS42ODRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk1MDEzNjAsInJnbiI6ImV1YzEifQ.G-B-VUmLZAmnhTHGGoeI-vrZgDTWE7UZEWLagB9OfJE",
//       "API-Version": "2023-04",
//     },
//     body: JSON.stringify({
//       query:
//         "query { boards (ids: 1886075276) {name items_page (limit:50 ) { items { id  name column_values { column {  title  } text value } }} }}",
//     }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       const data = res.data.boards[0].items_page.items;
//       console.log(data[0].column_values,"datasa");
      
//       customersDetails = data.map((item) => ({
//         id: item.id,
//         name: item.name,
//         status: item.column_values.find(
//           (column) => column.column.title === "Status"
//         ).text,
//         date: item.column_values.find(
//           (column) => column.column.title === "Date"
//         ).text,
//       }));
//     });
// }
const mondayCustomers2=async()=>{
    try {
       const mondaysData=await  fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5MDk3Mjc3MiwiYWFpIjoxMSwidWlkIjo3MTQ5NzYyMiwiaWFkIjoiMjAyNS0wMy0yNlQxMDowMDozNS42ODRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk1MDEzNjAsInJnbiI6ImV1YzEifQ.G-B-VUmLZAmnhTHGGoeI-vrZgDTWE7UZEWLagB9OfJE",
          "API-Version": "2023-04",
        },
        body: JSON.stringify({
          query:
            "query { boards (ids: 1886075276) {name items_page (limit:50 ) { items { id  name column_values { column {  title  } text value } }} }}",
        }),
      })
      const res = await mondaysData.json();
      const data=res.data.boards[0].items_page.items;
      console.log(data[0].column_values,"datasa");
      customersDetails = data.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.column_values.find(
          (column) => column.column.title === "Status"
        ).text,
        date: item.column_values.find(
          (column) => column.column.title === "Date"
        ).text, }))

    } catch (error) {
        console.log("error");
        
    }
}

  
//ADD CUSTOMER
let newCustomer;
// const  addCustomer=(newCustomer)=>{
//     console.log("hello");

//  let query=`mutation{create_item(board_id:1886075276, item_name:"${newCustomer}"){id}}`;
//    fetch ("https://api.monday.com/v2", {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5MDk3Mjc3MiwiYWFpIjoxMSwidWlkIjo3MTQ5NzYyMiwiaWFkIjoiMjAyNS0wMy0yNlQxMDowMDozNS42ODRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk1MDEzNjAsInJnbiI6ImV1YzEifQ.G-B-VUmLZAmnhTHGGoeI-vrZgDTWE7UZEWLagB9OfJE',
//       'API-Version' : '2023-04'
//      },
//      body: JSON.stringify({
//        'query' :query

//      })
//     }).then(res => res.json())
//     .then(res => console.log(JSON.stringify(res, null, 2)));

// }

const addCustomer = async (newCustomer, Status, Date) => {
  console.log("hello");
  let query1 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:1886075276, item_name:$myItemName, column_values:$columnVals) { id } }';
  let vars1 = {
    "myItemName": newCustomer,
    "columnVals": JSON.stringify({
      "Status": { "index": 1 },  // תוודא שסטטוס = מספר אינדקס נכון
      "Date": { "date":  "yyyy-mm-dd" }  // תוודא שהתאריך הוא בפורמט YYYY-MM-DD
    })
  };
  
    try {
    const createNewCustomerResponse = await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5MDk3Mjc3MiwiYWFpIjoxMSwidWlkIjo3MTQ5NzYyMiwiaWFkIjoiMjAyNS0wMy0yNlQxMDowMDozNS42ODRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk1MDEzNjAsInJnbiI6ImV1YzEifQ.G-B-VUmLZAmnhTHGGoeI-vrZgDTWE7UZEWLagB9OfJE",
        "API-Version": "2023-04",
      },
      body: JSON.stringify({
        'query': query1,
         'variables': JSON.stringify(vars1),
      }),
    });
    const createNewCustomerData = await createNewCustomerResponse.json();
    console.log(createNewCustomerData, "data");
    // let updateColumnQury=`mutation{change}`
  } catch (error) {
    console.log(error);
  }
};
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("home page");
});
app.get("/api/customers-details", async (req, res) => {
  addCustomer("chassya", "fds","1993-08-27");

  await mondayCustomers2();
  if(customersDetails)
 return res.json({ data: customersDetails, message: null, error: false });
return res.json({data:null,error:true,message: "no data"})

});
app.post("/api/customers-details",(req,res)=>{
    addCustomer("chaya", "fds","1993-08-27");

})
