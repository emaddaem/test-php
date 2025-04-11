import React, { useState } from "react";
import { router } from "@inertiajs/react";
import GenderSelection from "./GenderSelection";
import ContactDetails from "./ContactDetails";
import AvailabilitySection from "./AvailabilitySection";
import MessageSection from "./MessageSection";

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone) => {
    // French phone number format (mobile and landline)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
};

export default function ContactForm() {
    const [formData, setFormData] = useState({
        gender: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        messageType: "",
        message: "",
        availabilities: [],
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.gender) newErrors.gender = "Veuillez sélectionner votre civilité";
        if (!formData.lastName) newErrors.lastName = "Le nom est requis";
        if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
        
        // Enhanced email validation
        if (!formData.email) {
            newErrors.email = "L'email est requis";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Veuillez entrer une adresse email valide";
        }

        // Enhanced phone validation
        if (!formData.phone) {
            newErrors.phone = "Le téléphone est requis";
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = "Veuillez entrer un numéro de téléphone français valide (ex: 06 12 34 56 78)";
        }

        if (!formData.messageType) newErrors.messageType = "Veuillez sélectionner un type de message";
        if (!formData.message) newErrors.message = "Le message est requis";
        if (formData.availabilities.length === 0) {
            newErrors.availabilities = "Veuillez ajouter au moins une disponibilité";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Client-side validation
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            await router.post("/contact", formData, {
                onSuccess: () => {
                    setSuccessMessage("Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.");
                    setFormData({
                        gender: "",
                        lastName: "",
                        firstName: "",
                        email: "",
                        phone: "",
                        messageType: "",
                        message: "",
                        availabilities: [],
                    });
                    setErrors({});
                    
                    // Optional: Clear success message after 5 seconds
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 5000);
                },
                onError: (errors) => {
                    console.error("Form submission failed:", errors);
                    setErrors(errors);
                },
                preserveState: true,
            });
        } catch (error) {
            console.error("Submission error:", error);
            setErrors({ general: "Une erreur est survenue lors de l'envoi du formulaire" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            {successMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
                    {successMessage}
                </div>
            )}
            <div className="max-w-6xl w-full bg-black/20 backdrop-blur-sm rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-12">
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl bg-no-repeat"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0, 0, 0, 0.1)), url("/images/salon.png")',
                            backgroundAttachment: 'fixed',
                            minHeight: '100%'
                        }}
                    />
                    <div className="relative z-10 text-white">
                        <h1 className="text-3xl font-bold mb-8 text-shadow-lg text-left">
                            CONTACTEZ L'AGENCE
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <div>
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4 text-shadow-lg">
                                            VOS COORDONNÉES
                                        </h2>
                                        <GenderSelection
                                            gender={formData.gender}
                                            onChange={(gender) => setFormData({ ...formData, gender })}
                                            errors={errors}
                                        />
                                        <ContactDetails
                                            formData={formData}
                                            onChange={setFormData}
                                            errors={errors}
                                        />
                                    </div>
                                    <AvailabilitySection
                                        availabilities={formData.availabilities}
                                        onChange={(availabilities) =>
                                            setFormData({
                                                ...formData,
                                                availabilities,
                                            })
                                        }
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <MessageSection
                                messageType={formData.messageType}
                                message={formData.message}
                                onChange={(data) =>
                                    setFormData({ ...formData, ...data })
                                }
                                errors={errors}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
