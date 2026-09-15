import { useAddingIngredientForm } from "./useAddIngredientForm";

export default function AddIngredientForm(){
    const { formik } = useAddingIngredientForm();
    return(
        <div className="max-w-4xl mx-auto mt-5 bg-white-color divide-y-2 divide-black-font rounded-2xl overflow-hidden border-r-8 border-b-8 border-l-2 border-t-2 border-black-font">
            <div className="bg-red-color p-6 text-white-color">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    + Add An Ingredient
                </h2>
            </div>
            <div className="p-6">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="ing-name" className="text-xs font-bold text-black-font tracking-wider">
                                NAME
                            </label>
                            <input 
                                id="ing-name"
                                name="name"
                                type="text"
                                placeholder="e.g. jalapeno"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="bg-beige-color border-2 border-beige-dark text-black-font font-semi-bold text-sm p-3 rounded-xl transition-colors focus:outline-none focus:border-red-color focus:border-r-4 focus:border-b-4 focus:border-l-2 focus:border-t-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="ing-category" className="text-xs font-bold text-black-font tracking-wider">
                                CATEGORY
                            </label>
                            <select 
                                id="ing-category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                className="bg-beige-color border-2 border-beige-dark text-black-font font-semi-bold text-sm p-3 rounded-xl transition-colors focus:outline-none"                            >
                                <option value="Meats">Meats</option>
                                <option value="Veggies">Veggies</option>
                                <option value="Cheese">Cheese</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="ing-price" className="text-xs font-bold text-black-font tracking-wider">
                                PRICE
                            </label>
                            <input 
                                id="ing-price"
                                name="price"
                                type="number"
                                placeholder="0"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className="bg-beige-color border-2 border-beige-dark text-black-font font-semi-bold text-sm p-3 rounded-xl transition-colors focus:outline-none focus:border-red-color focus:border-r-4 focus:border-b-4 focus:border-l-2 focus:border-t-2"                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="ing-color" className="text-xs font-bold text-black-font tracking-wider">
                                SWATCH COLOUR
                            </label>
                            <div className="flex items-center gap-3 bg-beige-color border-2 border-beige-dark rounded-xl p-2.5">
                                <input 
                                    type="color"
                                    name="colorHex"
                                    value={formik.values.colorHex}
                                    onChange={formik.handleChange}
                                    className="w-6 h-6 rounded-md border border-beige-dark cursor-pointer bg-white-color p-0 shrink-0"
                                />
                                <input 
                                    id="ing-color"
                                    type="text"
                                    name="colorHex"
                                    value={formik.values.colorHex}
                                    onChange={formik.handleChange}
                                    className="bg-transparent text-black-font font-semi-bold text-sm focus:outline-none w-full uppercase"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                        <button 
                            type="submit"
                            className="bg-red-color text-white-color font-bold px-6 py-3 rounded-xl border border-black-font border-r-4 border-b-4 hover:opacity-90 transition-all text-sm"
                        >
                            + Add Ingredient
                        </button>
                        <button 
                            type="button"
                            onClick={() => formik.resetForm()}
                            className="text-sub-color font-bold text-sm hover:text-black-font"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}