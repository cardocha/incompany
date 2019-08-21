<?php

abstract class BaseController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }
    }

    public function detectar_acao()
    {
        $method = $_SERVER["REQUEST_METHOD"];

        if ($method === "PUT") {
            $this->atualizar($this->input->put());
        } elseif ($method === "DELETE") {
            $this->remover($this->input->delete());
        } elseif ($method === "POST") {
            $this->inserir($this->input->post());
        }
        
        return $method;
    }

    abstract protected function inserir($categoria);
    abstract protected function remover($categoria);
    abstract protected function atualizar($categoria);

    function resposta_json($flag, $msg, $obj)
    {
        $res = (object) array(
         'flag'=>$flag,
         'msg'=> $msg,
         'obj'=>$obj
       );
      
       return json_encode($res);
    }
}
