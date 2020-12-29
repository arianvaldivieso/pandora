<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\Users;
use App\Models\Article;
use App\Models\Availability;
use App\Models\Client;
use App\Models\History;
use App\Models\Reload;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AvailabilityController extends Controller
{

    protected $months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ];


    public function index()
    {

        if (auth()->user()->role == 'admin') {
            $availabilities = Availability::paginate(6);
            $total = Availability::count();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $availabilities = Availability::where('cliente',$client->cliente)->paginate(6);
            $total = Availability::where('cliente',$client->cliente)->count();
        }

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
                'manual' => $item->catalogo,
                'date' => 'fecha de ingreso: '.$item->fecha_ingreso,
                'client' => $item->cliente,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities,
            'total' => $total
        ]);
    }

    public function reload()
    {

        if (auth()->user()->role == 'admin') {
            $availabilities = Reload::paginate(6);
            $total = Reload::count();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $availabilities = Reload::where('cliente',$client->cliente)->paginate(6);
            $total = Reload::where('cliente',$client->cliente)->count();
        }

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
                'date' => 'fecha de recarga: '.$item->fecha_recarga,
                'client' => $item->cliente,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities,
            'total' => $total
        ]);
    }

    public function history()
    {

        if (auth()->user()->role == 'admin') {
            $availabilities = History::paginate(6);
            $total = History::count();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $availabilities = History::where('cliente',$client->cliente)->paginate(6);
            $total = History::where('cliente',$client->cliente)->count();
        }


        $availabilities = $availabilities->map(function($item){

            $availability = Availability::where('referencia',$item->referencia);

            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion,
                'image' => ($availability->count()) ? $availability->first()->imagen : '',
                'unit' => $item->unidades,
                'availability' => $item->cantidad_disponible,
                'ubication' => $item->ubicacion,
                'unit_price' => $item->precio_unitario,
                'datasheet' => $item->datasheet,
                'manual' => $item->catalogo,
                'date' => 'fecha de compra: '.$item->fecha_compra,
                'client' => $item->cliente,
                'garanty' => $item->garantia,
                'video' => $item->video,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities,
            'total' => $total
        ]);
    }

    function autocomplete(Request $request)
    {

        $key = $request->keyword;

        if (auth()->user()->role == 'admin') {
            $availabilities = Availability::where('referencia','like',"%$key%")->orWhere('linea','like',"%$key%")->get();
            $total = $availabilities->count();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $availabilities = Availability::where('cliente',$client->cliente)->where('referencia','like',"%$key%")->orWhere('linea','like',"%$key%")->get();
            $total = $availabilities->where('cliente',$client->cliente)->count();
        }

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
                'manual' => $item->catalogo,
                'date' => 'fecha de ingreso: '.$item->fecha_ingreso,
                'client' => $item->cliente,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $availabilities,
            'total' => $total
        ]);
    }


    function autocompleteHistory(Request $request)
    {   

        $key = $request->keyword; 

        if (auth()->user()->role == 'admin') {
            $history = History::where('referencia','like',"%$key%")->orWhere('linea','like',"%$key%");
            $total = $history->count();
        }else{
            $client = Client::find(auth()->user()->client_id);

            if ($key) {
                $history = History::where('cliente',$client->cliente)->where('referencia','like',"%$key%")->orWhere('linea','like',"%$key%");
            }else{
                $history = History::where('cliente',$client->cliente);
            }

            
            $total = $history->where('cliente',$client->cliente)->count();
        }

        if ($request->start and $request->end){
            $history = $history->whereDate('fecha_compra','>=', $request->start)->get();
        }else{
            $history = $history->get();
        }

        $history = $history->map(function($item){

            $availability = Availability::where('referencia',$item->referencia);

            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion,
                'image' => ($availability->count()) ? $availability->first()->imagen : '',
                'unit' => $item->unidades,
                'availability' => $item->cantidad_disponible,
                'ubication' => $item->ubicacion,
                'unit_price' => $item->precio_unitario,
                'datasheet' => $item->datasheet,
                'manual' => $item->catalogo,
                'date' => 'fecha de compra: '.$item->fecha_compra,
                'client' => $item->cliente,
                'garanty' => $item->garantia,
                'video' => $item->video,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $history,
            'total' => $total
        ]);
    }

    function autocompleteReload(Request $request)
    {

        $key = $request->keyword; 

        if (auth()->user()->role == 'admin') {
            $history = Reload::where('referencia','like',"%$key%")->orWhere('linea','like',"%$key%")->get();
            $total = $history->count();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $history = Reload::where('cliente',$client->cliente)->where('referencia','like',"%$key%")->orWhere('linea','like',"%$key%")->get();
            $total = $history->where('cliente',$client->cliente)->count();
        }

        $history = $history->map(function($item){

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
                'date' => 'fecha de recarga: '.$item->fecha_recarga,
                'client' => $item->cliente,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $history,
            'total' => $total
        ]);
    }

    function stast(){
        
        if (auth()->user()->role == 'admin') {
            $history = History::select(DB::raw('linea as name,count(*) as value'))->groupBy('linea')->get();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $history = History::select(DB::raw('linea as name,count(*) as value'))->where('cliente',$client->cliente)->groupBy('linea')->get();
        }

        $history = $history->map(function($item){
            $item->value = (float) $item->value;
            return $item;
        });
        
        return response()->json([
            'success' => true,
            'data' => $history
        ]);

    }


    function lines(){
        

        if (auth()->user()->role == 'admin') {
            $reload = History::select('linea')->groupBy('linea')->get();
        }else{
            $client = Client::find(auth()->user()->client_id);
            $reload = History::select('linea')->where('cliente',$client->cliente)->groupBy('linea')->get();
        }

        return response()->json([
            'success' => true,
            'data' => $reload
        ]);

    }

    function clients(){

        return response()->json([
            'success' => true,
            'data' => Reload::select('cliente')->groupBy('cliente')->get()
        ]);

    }

    function filterStast(Request $request){

        $client = Client::find(auth()->user()->client_id);
        $linear =  History::select(
            DB::raw('sum(precio_unitario) as value'),
            DB::raw('fecha_compra as name')
        )->orderBy('fecha_compra')->groupBy('fecha_compra');

        if (auth()->user()->role != 'admin') {
            $linear = $linear->where('cliente',$client->cliente);
        }

        if ($request->start and $request->end) {
            $linear = $linear->whereBetween('fecha_compra', [$request->start, $request->end]);
        }

        if ($request->line) {
            $linear = $linear->where('linea',$request->line);
        }

        if ($request->client) {
            $linear = $linear->where('cliente',$request->client);
        }

        $linear = $linear->get()->map(function($item){
            $item->name = explode('-',$item->name);

            $item->name = $this->months[((int) $item->name[1]) - 1].'-'.$item->name[0];

            //$item->name = $item->name[0].'-'.(isset($item->name[1])) ? $item->name[1] : '';

            $item->value = (float) $item->value;

            return $item;
        });


        $linear2 =  History::select(
            DB::raw('sum(cantidad_comprada) as value'),
            DB::raw('fecha_compra as name')
        )->orderBy('fecha_compra')->groupBy('fecha_compra');

        if (auth()->user()->role != 'admin') {
            $linear2 = $linear2->where('cliente',$client->cliente);
        }

        if ($request->start and $request->end) {
            $linear2 = $linear2->whereBetween('fecha_compra', [$request->start, $request->end]);
        }

        if ($request->line) {
            $linear2 = $linear2->where('linea',$request->line);
        }

        if ($request->client) {
            $linear2 = $linear2->where('cliente',$request->client);
        }

        $linear2 = $linear2->get()->map(function($item){
            $item->name = explode('-',$item->name);
            $item->name = $this->months[((int) $item->name[1]) - 1].'-'.$item->name[0];
            $item->value = (float) $item->value;
            //$item->name = $item->name[0].'-'.(isset($item->name[1])) ? $item->name[1] : '';
            return $item;
        });


        if (auth()->user()->role == 'admin') {
            $history = History::select(DB::raw('linea as name,count(*) as value'))->groupBy('linea');
        }else{
            $client = Client::find(auth()->user()->client_id);
            $history = History::select(DB::raw('linea as name,count(*) as value'))->where('cliente',$client->cliente)->groupBy('linea');
        }

        if ($request->start and $request->end) {
            $history = $history->whereBetween('fecha_compra', [$request->start, $request->end]);
        }


        $history = $history->get();


        $history = $history->map(function($item){
            $item->value = (float) $item->value;
            return $item;
        });


        return response()->json([
            'success' => true,
            'data' => [
                'linear' => [
                    'name' => 'Valor en compras',
                    'series' => $linear
                ],
                'linear2' => [
                    'name' => 'Cantidad de transacciones',
                    'series' => $linear2
                ],
                'area' => $history
            ]
        ]);
    }


    function articlesReferences(){

        $article = Article::all();

        $article = $article->map(function($item){
            return [
                'id' => $item->id,
                'reference' => $item->referencia,
                'description' => $item->descripcion,
                'image' => $item->imagen,
                'unit' => $item->unidades,
                'availability' => $item->cantidad_stock,
                'ubication' => $item->ubicacion,
                'unit_price' => $item->precio,
                'datasheet' => $item->datasheet,
                'manual' => $item->catalogo,
                'date' => 'fecha de ingreso: '.$item->fecha_ingreso,
                'client' => $item->cliente,
                'line' => $item->linea
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $article
        ]);

    }

    function request(Request $request){
        $client = Client::find(auth()->user()->client_id);
        $data = Reload::where('referencia',$request->reference)
            ->where('cliente',$client->cliente);

        if ($data->count()) {
            $data = $data->first();
            $data->timestamps = false;
            $data->cantidad_solicitada = $request->quantity;

            $data->save();
        }else{
            $temp = Article::where('referencia',$request->reference)->first();
            $temp->cantidad_solicitada = $request->quantity;

            $data = new Reload();
            $data->timestamps = false;

            $data->referencia = $temp->referencia;
            $data->descripcion = $temp->descripcion;
            $data->linea = $temp->linea;
            $data->imagen = $temp->imagen;
            $data->cantidad_sugerida = $temp->cantidad_sugerida;
            $data->datasheet = $temp->datasheet;
            $data->catalogo = $temp->catalogo;
            $data->fecha_recarga = $temp->fecha_recarga;
            $data->unidades = $temp->unidades;
            $data->precio = $temp->precio;
            $data->cliente = $client->cliente;
            $data->cantidad_solicitada = $temp->cantidad_solicitada;
            $data->save();
        }



        return response()->json([
            'success' => true,
            'data' => $data
        ]);


    }
}
