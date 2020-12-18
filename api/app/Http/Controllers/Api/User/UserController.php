<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\User\UserStoreRequest;
use App\Http\Resources\User\Users;
use App\Http\Resources\User\UsersCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

	function index(){

		$users = User::all();

		return response()->json([
      'success' => true,
      'data' => new UsersCollection($users)
    ]);

	}


	public function store(UserStoreRequest $request)
	{

		$data = $request->only(
      'name',
      'email',
      'password',
      'client_id'
		);

		$data['password'] = Hash::make($data['password']);

		$user = User::create($data);

		return response()->json([
      'success' => true,
      'data' => new Users($user)
    ]);

	}

	function delete(Request $request){

		User::where('id',$request->id)->delete();

		return response()->json([
      'success' => true
    ]);
	}

}
