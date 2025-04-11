import React from "react";

export default function MessageSection({ messageType, message, onChange, errors }) {
    const messageTypes = [
        "Demande de visite",
        "Être rappelé.e",
        "Plus de photos"
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 text-shadow-lg">
                VOTRE MESSAGE
            </h2>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
                {messageTypes.map((type) => (
                    <label key={type} className="flex items-center">
                        <input
                            type="radio"
                            name="messageType"
                            checked={messageType === type}
                            onChange={() => onChange({ messageType: type })}
                            className={`mr-2 ${errors?.message_type ? 'border-2 border-red-500' : ''}`}
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors?.message_type && (
                <p className="mt-1 text-xs text-red-500">{errors.message_type}</p>
            )}

            <textarea
                value={message}
                onChange={(e) => onChange({ message: e.target.value })}
                placeholder="Votre message"
                className={`w-full h-40 px-4 py-3 rounded-3xl text-black resize-none ${
                    errors?.message ? 'border-2 border-red-500' : ''
                }`}
            />
            {errors?.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}

            <div className="flex justify-end mt-8">
                <button
                    type="submit"
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-full"
                >
                    ENVOYER
                </button>
            </div>
        </div>
    );
}
