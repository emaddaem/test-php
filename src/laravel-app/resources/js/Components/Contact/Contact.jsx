import React from 'react';
import ContactForm from '@/Components/Contact/ContactForm';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ContactForm />
                </div>
            </div>
        </>
    );
}