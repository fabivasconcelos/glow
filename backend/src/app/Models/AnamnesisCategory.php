<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnamnesisCategory extends Model
{
    protected $fillable = ['name', 'subtitle'];

    public function sections()
    {
        return $this->hasMany(AnamnesisSection::class);
    }
}
