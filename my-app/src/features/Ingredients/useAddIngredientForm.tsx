import { useFormik } from "formik";
import { SendIngredient } from "@/Core/APIs/Ingredients/SendIngredient.API";

export const useAddingIngredientForm = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            category: "Meats",
            price: "",
            colorHex: "#E85D4A",
            isAvailable: true,
        },
        onSubmit: async(values,{resetForm, setSubmitting}) => {
            try{
                const newIngredient = await SendIngredient({
                    name : values.name,
                    category : values.category,
                    price:Number(values.price),
                    colorHex:values.colorHex,
                    isAvailable:values.isAvailable
                });
                window.location.reload();
                console.log("Successfully created:", newIngredient);
                resetForm();
            }
            catch(error){
                console.error("Error creating ingredient:", error);
            }
            finally {
                setSubmitting(false);
            }
        }
    })
    return { formik };
};