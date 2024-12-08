'use client'
 
import { deleteProduct } from '@/lib/actions'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
 
export default function DeleteForm({
    _id,
    name,
}: {
    _id: string
    name: string
}) {
    const { pending } = useFormStatus()
    return (
        <form
            action={async (formData) => {
                const res = await deleteProduct(formData)
                toast(res.message)
            }}
        >
            <input type="hidden" name="_id" value={_id} />
            <input type="hidden" name="name" value={name} />
            <button type="submit" disabled={pending} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete
            </button>
        </form>
    )
}