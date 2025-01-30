import {
  CreateProjectFormField,
  CreateProjectTextAreaField,
} from './CreateProjectFormField'
import { Form } from './ui/form'

function ProjectInfoFormComp({ projectInfoForm }: any) {
  return (
    <Form {...projectInfoForm}>
      <form
      // onSubmit={projectInfoForm.handleSubmit((data: any) => console.log(data))}
      >
        <h2 className='text-lg font-bold'>Project Information</h2>
        <div className='space-y-4 px-2'>
          <CreateProjectFormField
            name='name'
            label='Name'
            placeholder='name'
            inputType='text'
            formControl={projectInfoForm.control}
          />

          {/* <textarea
            placeholder='Project Description'
            className='w-full rounded border p-2'
            value={projectInfo.description}
            onChange={(e) =>
              setProjectInfo({
                ...projectInfo,
                description: e.target.value,
              })
            }
          /> */}
          <CreateProjectTextAreaField
            name='description'
            label='Project Description'
            placeholder='Enter a detailed description of the project'
            // description='Provide a brief overview of the project goals and objectives.'
            formControl={projectInfoForm.control}
          />

          <CreateProjectFormField
            name='accounting_number'
            label='Accounting number'
            placeholder='Accounting number'
            formControl={projectInfoForm.control}
          />
          <CreateProjectFormField
            name='project_number'
            label='Project number'
            placeholder='Project number'
            formControl={projectInfoForm.control}
          />

          {/* <CreateProjectDateField
            name='startDate'
            label='Start Date'
            // description='Select the project start date.'
            formControl={projectInfoForm.control}
          />

          <CreateProjectDateField
            name='endDate'
            label='End Date'
            // description='Select the project end date.'
            formControl={projectInfoForm.control}
          /> */}
        </div>
      </form>
    </Form>
  )
}

export default ProjectInfoFormComp
