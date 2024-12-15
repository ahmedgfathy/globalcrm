'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Settings, Trash2 } from 'lucide-react';
import { UserModal } from '../UpdateUser';
import { useState } from 'react';
import { deleteUser } from '@/actions/auth';
import DeleteButton from '../../delete-button/DeleteButton';

export default function AccountsTable({account, fetchUsers}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)


  const handleDeleteUser = async (id) => {  
  
    try {
      await deleteUser(id);
      fetchUsers()
    } catch (error) {
      console.log(error)
    } 
  };

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {account?.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account?.name}</TableCell>
            <TableCell>{account?.email}</TableCell>
            <TableCell className="text-right">
              <Button variant="secondary" size="icon" className="mx-3" onClick={() => handleEditUser(account.$id)}>
                <Settings className="h-4 w-4" />
              </Button>
              <DeleteButton
              handleDelete={() => handleDeleteUser(account.$id)}
                
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
      />
    </Table>
  );
}
