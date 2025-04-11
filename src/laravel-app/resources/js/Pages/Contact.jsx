import React from "react";
import { Head } from "@inertiajs/react";
import ContactForm from "@/Components/Contact/ContactForm";

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                <ContactForm />
            </div>
        </>
    );
}
