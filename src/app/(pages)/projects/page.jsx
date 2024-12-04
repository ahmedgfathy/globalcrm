"use client"
import CustomButton from "@/app/components/CustomButton"
import { useTranslation } from "@/app/context/TranslationContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusCircle, Trash2 } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProjectsPage() {
    const {t} = useTranslation()
    const router = useRouter()
  return (
    <div className="flex flex-col h-full w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t('projects')}</h1>
        <CustomButton 
        title="Add Project"
        icon={() => <PlusCircle size={20} />}
        fun={() => router.push('/projects/add')}
        />
        {/* <Button className="bg-green-600 hover:bg-green-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button> */}
      </div>
      
      <div className="grid gap-6">
        {[1, 2, 3, 4].map((project) => (
          <Card key={project} className="bg-[#242b32] border-0 overflow-hidden">
            <div className="flex h-[200px]">
              <div className="w-1/3 relative">
                <Image
                  src="https://t4.ftcdn.net/jpg/03/00/10/35/360_F_300103505_oBLUa4dEG8mFdP60givbyNdoy7aHFmuu.jpg"
                  alt={`Project ${project}`}
                  width={400}
                  height={200}
                  className="object-cover h-full"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Project {project}</h3>
                  <p className="text-gray-400">
                    Project description
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-green-500">Active</span>
                    <span className="text-gray-400">Start Date: 2024/1/1</span>
                  </div>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
