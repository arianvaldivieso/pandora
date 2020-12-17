<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{

	function index(){

		if (auth()->user()->role == 'admin') {
			$clients = Client::all();
		}else{
			$clients = Client::where('id',auth()->user()->client_id)->get();
		}
	
		$time = $clients->sum('tiempo');
		$co2 = $clients->sum('co2');
		$discount = $clients->sum('descuento');

		$data = [
			[
				'title' => 'tiempo',
				'color' => '#434343',
				'icons' => 'leads',
				'total' => $time,
				'key' => 'Hs',
			],
			[
				'title' => 'c02',
				'color' => '#434343',
				'icons' => 'active',
				'total' => $co2,
				'key' => 'Kg',
			],
			[
				'title' => 'Descuento',
				'color' => '#434343',
				'icons' => 'sales',
				'total' => $discount,
				'key' => '$',
			]
		];


		return response()->json([
      'success' => true,
      'data' => [
      	'data' => $data,
      	'clients' => $clients
      ]
    ]);
	}

}
