<?php

namespace App\Exceptions;

use App\Exceptions\ValidationException;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function(Exception $exception,$request){

            if ($exception instanceof ValidationException) {
                return response()->json(array(
                    'success' => false,
                    'errors'   =>  $exception->errors(),
                ), 422);
            }

            if ($exception instanceof RouteNotFoundException) {
                return response()->json(array(
                    'success' => false,
                    'errors'   =>  'NotFound',
                ), 404);
            }

            if ($exception instanceof MethodNotAllowedHttpException) {
                return response()->json(array(
                    'success' => false,
                    'errors'   =>  'MethodNotAllowed',
                ), 405);
            }

            //dd($exception);
        });
    }



}
