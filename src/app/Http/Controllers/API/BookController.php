<?php

namespace App\Http\Controllers\API;

use App\Book;
use App\Http\Resources\BookResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
        $books = Book::orderBooks(request(['orderBy', 'order']))
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

    /**
     * Export books as CSV or XML.
     *
     * @return StreamedResponse
     */
    public function export(Request $request)
    {
        $validData = $request->validate([
            'filetype' => 'required|in:csv,xml',
            'columns' => 'required|in:title,author,both'
        ]);
        $filetype = $validData['filetype'];
        $columns = $validData['columns'];

        $filename = 'books' . ucwords($columns) . strval(now()->timestamp) . ".{$filetype}";

        $headers = array(
            'Content-type' => "text/{$filetype}",
            'Content-Disposition' => "attachment; filename={$filename}",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        );
        $colSelect = $columns == 'both' ? array('author', 'title') : array($columns);
        $list = Book::get($colSelect)->toArray();

        if ($filetype == 'csv') {
            $callback = function () use ($colSelect, $list) {
                $this->streamBookArrayToCSV($colSelect, $list);
            };
        } else {
            $callback = function () use ($list) {
                $this->streamBookArrayToXML($list);
            };
        }

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Stream callback for converting an array of books to CSV
     */
    function streamBookArrayToCSV($header, $list)
    {
        # add headers for each column in the CSV download
        array_unshift($list, $header);

        $FH = fopen('php://output', 'w');
        foreach ($list as $row) {
            fputcsv($FH, $row);
        }
        fclose($FH);
    }

    /**
     * Stream callback for converting an array of books to XML
     */
    function streamBookArrayToXml($list)
    {
        $FH = fopen('php://output', 'w');
        fputs($FH, '<?xml version="1.0" encoding="UTF-8"?><books>');
        foreach ($list as $book) {
            $bookXML = '<book>';
            foreach ($book as $k => $v) {
                $bookXML .= "<{$k}>$v</{$k}>";
            }
            $bookXML .= '</book>';
            fputs($FH, $bookXML);
        }
        fputs($FH, '</books>');
    }
}
