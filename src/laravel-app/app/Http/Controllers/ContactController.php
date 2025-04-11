<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'gender' => 'required|in:Mme,M',
            'lastName' => 'required|string|max:255',
            'firstName' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|max:255',
            'phone' => ['required', 'string', 'regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/'],
            'messageType' => 'required|string',
            'message' => 'required|string',
            'availabilities' => 'required|array|min:1',
        ], [
            'lastName.required' => 'Le nom est requis',
            'firstName.required' => 'Le prénom est requis',
            'gender.required' => 'Veuillez sélectionner votre civilité',
            'email.required' => 'L\'email est requis',
            'email.email' => 'Veuillez entrer une adresse email valide',
            'phone.required' => 'Le téléphone est requis',
            'phone.regex' => 'Veuillez entrer un numéro de téléphone français valide',
            'messageType.required' => 'Veuillez sélectionner un type de message',
            'message.required' => 'Le message est requis',
            'availabilities.required' => 'Veuillez ajouter au moins une disponibilité',
        ]);

        // Debug incoming request data
        Log::info('Form submission received:', $request->all());

        try {
            Log::info('Validation passed:', $validated);

            \DB::enableQueryLog();

            \DB::beginTransaction();

            // Create contact message
            $contact = ContactMessage::create([
                'gender' => $validated['gender'],
                'last_name' => $validated['lastName'],
                'first_name' => $validated['firstName'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'message_type' => $validated['messageType'],
                'message' => $validated['message'],
            ]);

            Log::info('Contact message created:', ['id' => $contact->id]);

            // Create availabilities
            foreach ($validated['availabilities'] as $availability) {
                $contact->availabilities()->create([
                    'day' => $availability['day'],
                    'hour' => str_replace('h', '', $availability['hour']), // Remove 'h' suffix
                    'minute' => str_replace('m', '', $availability['minute']), // Remove 'm' suffix
                ]);
            }

            \DB::commit();

            Log::info('Database queries:', \DB::getQueryLog());
            
            return redirect()->back()->with('success', 'Message envoyé avec succès!');

        } catch (\Exception $e) {
            \DB::rollBack();
            Log::error('Error storing contact message:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'queries' => \DB::getQueryLog() ?? []
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'Database error: ' . $e->getMessage()])
                ->withInput();
        }
    }
}
