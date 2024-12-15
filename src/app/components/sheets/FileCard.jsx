import { Trash2, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'


export function FileCard({ name, onDelete, onDownload, onPreview }) {
  return (
    <Card className="dark:bg-slate-900">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm dark:text-slate-200 truncate" title={name}>
            {name}
          </p>
        </div>
        <div className="flex items-center gap-2">
            <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onDownload}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
            </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

