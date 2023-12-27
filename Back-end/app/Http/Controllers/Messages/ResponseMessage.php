<?php

namespace App\Http\Controllers\Messages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ResponseMessage extends Controller
{
    public function generateRefOrderNum($numOrder)
    {
        $response = [
            'numOrder'=>$numOrder
        ];
        return response($response);
    }
    
    public function succedRequest($message)
    {
        $response = [
            'status'=>200,
            'success'=>true,
            'message'=>$message
        ];
        return response()->json($response);
    }


    public function succedRequestWithData($result,$message)
    {
        $response = [
            'status'=>200,
            'success'=>true,
            'data'=>$result,
            'message'=>$message
        ];
        return response()->json($response);
    }

    public function failedRequest($message,$status)
    {
        $response = [
            'status'=>$status,
            'message'=>$message,
        ];
        return response()->json($response);
    }
}
