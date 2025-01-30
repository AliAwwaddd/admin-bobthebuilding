// import { useEffect, useRef, useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog'

// import { ProjectMaterialType } from '@/types/Project'
// import { Button } from './ui/button'
// import { Input } from './ui/input'

// type props = {
//   projectMaterials: ProjectMaterialType[]
// }
// const MaterialSelector = ({ projectMaterials }: props) => {
//   const [materials, setMaterials] = useState<any[]>([])
//   const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
//   const [quantity, setQuantity] = useState('')
//   const [showModal, setShowModal] = useState(false)
//   const [editingIndex, setEditingIndex] = useState<number | null>(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

//   const searchInputRef = useRef<HTMLInputElement | null>(null)

//   const allMaterials = [
//     'Beton',
//     'Ziegel',
//     'Holz',
//     'Metall',
//     'Kunststoff',
//     'Glas',
//     'Asphalt',
//     'Keramik',
//     'Stein',
//     'Gips',
//   ]

//   // Filter out already selected materials
//   const availableMaterials = allMaterials.filter(
//     (material) => !materials.some((m) => m.name === material),
//   )

//   const filteredMaterials = availableMaterials.filter((material) =>
//     material.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const openAddOrEditModal = (index: number | null) => {
//     if (index !== null) {
//       setEditingIndex(index)
//       const materialToEdit = materials[index]
//       setSelectedMaterial(materialToEdit.name)
//       setQuantity(materialToEdit.quantity.toString())
//     } else {
//       setEditingIndex(null)
//       setSelectedMaterial(null)
//       setQuantity('')
//     }
//     setShowModal(true)
//   }

//   const saveMaterial = () => {
//     if (selectedMaterial && quantity) {
//       if (editingIndex !== null) {
//         const updatedMaterials = [...materials]
//         updatedMaterials[editingIndex] = {
//           name: selectedMaterial,
//           quantity: parseFloat(quantity),
//         }
//         setMaterials(updatedMaterials)
//       } else {
//         setMaterials([
//           ...materials,
//           { name: selectedMaterial, quantity: parseFloat(quantity) },
//         ])
//       }
//       setSelectedMaterial(null)
//       setQuantity('')
//       setEditingIndex(null)
//       setShowModal(false)
//     }
//   }

//   const removeMaterial = (index: number) => {
//     setMaterials(materials.filter((_, i) => i !== index))
//   }

//   useEffect(() => {
//     if (isDropdownOpen && searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [isDropdownOpen])

//   return (
//     <div className='p-4'>
//       <div className='flex flex-col space-y-2'>
//         <h2 className='text-lg font-bold'>Material Zuweisen</h2>
//         <div>
//           {materials.map((material, index) => (
//             <div
//               key={index}
//               className='mb-2 flex items-center justify-between rounded bg-gray-100 p-2'
//             >
//               <span>{material.name}</span>
//               <span>{material.quantity}</span>
//               <div className='flex items-center space-x-2'>
//                 <Button
//                   variant='ghost'
//                   size='sm'
//                   onClick={() => openAddOrEditModal(index)}
//                 >
//                   ✏️
//                 </Button>
//                 <Button
//                   variant='ghost'
//                   size='sm'
//                   onClick={() => removeMaterial(index)}
//                 >
//                   🗑️
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add Material Button */}
//         <div
//           className='mt-4 flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-blue-500 p-4 transition-colors hover:bg-blue-50'
//           onClick={() => openAddOrEditModal(null)}
//         >
//           <div className='text-center'>
//             <span className='block text-lg font-semibold text-blue-500'>
//               ➕ Add Material
//             </span>
//             <span className='block text-sm text-gray-500'>
//               Click here to add a new material
//             </span>
//           </div>
//         </div>

//         <Dialog open={showModal} onOpenChange={setShowModal}>
//           <DialogContent>
//             <DialogTitle>
//               {editingIndex !== null
//                 ? 'Material Bearbeiten'
//                 : 'Material Hinzufügen'}
//             </DialogTitle>
//             <div className='mt-4 flex flex-col space-y-4'>
//               <div className='relative'>
//                 <div
//                   className='w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 hover:border-gray-400'
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 >
//                   <span
//                     className={
//                       selectedMaterial ? 'text-black' : 'text-gray-500'
//                     }
//                   >
//                     {selectedMaterial || 'select materials'}
//                   </span>
//                 </div>

//                 {isDropdownOpen && (
//                   <div className='absolute z-10 max-h-60 w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-md'>
//                     <div className='p-2'>
//                       <Input
//                         ref={searchInputRef}
//                         placeholder='Search materials...'
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                     </div>
//                     {filteredMaterials.length > 0 ? (
//                       filteredMaterials.map((material, idx) => (
//                         <div
//                           key={idx}
//                           className='cursor-pointer px-4 py-2 hover:bg-gray-100'
//                           onClick={() => {
//                             setSelectedMaterial(material)
//                             setIsDropdownOpen(false)
//                             setSearchQuery('')
//                           }}
//                         >
//                           {material}
//                         </div>
//                       ))
//                     ) : (
//                       <div className='p-4 text-gray-500'>
//                         No materials found
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Input
//                   placeholder='e.g. 123.45'
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   type='number'
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant='ghost'
//                 onClick={() => {
//                   setShowModal(false)
//                   setEditingIndex(null)
//                   setSelectedMaterial(null)
//                   setQuantity('')
//                 }}
//                 className='mr-2'
//               >
//                 Abbrechen
//               </Button>
//               <Button variant='default' onClick={saveMaterial}>
//                 {editingIndex !== null ? 'Speichern' : 'Hinzufügen'}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }

// export default MaterialSelector

import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog'

import { RootState } from '@/redux/TaskStore'
import {
  clearMaterialSearchQuery,
  removeMaterialByIndex,
  setMaterialSearchQuery,
  updateOrAddMaterial,
} from '@/redux/slices/taskSlice'
import { TaskMaterialType } from '@/types/task'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import { Input } from './ui/input'

const MaterialSelector = () => {
  const [selectedMaterial, setSelectedMaterial] =
    useState<TaskMaterialType | null>(null)
  const [quantity, setQuantity] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  // const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const selectedMaterials = useSelector(
    (state: RootState) => state.task.selectedMaterials,
  )

  const filteredMaterials = useSelector(
    (state: RootState) => state.task.filteredMaterials,
  )

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useDispatch()

  const searchQuery = useSelector(
    (state: RootState) => state.task.materialSearchQuery,
  )

  // Map project materials to taskMaterialType for filtering
  // const availableMaterials: TaskMaterialType[] = materials.map(
  //   (material) => ({
  //     material: material,
  //     expected_quantity: 0,
  //     required_quantity: 0,
  //   }),
  // )

  // const filteredMaterials = availableMaterials.filter((material) =>
  //   material.material.name.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  const openAddOrEditModal = (index: number | null) => {
    if (index !== null) {
      setEditingIndex(index)
      const materialToEdit = selectedMaterials[index]
      setSelectedMaterial(materialToEdit)
      setQuantity(materialToEdit.expected_quantity.toString())
    } else {
      setEditingIndex(null)
      setSelectedMaterial(null)
      setQuantity('')
    }
    setShowModal(true)
  }

  const saveMaterial = () => {
    if (selectedMaterial && quantity) {
      const updatedMaterial = {
        ...selectedMaterial,
        expected_quantity: parseFloat(quantity),
      }

      dispatch(
        updateOrAddMaterial({ index: editingIndex, material: updatedMaterial }),
      )

      setSelectedMaterial(null)
      setQuantity('')
      setEditingIndex(null)
      setShowModal(false)
    }
  }

  const removeMaterial = (index: number) => {
    dispatch(removeMaterialByIndex(index))
  }

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isDropdownOpen])

  return (
    <div className='p-4'>
      <div className='flex flex-col space-y-2'>
        <h2 className='text-lg font-bold'>Material Zuweisen</h2>
        <div>
          {selectedMaterials.map((material, index) => (
            <div
              key={index}
              className='mb-2 flex items-center justify-between rounded bg-gray-100 p-2'
            >
              <span>{material.material.name}</span>
              <span>{material.expected_quantity}</span>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => openAddOrEditModal(index)}
                >
                  ✏️
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => removeMaterial(index)}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div
          className='mt-4 flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-blue-500 p-4 transition-colors hover:bg-blue-50'
          onClick={() => openAddOrEditModal(null)}
        >
          <div className='text-center'>
            <span className='block text-lg font-semibold text-blue-500'>
              ➕ Add Material
            </span>
            <span className='block text-sm text-gray-500'>
              Click here to add a new material
            </span>
          </div>
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogTitle>
              {editingIndex !== null
                ? 'Material Bearbeiten'
                : 'Material Hinzufügen'}
            </DialogTitle>
            <div className='mt-4 flex flex-col space-y-4'>
              <div className='relative'>
                <div
                  className='w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 hover:border-gray-400'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    className={
                      selectedMaterial ? 'text-black' : 'text-gray-500'
                    }
                  >
                    {selectedMaterial
                      ? selectedMaterial.material.name
                      : 'Select materials'}
                  </span>
                </div>

                {isDropdownOpen && (
                  <div className='absolute z-10 max-h-60 w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-md'>
                    <div className='p-2'>
                      <Input
                        ref={searchInputRef}
                        placeholder='Search materials...'
                        value={searchQuery}
                        onChange={(e) =>
                          dispatch(setMaterialSearchQuery(e.target.value))
                        }
                      />
                    </div>
                    {filteredMaterials.length > 0 ? (
                      filteredMaterials.map((material, idx) => (
                        <div
                          key={idx}
                          className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                          onClick={() => {
                            setSelectedMaterial(material)
                            setIsDropdownOpen(false)
                            dispatch(clearMaterialSearchQuery())
                          }}
                        >
                          {material.material.name}
                        </div>
                      ))
                    ) : (
                      <div className='p-4 text-gray-500'>
                        No materials found
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Input
                  placeholder='e.g. 123.45'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type='number'
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='ghost'
                onClick={() => {
                  setShowModal(false)
                  setEditingIndex(null)
                  setSelectedMaterial(null)
                  setQuantity('')
                }}
                className='mr-2'
              >
                Abbrechen
              </Button>
              <Button variant='default' onClick={saveMaterial}>
                {editingIndex !== null ? 'Speichern' : 'Hinzufügen'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default MaterialSelector
