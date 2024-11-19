'use client'
import { useTranslation } from '@/app/context/TranslationContext'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import ClientTable from '@/app/components/ClientTable'
import { filterData } from './data'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'
import { MdDeleteForever } from 'react-icons/md' // Correct import

import {
  getAllLeads,
  importLeads,
  searchLeads,
  searchLeadsByCustomerSource,
  searchLeadsByType,
  exportLeads,
  deleteAllLeads,
} from '@/actions/leadsAction'
import { Grid } from '@mui/material'
import { Input } from '@/components/ui/input'
import EmptyPage from '@/app/components/EmptyPage'
import './pagination.css'
import { CiFilter, CiSearch } from 'react-icons/ci'
import CustomButton from '@/app/components/CustomButton'
import { IoMdAddCircle } from 'react-icons/io'
import { useIsMobile } from '@/hooks/use-mobile'
import Papa from 'papaparse'
import { useToast } from '@/hooks/use-toast'

function Page() {
  const { toast } = useToast()

  const router = useRouter()
  const isMobile = useIsMobile()
  const { t, locale } = useTranslation()
  const [leads, setLeads] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalLeads, setTotalLeads] = useState(0)
  const [typeFilter, setTypeFilter] = useState('')
  const [customerSourceFilter, setCustomerSourceFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const leadsPerPage = 10

  const fetchLeads = async (page = 1, search = '') => {
    const offset = (page - 1) * leadsPerPage
    setIsLoading(true)
    try {
      if (search) {
        console.log('Fetching leads with search term:', search)
        const leads = await searchLeads(search)
        setLeads(leads)
        setTotalLeads(leads.length)
      } else {
        console.log('Fetching all leads')
        const { leads, totalLeads } = await getAllLeads(leadsPerPage, offset)
        setLeads(leads)
        setTotalLeads(totalLeads)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setIsLoading(false) // Set loading state to false
    }
  }
  const onFilterChange = async (e, data) => {
    console.log(e, data)
    if (data === 'Request type') {
      const documents = await searchLeadsByType(e)
      setLeads(documents)
      console.log(documents)
    }
    if (data === 'Leads Source') {
      const documents = await searchLeadsByCustomerSource(e)
      setLeads(documents)
      console.log(documents)
    }
  }
  useEffect(() => {
    fetchLeads(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const [filterValues, setFilterValues] = useState(
    filterData.reduce((acc, ele) => {
      acc[ele.filterName] = ''
      return acc
    }, {})
  )
  const handleFilterChange = (value, filterName) => {
    const updatedFilters = { ...filterValues, [filterName]: value }
    console.log(updatedFilters)
    setFilterValues(updatedFilters)
    // onFilterChange(updatedFilters);
  }
  const handleClearFilters = () => {
    const resetFilters = Object.keys(filterValues).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {})
    setFilterValues(resetFilters)
    // onFilterChange(resetFilters);
  }
  const handleExportCSV = async () => {
    try {
      const { leads } = await exportLeads()
      if (!leads || leads.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Error Export Leads',
          description: error.message || 'No leads available to export.',
          status: 'error',
        })
        return
      }
      const csv = Papa.unparse(leads)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'leads.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({
        variant: 'success',
        title: 'Success Export Leads',
        description: 'Leads exported successfully.',
        status: 'success',
      })
    } catch (error) {
      console.error('Error exporting leads:', error)
      alert('Failed to export leads.')
    }
  }
  const handleImportCSV = (event) => {
    const file = event.target.files[0]
    if (!file) {
      alert('No file selected.')
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        if (results.errors.length > 0) {
          console.error('Parsing errors:', results.errors)
          toast({
            variant: 'destructive',
            title: 'Invalid file format.',
            description: 'Please ensure the file is in CSV format.',
            status: 'error',
          })
          return
        }
        try {
          await importLeads(results.data)
          toast({
            variant: 'success',
            title: 'Success import Leads',
            description: 'Leads imported successfully!',
            status: 'success',
          })
        } catch (error) {
          console.error('Error importing leads:', error)
          toast({
            variant: 'destructive',
            title: 'Error importing leads:',
            description: error.message || 'Failed to import leads.',
            status: 'error',
          })
        }
      },
      error: (error) => {
        console.error('Error parsing file:', error)
        toast({
          variant: 'destructive',
          title: 'Error importing leads:',
          description: 'Failed to read the CSV file.',
          status: 'error',
        })
      },
    })
  }
  return (
    <div className='p-6 min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Grid className='w-full my-2' dir='ltr'>
        <Grid
          item
          xs={12}
          sm={7}
          md={11.3}
          lg={11.4}
          className='flex items-center justify-end gap-2'
        >
          <div
            className={`head flex justify-between items-start w-full flex-row-reverse gap-5`}
          >
            <div
              className={`flex items-center w-3/4 h-max max-[450px]:w-full dark:shadow-none rounded-xl bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus-within:border-black dark:hover:border-white dark:focus-within:border-white focus:outline-none px-2`}
            >
              <span
                className={`text-gray-400 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}
              >
                <CiSearch />
              </span>
              <Input
                dir={locale == 'ar' ? 'rtl' : 'ltr'}
                type='text'
                className='w-full bg-transparent focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 text-lg border-0 shadow-none'
                placeholder={`${t('search_client')} ...`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className='flex gap-2 items-center'>
              <CustomButton
                fun={() => router.push('/leads/add-lead')}
                title={!isMobile && t('add_lead')}
                className='GreenButton p-2'
                icon={() => <IoMdAddCircle />}
              />

              <CustomButton
                title={!isMobile && 'Clear Filter'}
                icon={() => <CiFilter />}
                className='GreenButton w-full md:w-fit'
                fun={() => {
                  handleClearFilters()
                  fetchLeads(1, '')
                }}
              />
              <CustomButton
                fun={async () => {
                  await deleteAllLeads()
                  fetchLeads(
                    currentPage,
                    searchTerm,
                    typeFilter,
                    customerSourceFilter
                  )
                }}
                title={!isMobile && t('delete all leads')}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg'
                icon={() => <MdDeleteForever />} // Replace with a delete icon if available
              />
            </div>
          </div>
        </Grid>
      </Grid>
      {isLoading ? (
        <div className='flex justify-center items-center h-full'>
          <Spin className='mt-5' size='large' />
        </div>
      ) : (
        <div
          className='w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden'
          dir='rtl'
        >
          <ClientTable
            clients={leads}
            handleExportCSV={handleExportCSV}
            handleImportCSV={handleImportCSV}
            t={t}
            onFilterChange={onFilterChange}
            afterDel={fetchLeads}
            onAddLead={() => router.push('/leads/add-lead')}
            filterData={filterData}
            filterValues={filterValues}
            handleFilterChange={handleFilterChange}
          />
        </div>
      )}
      {!isLoading && (
        <div className='flex justify-center mt-4' dir='ltr'>
          <Pagination
            current={currentPage}
            total={totalLeads}
            pageSize={leadsPerPage}
            onChange={handlePageChange}
            className='custom-pagination'
          />
        </div>
      )}
    </div>
  )
}

export default Page
