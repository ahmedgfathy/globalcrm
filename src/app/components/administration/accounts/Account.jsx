"use client"
import { useEffect, useState } from "react";
import AccountsTable from "./AccountTable";
import { getUsers } from "@/actions/auth";

export default function AccountsPage() {
    const [users, setUsers] = useState([])
    const fetchUsers= async()=>{
        const data = await getUsers();
        console.log(data)
        console.log(data.users)
        setUsers(data.users)
    }
    useEffect(()=>{
        fetchUsers()
    }, [])
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Accounts</h1>
      <AccountsTable account={users} fetchUsers={fetchUsers}/>

    </div>
  )
}
