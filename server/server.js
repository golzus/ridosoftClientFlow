import fetch from 'node-fetch';
import express from 'express';
const app = express();
import cors from 'cors'
import corsOptions from './config/corsOption'
const PORT=process.env.PORT||1000
app.use(cors( corsOptions))
app.get("/",(req,res)=>{
    res.send("home")
})
// async function mondayCustomers(){

// fetch ("https://api.monday.com/v2", {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM4ODQ5MjYxNywiYWFpIjoxMSwidWlkIjo1MDgwMjI0MCwiaWFkIjoiMjAyNC0wNy0yNFQxNToxODoxMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk1MDEzNjAsInJnbiI6ImV1YzEifQ.dlXZJ2nspi1fhvIlRUUx-bmsOXwPM0Q_-gPPVx9X_7o',
//       'API-Version' : '2023-04'
//      },
//      body: JSON.stringify({
      
//     //  query : 'query { boards (ids: [1710929751]) { name } }'

//     //  query : "query { boards (ids: 1710929751) {name items_page (limit:10 ) { items { id name }}}}"

//        query : "query { boards (ids: 1722989235) {name items_page (limit:50 ) { items { id  name column_values { column {  title  } text value } }} }}"

//      })
//     }).then(res => res.json())
//       .then(res => {
//         // console.log(JSON.stringify(res.data.boards[0].items_page.items, null, 2))
//         let person = '';
//         let phone = '';
//         let description = '';
//         let category = '';
//         let comments = '';
//         console.log(res.data.boards[0].items_page.items[0].name,"res");
        
//         for(let i=0; i<res.data.boards[0].items_page.items.length; i++){

//             let item = res.data.boards[0].items_page.items[i].name;
       
//             for(let j=0; j<res.data.boards[0].items_page.items[i].column_values.length; j++){

//                 if (res.data.boards[0].items_page.items[i].column_values[j].column.title=="שם"){
//                     person= res.data.boards[0].items_page.items[i].column_values[j].text.replace("'", "");
//                     person=person.replace("'", "")
//                 }

//                 if (res.data.boards[0].items_page.items[i].column_values[j].column.title=="תיאור"){
//                     description= res.data.boards[0].items_page.items[i].column_values[j].text;
//                     description=description.replace("'", "")
//                 }

//                 if (res.data.boards[0].items_page.items[i].column_values[j].column.title=="קטגוריה"){
//                     category= res.data.boards[0].items_page.items[i].column_values[j].text;
//                 }

//                 if (res.data.boards[0].items_page.items[i].column_values[j].column.title=="הערות"){
//                     comments= res.data.boards[0].items_page.items[i].column_values[j].text;
//                 }
            
//             }
//             // console.log("person: ", person);
//             // console.log("description: ", description);
//             // console.log("category: ", category);
//         }})}

// mondayCustomers();
let customersDetails;
async function mondayCustomers2(){

    fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5MDk3Mjc3MiwiYWFpIjoxMSwidWlkIjo3MTQ5NzYyMiwiaWFkIjoiMjAyNS0wMy0yNlQxMDowMDozNS42ODRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk1MDEzNjAsInJnbiI6ImV1YzEifQ.G-B-VUmLZAmnhTHGGoeI-vrZgDTWE7UZEWLagB9OfJE',
          'API-Version' : '2023-04'
         },
         body: JSON.stringify({    
           query : "query { boards (ids: 1886075276) {name items_page (limit:50 ) { items { id  name column_values { column {  title  } text value } }} }}"
    
         })
        }).then(res => res.json())
          .then(res => {
            const data = res.data.boards[0].items_page.items;
             customersDetails = data.map(item => ({
             id: item.id,
                name: item.name,
                status: item.column_values.find(column => column.column.title === 'Status').text,
                date: item.column_values.find(column => column.column.title === 'Date').text
              }));
              
  }  )}


    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
        
    })
app.get("/",(req,res)=>{
    res.send("home page")
})
app.get("/api/customers-details",(req,res)=>{
    mondayCustomers2();
    res.json({data:customersDetails, message:null,error:false})
})