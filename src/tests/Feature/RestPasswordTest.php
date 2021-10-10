<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Notifications\ResetPassword;

class RestPasswordTest extends TestCase
{
    /**
     * @test
     * Displays reset password request view.
     *
     * @return void
     */
    public function it_shows_the_reset_password_view()
    {
        $response = $this->get('/auth/password/reset');

        $response->assertStatus(200);
    }

    /**
     * @test
     * Sends password reset email to valid users.
     *
     * @return void
     */
    public function it_sends_password_reset_emails_to_valid_users()
    {
        $user = factory(User::class)->create();

        $this->expectsNotification($user, ResetPassword::class);

        $response = $this->post('/auth/password/email', ['email' => $user->email]);

        $response->assertRedirect('/');
    }

    /**
     * @test
     * Doesn't send password reset to invalid users.
     *
     * @return void
     */
    public function it_does_not_send_password_reset_to_invalid_users()
    {
        $this->doesntExpectJobs(ResetPassword::class);

        $this->post('password/email', ['email' => 'invalid@email.com']);
    }

    /**
     * @test
     * Displays the form to reset a password.
     *
     * @return void
     */
    public function it_displays_form_to_reset_password()
    {
        $response = $this->get('/auth/password/reset/token');

        $response->assertStatus(200);
    }

    /**
     * @test
     * Allows a user to reset their password.
     *
     * @return void
     */
    public function it_allows_users_to_reset_passwords()
    {
        $user = factory(User::class)->create();

        $token = Password::createToken($user);

        $response = $this->post('/auth/password/reset', [
            'token' => $token,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }
}
