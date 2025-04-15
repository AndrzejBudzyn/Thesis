<?php

namespace Tests\Feature;

use Tests\TestCase;

class SmokeTest extends TestCase
{
    public function testApplicationCompiles(): void
    {
        $this->assertTrue(true);
    }

    public function testApliactionCanLoad(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testBasicLaravelSiteCanBeSeen(): void
    {
        $response = $this->get("/");

        $response->assertSee('Documentation');
        $response->assertSee('Laracasts');
        $response->assertSee('Laravel News');
        $response->assertSee('Vibrant Ecosystem');
        $response->assertDontSee('Unauthorized');
        $response->assertStatus(200);
    }

    public function testNonExistentPageReturns404(): void
    {
        $response = $this->get('/nonExistentPage');
        $response->assertStatus(404);
    }
    
    public function testNoRedirectOnHome(): void
    {
    $response = $this->get('/');
    $response->assertStatus(200);
    $response->assertDontSee('Unauthorized');
    }
}