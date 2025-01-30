'use client'
import ErrorMessage from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useInfoContext } from './InfoContext'
import { ProjectInfoForm } from './ProjectInfoForm'

export const ProjectInfoCard = () => {
  const { isEditing, dynamicProject, globalError, openForm } = useInfoContext()

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Edit Project' : dynamicProject.name}
        </CardTitle>
        {!isEditing && (
          <CardDescription>
            {dynamicProject.description || 'No description available.'}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <ProjectInfoForm />
        ) : (
          <div className='space-y-2'>
            <p>
              <strong>Accounting Number:</strong>{' '}
              {dynamicProject.accounting_number || 'N/A'}
            </p>
            <p>
              <strong>Project Number:</strong>{' '}
              {dynamicProject.project_number || 'N/A'}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-center'>
        {globalError && <ErrorMessage error={globalError} />}
        {!isEditing && <Button onClick={openForm}>Edit Info</Button>}
      </CardFooter>
    </Card>
  )
}
