import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

function TransformComponent({title, users, handleTransferSubmit, handleChange, selectedUsers, handleSelect, handleCancel, handleClick}) {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant='outline'
        className='GreenButton'
        onClick={() => {
            handleClick()
        }}
      >
        Transform
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent  className="max-h-[80vh] ">
      <AlertDialogHeader>
        <AlertDialogTitle> {title} </AlertDialogTitle>
        <AlertDialogDescription className="max-h-[65vh] py-2 min-h-[10vh] overflow-auto">
          <Input
            placeholder='Search Users'
            onChange={(e) =>
                handleChange(e.target.value)
            }
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          {users && users.length > 0 ? (
            <ul className='mt-4 space-y-2'>
              {users.map((user) => (
                <li
                  key={user.userId}
                  className='p-4 bg-white shadow rounded-lg flex items-center justify-between hover:bg-blue-50 transition dark:bg-gray-900 dark:text-white'
                >
                  <div>
                    <p className='font-semibold text-gray-800 dark:text-white'>
                      {user.name}
                    </p>
                    <p className='text-sm text-gray-500 dark:text-white'>
                      {user.email}
                    </p>
                  </div>
                  <Button
                    className={`${
                      selectedUsers.includes(user.userId)
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-green-700 hover:bg-green-900 text-white'
                    }`}
                    onClick={() => handleSelect(user.userId)}
                  >
                    {selectedUsers.includes(user.userId)
                      ? 'Selected'
                      : 'Select'}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='mt-4 text-gray-600'>Not found</p>
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={() => {
            handleCancel() // Optionally clear selections on cancel
          }}
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleTransferSubmit}>
          Submit
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default TransformComponent