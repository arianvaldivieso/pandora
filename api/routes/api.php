<?php

use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\ClientController;
use App\Models\Availability;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('', function(){

    $serverName = "SRVWMSTEST.COLSEIN.COM.CO"; //serverName\instanceName
    $connectionInfo = array( "Database"=>"Pandora", "UID"=>"PANDORA", "PWD"=>"%colseiN20*");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);

    if( $conn ) {
         echo "Conexión establecida.<br />";
    }else{
         echo "Conexión no se pudo establecer.<br />";
         echo "<pre>";
         print_r (print_r( sqlsrv_errors(), true));
         echo "</pre>";
    }

    //return response()->json(Availability::all());
});    


Route::group([
    'prefix' => 'auth'
], function () {
    
    Route::post('login', [AuthController::class,'login']);


    Route::group([ 'middleware' => 'auth:api', 'prefix' => 'users' ], function() {

        Route::get('me', [AuthController::class,'me']);
        Route::get('logout', [AuthController::class,'logout']);

    	Route::post('/store',[ UserController::class,'store']);

    });
});

Route::group([ 'middleware' => 'auth:api'], function() {

    Route::resource('clients', ClientController::class)->except([
        'create', 'show'
    ]);

     Route::resource('users', UserController::class)->except([
        'create', 'show'
    ]);

});




Route::group([
    'prefix' => 'availability'
], function () {
	Route::get('', [ AvailabilityController::class,'index']);    
  Route::get('autocomplete', [ AvailabilityController::class,'autocomplete']);    
});

Route::group([
    'prefix' => 'history'
], function () {
	Route::get('', [ AvailabilityController::class,'history']);      
});

Route::group([
    'prefix' => 'reload'
], function () {
	Route::get('', [ AvailabilityController::class,'reload']);      
});