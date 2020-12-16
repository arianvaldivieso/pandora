<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
  
  use HasFactory;

  protected $connection = '';
  protected $table = 'articulo';

  public function __construct()
  {
  	$database = (env('APP_ENV') != 'local') ? 'pandora' :  'mysql_2';
  	$this->connection = $database;
  }
}
