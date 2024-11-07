// "use client";
// import UnitsTable from "../../../../components/ui/tables";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";

// const data = [
//   {
//     id: 1,
//     Number: "PRO3722",
//     Building: "200",
//     Unit_For: "For Rent",
//     The_Floor: "بيزمنت",
//     Area: "NARGS EXTINCTON",
//     Finished: "NARGS EXTINCTON",
//     Rooms: "	3",
//     Unit_Features: "-",
//     Phase: "#####",
//     Note: "Available",
//     Type: "APARTMENT OUT",
//     Inside_Outide_Compound: "Outside",
//     Total_Price: "7000",
//     Description: "APARTMENT OUT",
//     Last_Follow_In: "28-10-2024",
//     Status: "-",
//     Activity: "اداري مرخص",
//   },
//   {
//     id: 2,
//     Number: "PRO3722",
//     Building: "200",
//     Unit_For: "For Rent",
//     The_Floor: "بيزمنت",
//     Area: "NARGS EXTINCTON",
//     Finished: "NARGS EXTINCTON",
//     Rooms: "	3",
//     Unit_Features: "-",
//     Phase: "#####",
//     Note: "Available",
//     Type: "APARTMENT OUT",
//     Inside_Outide_Compound: "Outside",
//     Total_Price: "7000",
//     Description: "APARTMENT OUT",
//     Last_Follow_In: "28-10-2024",
//     Status: "-",
//     Activity: "اداري مرخص",
//   },

// ];
// const columns = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Number",
//     header: "Number",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Number")}</div>
//     ),
//   },
//   {
//     accessorKey: "Building",
//     header: "Building",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Building")}</div>
//     ),
//   },
//   {
//     accessorKey: "Unit_For",
//     header: "Unit For",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Unit_For")}</div>
//     ),
//   },
//   {
//     accessorKey: "The_Floor",
//     header: "The Floor",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("The_Floor")}</div>
//     ),
//   },
//   {
//     accessorKey: "Area",
//     header: "Area",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Area")}</div>
//     ),
//   },
//   {
//     accessorKey: "Finished",
//     header: "Finished",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Finished")}</div>
//     ),
//   },
//   {
//     accessorKey: "Rooms",
//     header: "Rooms",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Rooms")}</div>
//     ),
//   },

//   {
//     accessorKey: "Unit_Features",
//     header: "Unit Features",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Unit_Features")}</div>
//     ),
//   },
//   {
//     accessorKey: "Phase",
//     header: "Phase",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Phase")}</div>
//     ),
//   },
//   {
//     accessorKey: "Note",
//     header: "Note",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Note")}</div>
//     ),
//   },
//   {
//     accessorKey: "Type",
//     header: "Type",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Type")}</div>
//     ),
//   },
//   {
//     accessorKey: "Inside_Outide_Compound",
//     header: "Inside / Outide Compound",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Inside_Outide_Compound")}</div>
//     ),
//   },
//   {
//     accessorKey: "Total_Price",
//     header: "Total Price",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Total_Price")}</div>
//     ),
//   },
//   {
//     accessorKey: "Description",
//     header: "Description",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Description")}</div>
//     ),
//   },
//   {
//     accessorKey: "Last_Follow_In",
//     header: "Last Follow In",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Last_Follow_In")}</div>
//     ),
//   },
//   {
//     accessorKey: "Status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Status")}</div>
//     ),
//   },
//   {
//     accessorKey: "Activity",
//     header: "Activity",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Activity")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// const data2 = [
//   {
//     id: 1,
//     Property_Offered_By: "المالك",
//     Mobile_No: "0129093232",
//     Name: "شريف",
//     Tel: "-",
//     Unit_NO: "4",
//     I_started_the_calls: "Finished",
//     UBDATE: "-",

//   },
//   {
//     id: 2,
//     Property_Offered_By: "المالك",
//     Mobile_No: "0129093232",
//     Name: "شريف",
//     Tel: "-",
//     Unit_NO: "4",
//     I_started_the_calls: "Finished",
//     UBDATE: "-",

//   },
// ];
// const columns2 = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Property_Offered_By",
//     header: "Property Offered By",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Property_Offered_By")}</div>
//     ),
//   },
//   {
//     accessorKey: "Mobile_No",
//     header: "Mobile No.",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Mobile_No")}</div>
//     ),
//   },
//   {
//     accessorKey: "Name",
//     header: "Name",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Name")}</div>
//     ),
//   },
//   {
//     accessorKey: "Tel",
//     header: "Tel",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Tel")}</div>
//     ),
//   },
//   {
//     accessorKey: "Unit_NO",
//     header: "Unit NO",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Unit_NO")}</div>
//     ),
//   },
//   {
//     accessorKey: "I_started_the_calls",
//     header: "I started the calls",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("I_started_the_calls")}</div>
//     ),
//   },
//   {
//     accessorKey: "UBDATE",
//     header: "4 UBDATE",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("UBDATE")}</div>
//     ),
//   },


//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];




// const data3 = [
//   {
//     id: 1,
//     Handler: "Ahmed Fathy",
//     Sales: "EGAR COMPANY",
//     catogry: "-",


//   },


// ];
// const columns3 = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Handler",
//     header: "Handler",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Handler")}</div>
//     ),
//   },
//   {
//     accessorKey: "Sales",
//     header: "Sales",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Sales")}</div>
//     ),
//   },
//   {
//     accessorKey: "catogry",
//     header: "catogry",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("catogry")}</div>
//     ),
//   },



//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
// const data4 = [
//   {
//     id: 1,
//     Created_Time: "28-10-2024",
//     Land_area: "EGAR COMPANY",
//     Modified_Time: "28-10-2024",
//     currency: "EGP",
//     Rent_From: "-",
//     Rent_To: "-",



//   },


// ];
// const columns4 = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Created_Time",
//     header: "Created Time",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Created_Time")}</div>
//     ),
//   },
//   {
//     accessorKey: "Land_area",
//     header: "Land area",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Land_area")}</div>
//     ),
//   },
//   {
//     accessorKey: "Modified_Time",
//     header: "Modified Time",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Modified_Time")}</div>
//     ),
//   },
//   {
//     accessorKey: "currency",
//     header: "currency",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("currency")}</div>
//     ),
//   },


//   {
//     accessorKey: "Rent_From",
//     header: "Rent From",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Rent_From")}</div>
//     ),
//   },
//   {
//     accessorKey: "Rent_To",
//     header: "Rent To",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Rent_To")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// const data5 = [
//   {
//     id: 1,
//     Property_Name_Compound_Name: "EGAR COMPANY",
//     Land_area : "-"




//   },


// ];
// const columns5 = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Property_Name_Compound_Name",
//     header: "Property Name - Compound Name",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Property_Name_Compound_Name")}</div>
//     ),
//   },
//   {
//     accessorKey: "Land_area",
//     header: "Land area",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Land_area")}</div>
//     ),
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];




// const data6 = [
//   {
//     id: 1,
//     Property_Image: "-",
//     Links_PDF_Details_and_Photos: "https://photos.app.goo.gl/VzLk7qczFz1621e6A"


//   },


// ];
// const columns6 = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Property_Image",
//     header: "Property Image",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Property_Image")}</div>
//     ),
//   },
//   {
//     accessorKey: "Links_PDF_Details_and_Photos",
//     header: "Links PDF Details and Photos",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("Links_PDF_Details_and_Photos")}</div>
//     ),
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
// function Page() {
//   return (
//     <div >
//       <div className="p-6">
//         <h1 className="font-bold">Property Information</h1>
//         <UnitsTable data={data} columns={columns} filter="Number" />
//       </div>

//       <div className="p-6">
//         <h1 className="font-bold">   Custom Information</h1>
//         <UnitsTable data={data2} columns={columns2} filter="Name" />
//       </div>

//       <div className="p-6">
//         <h1 className="font-bold"> Sales Information</h1>
//         <UnitsTable data={data3} columns={columns3} filter="Handler" />
//       </div>
//       <div className="p-6">
//         <h1 className="font-bold"> Property Details</h1>
//         <UnitsTable data={data4} columns={columns4} filter="Rent_From" />
//       </div>

//       <div className="p-6">
//         <h1 className="font-bold">   Pricing Information</h1>
//         <UnitsTable data={data5} columns={columns5} filter="Property_Name_Compound_Name" />
//       </div>
//       <div className="p-6">
//         <h1 className="font-bold">   Property Image Information</h1>
//         <UnitsTable data={data6} columns={columns6} filter="Links_PDF_Details_and_Photos" />
//       </div>

//     </div>
//   );
// }

// export default Page;

const Page = ()=>{
    return (
        <div>Page</div>
    )
}
export default Page