import Image from "next/image";
import { Toaster } from 'react-hot-toast'
import CreateForm from "@/app/create-form"
import dbConnect from '@/lib/db-connect'
import ProductModel, { Product } from '@/lib/product-model'
import DeleteForm from "./delete-form";

export default async function Home() {
  // koneksi database mongoo
  await dbConnect()
  const products = (await ProductModel.find({}).sort({
    _id: -1,
  })) as Product[]

  return (
    <div className="container mx-auto p-6">
      {/* Heading Section */}
      <header className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-800">
          🛒 Product Dashboard
        </h1>
        <Toaster />
        <CreateForm />
      </header>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  Image
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Product found!</td>
                </tr>
              ) : (
                products.map((product: Product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-table-1" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      <DeleteForm 
                        _id={product._id ? product._id.toString() : ''} // Pastikan ID berupa string
                        name={product.name || ''} // Pastikan name tidak null
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


//https://www.npmjs.com/package/react-hot-toast
//https://www.npmjs.com/package/react-daisyui
//https://github.com/andreww2012/mongoose-zod
//https://www.npmjs.com/package/mongoose
//npm i mongoose zod daisyui react-hot-toast 