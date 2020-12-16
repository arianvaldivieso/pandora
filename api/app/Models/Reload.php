<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reload extends Model
{
    use HasFactory;

    protected $connection = '';
    protected $table = 'recarga';

    protected $fillable = [
    	'referencia',
			'descripcion',
			'linea',
			'imagen',
			'cantidad_sugerida',
			'datasheet',
			'catalogo',
			'fecha_recarga',
			'unidades',
			'precio',
			'cliente',
			'cantidad_solicitada'
    ];

    public function __construct()
    {
    	$database = (env('APP_ENV') != 'local') ? 'pandora' :  'mysql_2';
    	$this->connection = $database;
    }
}
