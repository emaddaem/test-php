import React from "react";

export default function AvailabilitySection({ availabilities, onChange, errors }) {
    const MAX_AVAILABILITIES = 3;
    const days = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
    ];
    const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9-18h
    const minutes = [0, 15, 30, 45];

    const addAvailability = () => {
        if (availabilities.length >= MAX_AVAILABILITIES) return;

        onChange([
            ...availabilities,
            { day: "Lundi", hour: "9", minute: "00" },
        ]);
    };

    const removeAvailability = (index) => {
        const newAvailabilities = availabilities.filter((_, i) => i !== index);
        onChange(newAvailabilities);
    };

    const updateAvailability = (index, field, value) => {
        const newAvailabilities = availabilities.map((availability, i) => {
            if (i === index) {
                return { ...availability, [field]: value };
            }
            return availability;
        });
        onChange(newAvailabilities);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-shadow-lg">
                DISPONIBILITÉS POUR UNE VISITE
            </h2>

            <p className="text-sm">
                Vous pouvez ajouter {MAX_AVAILABILITIES - availabilities.length} créneaux.
            </p>

            {/* Availabilities list */}
            <div className="space-y-3">
                {availabilities.map((availability, index) => (
                    <div key={index} className="flex flex-wrap gap-2 mb-3">
                        <select
                            value={availability.day}
                            onChange={(e) =>
                                updateAvailability(index, "day", e.target.value)
                            }
                            className={`bg-white text-black px-4 py-2 rounded-full ${
                                errors?.availabilities ? 'border-2 border-red-500' : ''
                            }`}
                        >
                            {days.map((day) => (
                                <option key={day}>{day}</option>
                            ))}
                        </select>

                        <select
                            value={availability.hour}
                            onChange={(e) =>
                                updateAvailability(index, "hour", e.target.value)
                            }
                            className="bg-white text-black px-auto py-2 rounded-full"
                        >
                            {hours.map((hour) => (
                                <option key={hour}>{hour}h</option>
                            ))}
                        </select>

                        <select
                            value={availability.minute}
                            onChange={(e) =>
                                updateAvailability(index, "minute", e.target.value)
                            }
                            className="bg-white text-black px-auto py-2 rounded-full"
                        >
                            {minutes.map((minute) => (
                                <option key={minute}>{minute}m</option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => removeAvailability(index)}
                            className="text-red-500 hover:text-red-700 px-4 py-2"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {errors?.availabilities && (
                <p className="mt-1 text-xs text-red-500">{errors.availabilities}</p>
            )}

            {/* Button container with flex justify-end */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={addAvailability}
                    disabled={availabilities.length >= MAX_AVAILABILITIES}
                    className={`px-4 py-2 rounded-full text-ms ${
                        availabilities.length >= MAX_AVAILABILITIES
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-800 hover:bg-purple-700'
                    } text-white`}
                >
                    Ajouter ma disponibilité
                </button>
            </div>
        </div>
    );
}
