'use client'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getUser, updateUser } from '@/actions/auth'

export function UserModal({ isOpen, onClose, user, fetchUsers }) {
  const [account, setAccount] = useState({})
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async () => {
    if (!user) return;
    try {
      const response = await getUser(user);
      if (response) {
        setAccount(response);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    return () => {
      setAccount({});
      setMessage("");
      setLoading(false)
    };
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updatedData = {
        name: account.name,
        email: account.email,
        password: account.password,
        role: account.role,
        phone: account.phone,
        address: account.address,
        gender: account.gender,
      };

      await updateUser(user, updatedData);
      setMessage("User updated successfully!");
      fetchUsers()
      onClose();
    } catch (error) {
      setMessage("Failed to update user.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { onClose(); setAccount({}) }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={account.name || ''}
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={account.email || ''}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={account.password || ''}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={account.role || ''} onValueChange={(value) => setAccount({ ...account, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={account.phone || ''}
              onChange={(e) => setAccount({ ...account, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              value={account.address || ''}
              onChange={(e) => setAccount({ ...account, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={account.gender || ''} onValueChange={(value) => setAccount({ ...account, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 my-4">
            <Button type="submit" disabled={loading} className="bg-[#5be49b1a] text-[#5be49b]">
              {loading ? "Updating User..." : "Update User"}
            </Button>
            {message && <p className="text-center text-sm text-red-500">{message}</p>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
