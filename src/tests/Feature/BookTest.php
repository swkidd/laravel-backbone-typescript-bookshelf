<?php

namespace Tests\Feature;

use App\User;
use App\Book;
use Tests\TestCase;

class BookTest extends TestCase
{
    /**
     * @test
     * Valid users can get books
     *
     * @return void
     */
    public function it_allows_valid_users_to_get_books()
    {
        $user = factory(User::class)->create();
        $book1 = factory(Book::class)->create();
        $book2 = factory(Book::class)->create();
        $book3 = factory(Book::class)->create();
        $response = $this->actingAs($user, 'api')->get('/api/v1/book');
        $response->assertSuccessful();
        $json = $response->decodeResponseJson();
        $data = $json['data'];
        $this->assertContains($book1->toArray(), $data);
        $this->assertContains($book2->toArray(), $data);
        $this->assertContains($book3->toArray(), $data);
    }

    /**
     * @test
     * Valid users can create books
     *
     * @return void
     */
    public function it_allows_valid_users_to_create_books()
    {
        $user = factory(User::class)->create();
        $book = factory(Book::class)->make();

        $response = $this->actingAs($user, 'api')->post('/api/v1/book', [
            'author' => $book->author,
            'title' => $book->title,
        ]);
        $response->assertSuccessful();
        $json = $response->decodeResponseJson();
        $this->assertDatabaseHas('books', ['id' => $json['id']]);
    }

    /**
     * @test
     * Valid users can update books.
     *
     * @return void
     */
    public function it_allows_valid_users_to_update_books()
    {
        $user = factory(User::class)->create();
        $book = factory(Book::class)->create();
        $this->assertDatabaseHas('books', $book->toArray());

        $newAuthor = "author*****";
        $newTitle = "title*****";
        $response = $this->actingAs($user, 'api')->put("/api/v1/book/{$book->id}", [
            'id' => $book->id,
            'author' => $newAuthor,
            'title' => $newTitle
        ]);

        $response->assertSuccessful();
        $json = $response->decodeResponseJson();
        $this->assertDatabaseHas('books', ['id' => $json['id']]);
        $this->assertEquals($json['author'], $newAuthor);
        $this->assertEquals($json['title'], $newTitle);
    }

    /**
     * @test
     * Valid users can delete books
     *
     * @return void
     */
    public function it_allows_valid_users_to_delete_books()
    {
        $user = factory(User::class)->create();
        $book = factory(Book::class)->create();
        $response = $this->actingAs($user, 'api')->delete("/api/v1/book/{$book->id}");
        $response->assertSuccessful();
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }
}
