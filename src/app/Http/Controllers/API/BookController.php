<?php

namespace App\Http\Controllers\API;

use App\Book;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        // order by author, title, or id
        // passed as url parameter
        $orderBy = $request->query('orderBy', 'id');
        if (!in_array($orderBy, array('author', 'title', 'id'))) {
            $orderBy = 'id';
        }

        // ascending or decending order
        // passed as url parameter
        $order = $request->query('order', 'DESC');
        if (!in_array($order, array('DESC', 'ASC'))) {
            $order = 'DESC';
        }

        $books = Book::orderBy($orderBy, $order)->paginate(5);
        $collection = new BookCollection($books);

        return response()->json($collection, 200);
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
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
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
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
