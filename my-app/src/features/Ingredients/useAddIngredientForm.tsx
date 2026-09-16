import { useFormik } from "formik";
import { SendIngredient } from "@/Core/APIs/Ingredients/SendIngredient.API";

import toast from "react-hot-toast";

const CATEGORY_MAP: Record<string, number> = {
    Meats: 0,
    Veggies: 1,
    Cheese: 2,
};

export const useAddingIngredientForm = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            category: "Meats",
            price: "",
            colorHex: "#E85D4A",
            isAvailable: true,
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const categoryValue = CATEGORY_MAP[values.category] ?? 0;
                await SendIngredient({
                    name: values.name,
                    category: categoryValue,
                    price: Number(values.price),
                    colorHex: values.colorHex,
                });
                toast.success("Ingredient created successfully! 🎉");
                resetForm();
                setTimeout(() => {
                    window.location.reload();
                }, 800);
            } catch (error) {
                console.error("Error creating ingredient:", error);
                toast.error("Failed to create ingredient. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });
    return { formik };
};