<?php

namespace App\Http\Controllers;

use App\Models\Availability;
use App\Models\History;
use App\Models\Reload;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{

    public function index()
    {
        $availabilities = Availability::all();

        $availabilities = $availabilities->map(function($item){
            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion,
                'image' => $item->imagen,
                'unit' => $item->unidades,
                'availability' => $item->cantidad_disponible,
                'ubication' => $item->ubicacion,
                'unit_price' => $item->precio_unitario,
                'datasheet' => $item->datasheet,
                'manual' => $item->manual,
                'date' => $item->fecha_ingreso,
                'client' => $item->cliente
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities
        ]);
    }

    public function reload()
    {
        $availabilities = Reload::all();

        $availabilities = $availabilities->map(function($item){
            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion,
                'image' => $item->imagen,
                'unit' => $item->unidades,
                'availability' => $item->cantidad_sugerida,
                'ubication' => $item->ubicacion,
                'unit_price' => $item->precio,
                'datasheet' => $item->datasheet,
                'manual' => $item->catalogo,
                'date' => $item->fecha_recarga,
                'client' => $item->cliente,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities
        ]);
    }

    public function history()
    {
        $availabilities = History::all();


        $availabilities = $availabilities->map(function($item){
            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion,
                'image' => Availability::where('referencia',$item->referencia)->first()->imagen,
                'unit' => $item->unidades,
                'availability' => $item->cantidad_disponible,
                'ubication' => $item->ubicacion,
                'unit_price' => $item->precio_unitario,
                'datasheet' => $item->datasheet,
                'manual' => $item->manual,
                'date' => $item->fecha_compra,
                'client' => $item->cliente,
                'garanty' => $item->garantia,
                'video' => $item->video
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities
        ]);
    }

    function autocomplete(Request $request)
    {

        $key = $request->key;

        $availabilities = Availability::where('referencia','like',"%$key%")->get();

        $availabilities = $availabilities->map(function($item){
            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities
        ]);
    }
}
