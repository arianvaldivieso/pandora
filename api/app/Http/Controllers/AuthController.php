<?php

namespace App\Http\Controllers;

use App\Http\Requests\API\Auth\LoginRequest;
use App\Http\Resources\User\Users;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	function login(Request $request)
	{

		$credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            
            $user = auth()->user();
        	return response()->json([
                'success'   => true,
                'data'     	=> [
                	'token' 	=> $user->createToken(env('APP_NAME').'-'.$user->name),
                	'user' 		=>  $user
                ] 
        	], 200);

        }

	}


    function me(){
        return response()->json([
            'success'   => true,
            'data'      => new Users(User::find(auth()->user()->id)) 
        ], 200);
    }

}
