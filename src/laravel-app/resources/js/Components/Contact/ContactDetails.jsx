import React from 'react';

export default function ContactDetails({ formData, onChange, errors }) {
    const handleChange = (e) => {
        onChange({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-full text-black ${
                            errors.lastName ? 'border-2 border-red-500' : ''
                        }`}
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-full text-black ${
                            errors.firstName ? 'border-2 border-red-500' : ''
                        }`}
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                    )}
                </div>
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Adresse mail"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-full text-black ${
                        errors.email ? 'border-2 border-red-500' : ''
                    }`}
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
            </div>
            <div>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-full text-black ${
                        errors.phone ? 'border-2 border-red-500' : ''
                    }`}
                />
                {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
            </div>
        </div>
    );
}