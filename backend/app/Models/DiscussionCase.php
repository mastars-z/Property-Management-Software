<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiscussionCase extends Model
{
    protected $fillable = [
        'lease_id',
        'topic',
        'description',
        'status',
    ];

    public function lease(): BelongsTo
    {
        return $this->belongsTo(Lease::class);
    }
}
