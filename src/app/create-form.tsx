"use client";

import { useFormStatus } from 'react-dom'
import { createProduct } from '@/lib/actions'
import { useActionState, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function CreateForm() {
    const [state, formAction] = useActionState(createProduct, {
        message: '',
    })
    const { pending } = useFormStatus()
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (state.message.indexOf('Created product') === 0) {
            modalRef.current?.close()
            setIsModalOpen(false)
            formRef.current?.reset()
            toast.success(state.message)
        } else if (state.message) {
            toast.error(state.message)
        }
        console.log('sini state : ', state)
        console.log(state.message)
    }, [state.message])

    const openModal = () => {
        modalRef.current?.showModal()
        setIsModalOpen(true)
    }

    const closeModal = () => {
        modalRef.current?.close()
        setIsModalOpen(false)
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>
                Create Product
            </button>
            <dialog ref={modalRef} id="my_modal" className="modal">
                <div className="modal-box">
                    <h2 className="text-2xl font-bold mb-4">Create Product</h2>
                    <form ref={formRef} action={formAction}>
                        <div className="form-control w-full max-w-xs py-4">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="form-control w-full max-w-xs py-4">
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="input input-bordered w-full max-w-xs"
                                required
                                defaultValue="/images/2.png"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs py-4">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="input input-bordered w-full max-w-xs"
                                required
                                defaultValue="1"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs py-4">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="btn btn-primary mr-3"
                                type="submit"
                                disabled={pending}
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={closeModal}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}


// opsi 3
// import { useRouter } from 'next/navigation';
// import { useState } from 'react'
// import toast from 'react-hot-toast'
// export default function CreateForm() {
//   const [name, setName] = useState('')
//   const [image, setImage] = useState('/images/1.jpg')
//   const [price, setPrice] = useState(1)
//   const [category, setCategory] = useState('')
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault() // Mencegah formulir submit default
//     try {
//       // Lakukan sesuatu dengan data di sini (misalnya kirim ke server atau simpan)
//       console.log({ name, image, price, category })

//       // Simulasikan aksi seperti kirim data atau panggil API
//       toast.success('Product created successfully')

//       // Tutup modal
//       const modal = document.getElementById('my_modal') as HTMLDialogElement
//       modal?.close()

//       // Jika perlu, ubah URL dengan Router
//       router.push(`/dashboard?name=${name}&image=${image}&price=${price}&category=${category}`)
//     } catch (error) {
//       toast.error('Failed to create product')
//     }
//   }

//   return (
//     <div>
//       <button
//         className="btn btn-primary"
//         onClick={() =>
//           (document.getElementById('my_modal') as HTMLDialogElement)?.showModal()
//         }
//       >
//         Create Product
//       </button>
//       <dialog id="my_modal" className="modal">
//         <div className="modal-box">
//           <h2 className="text-2xl font-bold py-4">Create Product</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-control w-full max-w-xs py-4">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="input input-bordered w-full max-w-xs"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-control w-full max-w-xs py-4">
//               <label htmlFor="image">Image</label>
//               <input
//                 type="text"
//                 id="image"
//                 name="image"
//                 className="input input-bordered w-full max-w-xs"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-control w-full max-w-xs py-4">
//               <label htmlFor="price">Price</label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 className="input input-bordered w-full max-w-xs"
//                 value={price}
//                 onChange={(e) => setPrice(parseInt(e.target.value))}
//                 required
//               />
//             </div>
//             <div className="form-control w-full max-w-xs py-4">
//               <label htmlFor="category">Category</label>
//               <input
//                 type="text"
//                 id="category"
//                 name="category"
//                 className="input input-bordered w-full max-w-xs"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex justify-between pt-4">
//               <button
//                 className="btn btn-primary"
//                 type="submit"
//               >
//                 Create
//               </button>
//               <button
//                 className="btn btn-ghost"
//                 type="button"
//                 onClick={() =>
//                   (document.getElementById('my_modal') as HTMLDialogElement)?.close()
//                 }
//               >
//                 Back
//               </button>
//             </div>
//           </form>
//         </div>
//       </dialog>
//     </div>
//   )
// }


// opsi 2
// import { useFormState, useFormStatus } from 'react-dom'
// import { createProduct } from '@/lib/actions'
// import { useEffect, useRef } from 'react'
// import toast from 'react-hot-toast'
 
// export default function CreateForm() {
//     const [state, formAction] = useFormState(createProduct, {
//         message: '',
//     })
//     const { pending } = useFormStatus()
//     const ref = useRef<HTMLFormElement>(null)
//     useEffect(() => {
//         if (state.message.indexOf('Created product') === 0) {
//             ; (document.getElementById('my_modal') as any)!.close()
//             ref.current?.reset()
//             toast(state.message)
//         } else if (state.message) {
//             toast(state.message)
//         }
//         console.log('INi state yang muncul : ',state)
//     }, [state.message])

 
//     return (
//         <div>
//             <button
//                 className="btn btn-primary"
//                 onClick={() =>
//                     (document.getElementById('my_modal')! as any).showModal()
//                 }
//             >
//                 Create Product
//             </button>
//             <dialog id="my_modal" className="modal">
//                 <div className="modal-box">
//                     <h2 className="tex-2xl font-bold pm-4">Create Product</h2>
//                     <form ref={ref} action={formAction}>
//                         <div className="form-control w-full max-w-xs py-4">
//                             <label htmlFor="name">Name</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 className="input input-bordered w-full max-w-xs"
//                                 required
//                             />
//                         </div>
//                         <div className="form-control w-full max-w-xs py-4">
//                             <label htmlFor="image">Image</label>
//                             <input
//                                 type="text"
//                                 id="image"
//                                 name="image"
//                                 className="input input-bordered w-full max-w-xs"
//                                 required
//                                 defaultValue="/images/1.jpg"
//                             />
//                         </div>
//                         <div className="form-control w-full max-w-xs py-4">
//                             <label htmlFor="price">Price</label>
//                             <input
//                                 type="number"
//                                 id="price"
//                                 name="price"
//                                 className="input input-bordered w-full max-w-xs"
//                                 required
//                                 defaultValue="1"
//                             />
//                         </div>
//                         <div className="form-control w-full max-w-xs py-4">
//                             <label htmlFor="name">Category</label>
//                             <input
//                                 type="text"
//                                 id="category"
//                                 name="category"
//                                 className="input input-bordered w-full max-w-xs"
//                                 required
//                             />
//                         </div>
//                         <button
//                             className="btn btn-primary mr-3"
//                             type="submit"
//                             disabled={pending}
//                         >
//                             Create
//                         </button>
//                         <button
//                             type="button"
//                             className="btn btn-ghost"
//                             onClick={() =>
//                                 (document.getElementById('my_modal') as any).close()
//                             }
//                         >
//                             Back
//                         </button>
//                     </form>
//                 </div>
//             </dialog>
//         </div>
//     )
// }



// import { useRef, useState } from "react";
// import { useFormState } from "react-dom";
// import { createProduct } from "@/lib/actions";

// export default function CreateForm() {
//   const [isOpen, setIsOpen] = useState(false);

//   const [formAction] = useFormState(createProduct, {
//     message: '',
//   })

//   const ref = useRef<HTMLFormElement>(null)

//   return (
//     <>
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         onClick={() => setIsOpen(true)}
//       >
//         Open Modal
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg w-96">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b px-6 py-4">
//               <h2 className="text-lg font-bold text-gray-800">Create Product</h2>
//               <button
//                 className="text-gray-400 hover:text-gray-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="px-6 py-4">
//               <form ref={ref} action={formAction}>
//                 {/* name */}
//                 <div className="mb-4">
//                   <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
//                     Product Name
//                   </label>
//                   <input
//                     required
//                     type="text"
//                     id="productName"
//                     className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter product name"
//                   />
//                 </div>

//                 {/* image */}
//                 <div className="mb-4">
//                     <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
//                         Image
//                     </label>
//                     <input
//                         type="text"
//                         id="image"
//                         name="image"
//                         className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         required
//                         defaultValue="/images/1.jpg"
//                     />
//                 </div>

//                 {/* price */}
//                 <div className="mb-4">
//                   <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter product price"
//                   />
//                 </div>

//                 {/* category */}
//                 <div className="mb-4">
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="desktop">Desktop</option>
//                     <option value="laptop">Laptop</option>
//                     <option value="accessory">Accessory</option>
//                   </select>
//                 </div>
//               </form>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end border-t px-6 py-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button type="submit"  className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
