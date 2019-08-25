<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('BaseController.php');

class Login extends BaseController {

    public function __construct()
    {
        parent::__construct();
		$this->load->helper('usuario_helper');
		carregar_dependencias();
    }

    public function index(){
        $usuario = parent::get_dados();
        $validacao = $this->valida($usuario);
        $info_conexao = $_SERVER['HTTP_USER_AGENT'];
        $usuario_recuperado = null;
        $token = null;
        
        if(!$validacao){
            $msg = parent::get_errors();
        }else
        {
            $usuario_recuperado = $this->usuario->get_registro_por_email($usuario->email);
            $senha = $usuario->_;
            if(strpos(strtoupper($senha), $usuario_recuperado['senha']) !== false )
            {
                $token = gerar_token($usuario_recuperado);
                $msg = "Login realizado";
            }
            else
                $token = FALSE;
        }
        
        if($token === FALSE)
            $msg = "Usuário ou senha inválidos.";
              
        echo parent::resposta_json(boolval($token), $msg, $token);
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
