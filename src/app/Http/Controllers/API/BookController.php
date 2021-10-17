<?php

namespace App\Http\Controllers\API;

use App\Book;
use App\Http\Resources\BookResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class BookController extends Controller
{

    /**
     * Display a listing of books.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $books = Book::latest()
            ->orderBooks(request(['orderBy', 'order']))
            ->search(request(['search', 'searchBy']))
            ->paginate(5);

        return response()->json($books, 200);
    }

    /**
     * Store a newly created book in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $saved = Book::create(
            $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'required|string|max:255',
            ])
        );

        if (!$saved) {
            throw new \Exception('Attempt to create new book failed.');
        }

        $resource = new BookResource($saved);

        return response()->json($resource, 200);
    }

    /**
     * Display the specified book.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function show(Book $book)
    {
        $resource = new BookResource($book);
        return response()->json($resource, 200);
    }

    /**
     * Update the specified book in storage.
     *
     * @param Request $request
     * @param Book $book
     * @return JsonResponse
     * @throws \Exception
     */
    public function update(Request $request, Book $book)
    {
        $attributes = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
        ]);

        $didSave = $book->update($attributes);

        if (!$didSave) {
            throw new \Exception("Failed to update book " . $book->id . ".");
        }

        $resource = new BookResource($book);

        return response()->json($resource, 200);
    }

    /**
     * Remove the specified book from storage.
     *
     * @param Book $book
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Book $book)
    {
        $didDelete = $book->delete();

        if (!$didDelete) {
            throw new \Exception('Failed to delete book ' . $book->id . '.');
        }

        return response()->json('ok', 200);
    }
}
