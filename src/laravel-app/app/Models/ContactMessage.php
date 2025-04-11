<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContactMessage extends Model
{
    protected $fillable = [
        'gender',
        'last_name',
        'first_name',
        'email',
        'phone',
        'message_type',
        'message'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            \Log::info('Creating contact message:', $model->toArray());
        });
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }
}