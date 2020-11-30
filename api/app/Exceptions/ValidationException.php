<?php

namespace App\Exceptions;

use Exception;

class ValidationException extends Exception
{
	public function render($request)
	{
		dd($request->all());
	}
}
