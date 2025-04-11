import React from 'react';

export default function GenderSelection({ gender, onChange, errors }) {
    return (
        <div>
            <div className="flex items-center mb-2 space-x-4 text-shadow-lg">
                {['Mme', 'M'].map((option) => (
                    <div key={option} className="flex items-center">
                        <div 
                            className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center border 
                                ${gender === option 
                                    ? 'border-indigo-700' 
                                    : errors?.gender 
                                        ? 'border-red-500' 
                                        : 'border-gray-300'
                                }`}
                        >
                            <div 
                                className={`w-3 h-3 rounded-full cursor-pointer
                                    ${gender === option 
                                        ? 'bg-indigo-700' 
                                        : 'bg-white'
                                    }`}
                                onClick={() => onChange(option)}
                            />
                        </div>
                        <span>{option}</span>
                    </div>
                ))}
            </div>
            {errors?.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
        </div>
    );
}