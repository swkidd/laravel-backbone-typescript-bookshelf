<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';
    protected $fillable = ['title', 'author'];

    public function scopeSearch($query, array $filters)
    {
        $searchBy = $filters['searchBy'] ?? 'both';

        $query->when($filters['search'] ?? false, function ($query, $search) use ($searchBy) {
            if (in_array($searchBy, array('author', 'title'))) {
                return $query
                    ->where($searchBy, 'like', '%' . $search . '%');
            }

            $query
                ->where('author', 'like', '%' . $search . '%')
                ->orWhere('title', 'like', '%' . $search . '%');
        });
    }

    public function scopeOrderBooks($query, array $filters)
    {
        $orderBy = $filters['orderBy'] ?? 'id';
        $order = $filters['order'] ?? 'DESC';

        // default to 'id' if orderBy is invalid
        if (!in_array($orderBy, array('author', 'title', 'id'))) {
            $orderBy = 'id';
        }

        // default to 'DESC' if order is invalid
        if (!in_array($order, array('DESC', 'ASC'))) {
            $order = 'DESC';
        }

        $query->orderBy($orderBy, $order);
    }
}
