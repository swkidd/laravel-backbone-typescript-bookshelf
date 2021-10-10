<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * @test
     * Login view can be displayed.
     *
     * @return void
     */
    public function it_shows_the_login_view()
    {
        $response = $this->get('/auth/login');

        $response->assertStatus(200);
    }

    /**
     * @test
     * Unauthenticated users sent to login page from home.
     *
     * @return void
     */
    public function it_redirects_unauthenticated_users_to_login_screen()
    {
        $response = $this->get('/')->assertRedirect('/auth/login');
    }

    /**
     * @test
     * User can login.
     *
     * @return void
     */
    public function it_allows_users_to_login()
    {
        $user = factory(User::class)->create();

        $response = $this->followingRedirects()
            ->post('/auth/login', [
                'email' => $user->email,
                'password' => 'password',
            ]);

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * Invalid users cannot login.
     *
     * @return void
     */
    public function it_does_not_allow_invalid_users_to_login()
    {
        $user = factory(User::class)->create();

        $response = $this->post('/auth/login', [
            'email' => $user->email,
            'password' => 'invalid'
        ]);

        $response->assertSessionHasErrors();

        $this->assertGuest();
    }

    /**
     * @test
     * Logged in users can logout.
     *
     * @return void
     */
    public function it_allows_logged_in_users_to_logout()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->post('/auth/logout');

        $response = $response->assertRedirect('/');

        $this->assertGuest();
    }
}
