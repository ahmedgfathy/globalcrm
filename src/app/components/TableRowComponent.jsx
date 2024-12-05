"use client";
import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import DeleteButton from '@/app/components/delete-button/DeleteButton'
import { TableCell, TableRow } from '@/components/ui/table'
import { deleteLead } from '../../actions/leadsAction'

const TableRowComponent = ({ client, t, afterDel }) => {
  const router = useRouter();

  return (
    <TableRow className='hover:bg-gray-50 dark:hover:bg-gray-700 hover:cursor-pointer' onClick={() => router.push(`/leads/${client.$id}`)}>
      <TableCell className='p-3 text-base font-semibold'>
        {client.leadNumber}
      </TableCell>
      <TableCell className='p-3 text-base font-semibold'>{client.name}</TableCell>
      <TableCell className='p-3 text-base font-semibold'>
        {client.number}
      </TableCell>
      <TableCell className='p-3 text-base font-semibold'>
        {client.leadStatus}
      </TableCell>
      <TableCell className='p-3 text-base font-semibold'>
        {client.customerSource}
      </TableCell>
      <TableCell className='p-3 text-base font-semibold'>{client.type}</TableCell>

      <TableCell className='p-3 flex gap-3'>
        <Link
          href={`leads/${client.$id}`}
          className='px-4 py-2 bg-yale_blue-700 text-white rounded-md'
        >
          <span className='inline-block max-sm:hidden'>{t('more_details')}</span>
          <span className='hidden max-sm:inline-block'>{t('more')}</span>
        </Link>
        <DeleteButton
          handleDelete={(e) => { e.stopPropagation(); deleteLead(client.$id)}}
          afterDel={afterDel}
        />
      </TableCell>
    </TableRow >
  )
}

export default TableRowComponent;
