'use client'
import CustomButton from '@/app/components/CustomButton'
import { useTranslation } from '@/app/context/TranslationContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlusCircle, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteProject, getProjects } from '@/actions/projectAction'
import { Spin } from 'antd'
import { format } from 'date-fns';


export default function ProjectsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch projects on component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const { projects } = await getProjects()
        setProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Navigate to project details page
  const handleProjectClick = (projectId) => {
    router.push(`/projects/${projectId}`)
  }

  // Delete project handler
  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId)
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.$id !== projectId)
      )
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className='flex flex-col h-full w-full p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>{t('projects')}</h1>
        <CustomButton
          title='Add Project'
          icon={() => <PlusCircle size={20} />}
          fun={() => router.push('/projects/add-project')}
        />
      </div>

      <div className='grid gap-6'>
        {loading ? (
          <Spin className='mt-5' size='large' />
        ) : projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          projects.map((project) => (
            <Card
              key={project.$id}
              className='bg-[#242b32] border-0 overflow-hidden cursor-pointer'
              onClick={() => handleProjectClick(project.$id)}
            >
              <div className='flex h-[200px]'>
                <div className='w-1/3 relative'>
                  <Image
                    src={project.image || "https://t4.ftcdn.net/jpg/03/00/10/35/360_F_300103505_oBLUa4dEG8mFdP60givbyNdoy7aHFmuu.jpg"}
                    alt={project.projectName || 'Project Image'}
                    width={400}
                    height={200}
                    className='object-cover h-full' 
                  />
                </div>
                <div className='flex-1 p-6 flex flex-col justify-between'>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-semibold'>{project.projectName}</h3>
                    <p className='text-gray-400'>
                      {project.projectInformation || 'No description provided.'}
                    </p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-4'>
                      <span className='text-green-500'>
                        {project.status || 'Active'}
                      </span>
                      <span className='text-gray-400'>
                        Start Date: { format(new Date(project.$createdAt), 'dd MMMM yyyy') || 'N/A'}
                      </span>
                    </div>
                    <Button
                      variant='destructive'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(project.$id)
                      }}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
