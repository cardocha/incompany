<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('BaseController.php');

class Login extends BaseController {

    public function __construct()
    {
        parent::__construct();
		$this->load->helper('usuario_helper');
		$this->load->library('form_validation');
        $this->load->model('usuario');
    }

    public function index(){
        $usuario = parent::get_dados();
        $validacao = $this->valida($usuario);
        $info_conexao = $_SERVER['HTTP_USER_AGENT'];
        $usuario_recuperado = null;
        $auth = new stdClass();
        $auth->token = null;
        
        if(!$validacao){
            $msg = parent::get_errors();
        }else
        {
            $usuario_recuperado = $this->usuario->get_registro_por_email($usuario->email);
            $senha = $usuario->_;
            if(strpos(strtoupper($senha), $usuario_recuperado['senha']) !== false )
            { 
                $auth->token = strtoupper(gerar_token($usuario_recuperado));
                $auth->nome = $usuario_recuperado['nome'];
                $auth->tipo = $usuario_recuperado['tipo'];
                $auth->email = $usuario_recuperado['email'];
                $auth->id = $usuario_recuperado['id'];
                $msg = "Login realizado";
            }
            else
                $auth->token = FALSE;
        }
        
        if($auth->token === FALSE)
            $msg = "Usuário ou senha inválidos.";
              
        echo parent::resposta_json(boolval($auth->token), $msg, $auth);
    }
    
    private function valida($usuario)
    {
        $validacao = parent::get_validador((array)$usuario);
        $validacao->set_rules('email', 'E-mail', array('required','valid_email'));
        $validacao->set_rules('_', 'Senha', array('required'));
        return $validacao->run();
    }
    
    protected function persistir($registro){}
    protected function remover($registro){}

}
