<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * @test
     * Register view can be displayed.
     *
     * @return void
     */
    public function it_shows_the_register_view()
    {
        $response = $this->get('register');

        $response->assertStatus(200);
    }

    /**
     * @test
     * Valid users can register.
     *
     * @return void
     */
    public function it_allows_valid_users_to_register()
    {
        $user = factory(User::class)->make();

        $response = $this->post('register', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertRedirect('/');

        $this->assertAuthenticated();
    }

    /**
     * @test
     * Invalid users can't register.
     *
     * @return void
     */
    public function it_does_not_allow_invalid_users_to_register()
    {
        $user = factory(User::class)->make();

        $response = $this->post('register', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'invalid'
        ]);

        $response->assertSessionHasErrors();

        $this->assertGuest();
    }
}
