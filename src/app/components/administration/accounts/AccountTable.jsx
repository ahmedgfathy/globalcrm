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

export default function AccountsTable({account}) {

  const handleDelete = (id) => {
    console.log(id);
    
  };

  const handleSettings = (id) => {
    console.log(`Opening settings for account ${id}`);
  };

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
            <TableCell className="font-medium">{account?.username}</TableCell>
            <TableCell>{account?.email}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" onClick={() => handleSettings(account.id)}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(account.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
