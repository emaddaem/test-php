import React from "react";
import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenue" />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4">
                                Bienvenue à notre agence
                            </h1>
                            <Link
                                href="/contact"
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Formulaire de contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
